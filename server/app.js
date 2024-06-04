const express = require('express');
const app = express();
const cors = require('cors');

global.user='';
//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/login',  require('./routes/logIn'));
app.use('/create', require('./routes/createDB'));
app.use('/data', require('./routes/historicalData'));
app.use('/trends', require('./routes/trensdData'));
app.use('/history', require('./routes/myHistory'));

app.get('/', function (req, res) {});
app.get('/login/register', function (req, res) {});
app.get('/login', function (req, res) {});
app.get('/main', function (req,res) {
  global.user='q@qq.com';
  res.json({ user:global.user});
});

app.use('*', function(req, res){
  res.status(404).json('page not found');
});

//
async function run(){    
    app.listen(3001, ()=>console.log('server start'));
}
run().catch(err => console.log(err));