const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'registered'
});

const defultHistory =JSON.stringify([{},{},{}]);

//regidter
router.post('/register', async function (req, res){      
    let email = req.body.email;
    let psw = req.body.password;
    if(email.trim()=='' || psw.trim()==''){res.json({message:'One or more of the fields are missing'});}
    else if(psw.length<4){res.json({message: 'The password must be at least 4 characters long'});}
    else{
        let sql=`SELECT email FROM users WHERE email='${email}'`;
    await con.query(sql,async(err, results)=>
    {
        if(results.length==0){
            sql= `INSERT INTO users (email, password, history) VALUES ('${email}','${psw}','${defultHistory}')`;
            await con.query(sql, (err)=>{
                console.log(err?err.message:'insert user')
            });
            global.user = email;
            res.json({main:true});
        }
        else if(results.length>0){
            res.json({message:'This email is already registered'});
        }
        else{res.json({message:'uncaught error'});}  
    });}    
})

//login
router.post('/',  async function (req, res){
    let email = req.body.email;
    let psw = req.body.password;
    if(email.trim()=='' || psw.trim()==''){res.json({message:'One or more of the fields are missing'});}
    else{
    let sql=`SELECT password FROM users WHERE email='${email}'`;
        await con.query(sql,async(err, results)=>{
            if(!results[0]){            
                res.json({message:"email doesn't exist"});
            }
            else if(results[0].password==psw){
                global.user = email;
                console.log(global.user);
                res.json({main:true});
            }
            else{
                res.json({message:'wrong password'});
            }
        })
    }
})

module.exports = router;