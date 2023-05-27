const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
var connection = require('./database');

const app = express();
app.use(cors());
app.use(express.json());




app.post('/signup', (req, res) => {
    const sql = "INSERT INTO `login` (`name`, `email`, `password`) VALUES (?);"
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    console.log(req.body);
    connection.query(sql, [values], (err, data) => {
        if (err) {
            console.log(err);
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM `login` where `email`=? AND `password`=?;"
    connection.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.log(err);
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        }
        else {
            return res.json("Fail")
        }
    })
})



app.listen(8081, () => {
    console.log("listening");
    connection.connect(function (err) {
        if (err) throw err;
        console.log("database connected");
    })
})


