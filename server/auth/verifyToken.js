const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.use('/', (req, res, next) =>{
    
    try {
        const { authorization } = req.headers;
        if (!authorization) return res.json({message: "Verification failed", status: false});
        jwt.verify(authorization, process.env.SECRET, (err, decoded) =>{
            if (err) return res.json({message: "Verification failed", status: false});
            req.decoded = decoded;
            next()
        });
    } catch {
        res.json({ error: "error from verification", status: false })
    }
});


module.exports = router;