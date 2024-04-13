const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())


const db = mysql.createConnection({

    host:"localhost",
    user:'root',
    password:'201004',
    database:'comhub_database'

})

// Connect to MySQL database
db.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });
  

app.get('/',(re,res) => {
    return res.json("from backend");
})


app.listen(8081,()=>{
    console.log("leastening");
})

app.get('/users', (req,res) =>{

    const sql = "select * from users"
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })


})