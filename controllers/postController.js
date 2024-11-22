const db = require("../prisma/queries.js");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


//post form validation and handling
const validatePost= [
    body("title").trim()
      .escape()
      .isLength({ min: 1, max: 50 }).withMessage(`Title must be between 1 and 50 characters.`),
    body("text").trim()
        .escape()
        .isLength({ min: 1 }).withMessage(`Text must contain text`),
];

async function allPostsGet (req, res) {
    const posts = await db.findAllPosts();
    res.json(posts);
}
newPostCreate = [
    validatePost,
    async function (req, res) {
        jwt.verify(req.token,'lemons',async (err,authData)=>{
            if(err){
                res.sendStatus(403)
            }else{
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json(errors.array())
                }
                const user = authData.user;
                const {title,text,publish} = req.body
                await db.createPost(title,text,Boolean(publish),user.id)
                res.sendStatus(200);
            }
            
        })
    }
]



module.exports = {
    allPostsGet,
    newPostCreate,
  
};