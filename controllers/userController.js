const db = require("../prisma/queries.js");
const bcrypt = require("bcryptjs");
const tools = require("./modules/tools.js");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateSignUp= [
    body("first_name").trim()
      .escape()
      .isAlpha().withMessage(`First name can only be letters`)
      .isLength({ min: 1, max: 15 }).withMessage(`First name must be between 1 and 15 characters.`),
    body("last_name").trim()
        .escape()
        .isAlpha().withMessage(`Last name can only be letters`)
        .isLength({ min: 1, max: 15 }).withMessage(`Last name must be between 1 and 15 characters.`),
    body("username")
        .isEmail().withMessage(`Username must be a valid email`)
        .custom(async value => {
      const user = await db.findUserByUsername(value);
      if (user) {
        throw new Error('E-mail already in use');
      }
    }),
    body("password")
      .isLength({ min: 8}).withMessage(`Password must be between more than 8 characters.`)
      .matches(/\d/).withMessage('Password must contain a number'),
    body('passwordConfirm').custom((value, { req }) => {
          return value === req.body.password;
      }).withMessage(`Passwords must match.`),
];
const validateLogIn= [
  body("username")
      .isEmail().withMessage(`Username must be a valid email`)
      .custom(async value => {
    const user = await db.findUserByUsername(value);
    if (!user) {
      throw new Error('E-mail doesnt exist');
    }
  })

];
const validateProfile= [
  body("bio").trim()
    .escape()
    .isLength({ min: 1, max: 200 }).withMessage(`Bio must be between 1 and 200 characters.`),
  body("pictureURL").trim()
      .escape()
      .isURL().withMessage(`Picture must be URL`),
];
newUserCreate = [
    validateSignUp,
    async function(req, res) {
        let {first_name,last_name,username,password,passwordConfirm} = req.body
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),                    
                });
            }
            await db.createUser(tools.capitalize(first_name),tools.capitalize(last_name),username,hashedPassword);
            res.sendStatus(200);
        });
    }
]

logIn = [
  validateLogIn,
  async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
          errors: errors.array()
      });
    }
    const user = await db.findUserByUsername(req.body.username);
    bcrypt.compare(req.body.password, user.password, async (err,result) => {
      if(result == false){
        const errorsarray = {errors:[{msg:'Incorrect password'}]}
        return res.status(400).json(errorsarray)
        
      }
      else{
        jwt.sign({user},process.env.SECRET,(err,token)=>{
          //return token and user info
          res.json({
              token,user
          });
        });
      }
    })
  }

]

async function userDelete (req, res) {
  jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
      if(err){
          res.sendStatus(403)
      }else{
        const userid = Number(req.params.userid);
        await db.deleteUser(userid);
        res.sendStatus(200);
      }   
  })
}
async function allProfilesGet (req, res) {
  jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
      if(err){
          res.sendStatus(403)
      }else{
        const profiles = await db.findAllProfiles();
        res.json(profiles);
      }   
  })
}

async function singleProfileGet (req, res) {
  jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
      if(err){
          res.sendStatus(403)
      }else{
        const profileid = Number(req.params.profileid);
        const profile = await db.findProfile(profileid);
        res.json(profile);
      }   
  })
}


profileUpdate =[
  validateProfile,
  async function (req, res) {
      jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
          if(err){
              res.sendStatus(403)
          }else{
              const profileid = Number(req.params.profileid);
              const profile = await db.findProfile(profileid);

              if (profile == null){
                  return res.status(400).json({error:'Profile does not exist'})
              }
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                  return res.status(400).json(errors.array())
              }
              let {bio,pictureURL} = req.body;
              
              await db.udpateProfile(bio,pictureURL,profileid);
              res.sendStatus(200);
          }
      })
  }
]


// async function Name (req, res) {
//   jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
//       if(err){
//           res.sendStatus(403)
//       }else{
        
//       }   
//   })
// }

module.exports = {
    newUserCreate,
    logIn,
    userDelete,
    allProfilesGet,
    singleProfileGet,
    profileUpdate,
    
};