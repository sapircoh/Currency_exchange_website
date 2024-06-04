const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
});

async function create() {
    await con.connect(function (err) {console.log(err?err.message:'mysql start');});    
    let sql = 'CREATE DATABASE IF NOT EXISTS registered';
    await con.query(sql, (err)=>{console.log(err?err.message:'db created')});
    await con.changeUser({database : 'registered'}, (err) => {console.log(err?err.message:'cange db')});
    sql = `CREATE TABLE IF NOT EXISTS users(
        email varchar(100) primary key NOT NULL,
        password varchar(16) NOT NULL,
        history json
        )`;
    await con.query(sql, (err)=>{console.log(err?err.message:'table created')});
    await con.end(function () {console.log('mysql end');})
};


router.get('/', async function (req, res){
    create();  
    res.send('ok');
})

// router.get('/drop', async function (req, res){
//     await con.connect(function (err) {console.log(err?err.message:'mysql start');});
//     await con.query('drop database registered', (err)=>{console.log(err?err.message:'drop')});
//     create();
//     res.send('drpo');
// })


module.exports = router;