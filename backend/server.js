const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./Model/user.model');
const app = express();

require('./initDB')();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Headers", "Origin,Content-type,Accept,X-Requested-With,Authorization");
    res.setHeader("Access-Control-Allow-Methods", "POST,PATCH,DELETE,GET,OPTIONS,PUT");
    next();    
});

app.post("/signin", (req, res, next) => {
    let userDetails;
    bcrypt.hash(req.body.password, 10).then(value => {
        userDetails = new userModel({
            name: req.body.name,
            mobileNo: req.body.mobileNo,
            emailId: req.body.emailId,
            password: value
        });

        userDetails.save()
        .then(saved => {
                 res.status(200).json({
                     result: saved
                 })
        }).catch((err) => {
            res.status(422).json({
                message: "Check the data"
            });
        });

    }).catch((err) => {
        res.status(500).json({
            message: "something went wrong, try later"
        })
    });   
});

app.post('/login', (req, res, next) => {
    let user;
    userModel
        .findOne({ emailId: req.body.emailId })
        .then(result => {
            if (!result) {
                return  res.status(401).json({
                message: "Unauthorized User"
                });
            }
            user = result;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result)
            {
                return  res.status(401).json({
                    message: "Unauthorized User"
                    });
            }    
            const token = jwt.sign(
                { emailId: user.emailId, password: user.password },
                "8uhf98dsvhdsv9dvds9vg",
                { expiresIn: '1h' }
            );
            res.status(200).json({
                message: "Authenticated User",
                token: token,
                expiresIn: 3600
            })
        })
        .catch(err => {
            res.status(401).json({
                message: "Unauthorized User"
            });
        });
});

app.listen(3000, () => {
    console.log("Server started....");
});