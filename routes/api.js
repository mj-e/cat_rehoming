const express = require('express');
const router = express.Router();
const catModel =  require('../models/cats')

router.route('/').get(function (req, res) {
    res.status(200).send({status: 'OK'});
});

router.route('/cats').get(function (req, res) {
    const quiries = req.query
    const quirArray = Object.keys(req.query)
    const quirParameters = Object.values(req.query)
    console.log(quiries, quirArray, quirParameters);
    
    catModel.find({}, function (error, cats) {
        if (error) {
            return res.status(500).send({error: error});
        }
        res.status(200).send({cats: cats});
    });
});

module.exports = router;