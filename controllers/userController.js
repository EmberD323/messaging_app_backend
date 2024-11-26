const db = require("../prisma/queries.js");
const bcrypt = require("bcryptjs");
const tools = require("./modules/tools.js");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {createClient} = require("@supabase/supabase-js")
const supabase = createClient("https://rrkiqsthcekarglxlxcn.supabase.co", process.env.SUPABASE_KEY)

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
    console.log(user)
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
        const userid = authData.user.id;
        const user = await db.findUserById(userid);
        if (!user) {
          res.status(400).send('User doesnt exist');
        }
        else{
          await db.deleteUser(userid);
          res.sendStatus(200);
        }
        
      }   
  })
}
async function userProfileGet (req, res) {
  jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
      if(err){
          res.sendStatus(403)
      }else{

        res.json(authData);
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
//temp for file upload testing
async function fileUploadPost(req, res) {
  jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
    if(err){
        res.sendStatus(403)
    }else{
      const fileName = req.file.originalname+authData.user.id+authData.user.username;
      const fileSize =req.file.size;
      //upload
      const supabasePath = fileName;
      const { data, error } = await supabase.storage
      .from('files')
      .upload(supabasePath, req.file.buffer, {
          upsert: false,
          contentType: req.file.mimetype,
      })
      if (error) {
        console.log(error)
        return res.status(400).json(error)
      } else {
        //add to database
        return res.status(200).json("added to file")

        // await db.createFile(fileName,supabasePath,fileSize,req.user,folder)
      }
      // return res.redirect("/user/"+folder.folder_name);
    }})
}
profilePost =[
  validateProfile,
  async function (req, res) {
      jwt.verify(req.token,process.env.SECRET,async (err,authData)=>{
          if(err){
              res.sendStatus(403)
          }else{
              const userid = authData.user.id;
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                  return res.status(400).json(errors.array())
              }
              let {bio,pictureURL} = req.body;
              
              await db.createProfile(bio,pictureURL,userid);
              res.sendStatus(200);
          }
      })
  }
]

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

module.exports = {
    newUserCreate,
    logIn,
    userDelete,
    userProfileGet,
    singleProfileGet,
    profilePost,
    fileUploadPost,
    profileUpdate,
    
};