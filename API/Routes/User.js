const express = require('express');
const router = express.Router();
const mysqlConnection = require('../Connection/connection');
const jwt = require('jsonwebtoken');

router.get('/',  (req,res)=>{
    mysqlConnection.query('select * from user', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }
        else{
            console.log(err);
        } 
    })
});

router.post('/SignIn', (req,res)=>{
    const {email,password} = req.body;
    mysqlConnection.query('select * from user where email=? and password=?',
    [email,password],
    (err, rows, fields) =>{
        if(!err){
            if(rows.length >0){
                let data = JSON.stringify(rows[0]);
                const token = jwt.sign(data, 'stil');
                res.json({token});
            }
            else{
                res.json("User Or Password Error");
            }
        }
        else{
            console.log(err);
        }
    })
});
router.post('/Test', verifyToken, (req,res)=>{
    res.json('Secret Info');
});

function verifyToken(req, res, next){
    if(!req.headers.authorization)
    return res.status(401).json('NO AUTH');

    const token = req.headers.authorization.substr(7);
    if(token!==''){
        const content = jwt.verify(token,'stil');
        req.data = content;
        next();
      }
    else{
        res.status(401).json('Empty Token');
      }
}

module.exports = router;