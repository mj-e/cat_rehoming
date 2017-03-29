const express = require('express');
const router = express.Router();
const catModel =  require('../models/cats')
const bodyParser = require('body-parser')

router.route('/').get(function (req, res) {
    res.status(200).send({status: 'OK'});
});

router.route('/cats')
    .get(function (req, res) {
        const queryObj = req.query
        const queryKey = Object.keys(req.query)
        let queryValue = Object.values(req.query)
        if (queryKey.length === 1 && queryValue[0].length > 1) {
            for (let i = 1; i < queryValue[0].length; i++) {
                queryKey.push(queryKey[0]);
                queryValue.push(queryValue[0][i])
            }
            queryValue.push(queryValue[0][0])
            queryValue = queryValue.slice(1);
        }
        
        console.log(queryKey, queryValue)
        
        const queries = queryKey.map((x,i) => {

            const upAgeQuery = {age:{$lt:queryValue[i]}}
            const loAgeQuery = {age:{$gt:queryValue[i]}}
            const readyForHomeQuery = {ready_for_home:queryValue[i]}
            const personality = {personality:{$in:[queryValue[i]]}}
            const personalityNot = {personality:{$nin:[queryValue[i]]}}
            const ageIs = {age:queryValue[i]}
            const queryTable = {upperage: upAgeQuery, lowerage: loAgeQuery, readyforhome: readyForHomeQuery, personality: personality, personalitynot: personalityNot, age: ageIs}
    
            return queryTable[x]
        });
        const query = queries.length === 0 ? {} : {$and: queries}
        
        catModel.find(query, function (error, cats) {
            if (error) {
                return res.status(500).send({error: error});
            }
            res.status(200).send({cats: cats});
        });
    })
    .post(function (req, res) {
        const body = req.body
        let cat = new catModel(body)
        cat.save(function (error, cats) {
            if (error) {
                return res.status(500).send({error: error});
            }
            res.status(201).send({requestOK: body});
        });
    });



router.route('/cats/:cat_id')
    .get(function (req, res) {
        const id = req.params.cat_id

        catModel.find({_id: id}, function (error, cats) {
            if (error) {
                return res.status(500).send({error: error});
            }
            res.status(200).send({cats: cats});
        });
    })
    .put(function (req, res) {
        const id = req.params.cat_id
        let queryKey = Object.keys(req.query)[0]
        let queryValue = Object.values(req.query)[0]
                
        if (queryKey === 'age') query = {$set: {age: queryValue}}
        if (queryKey === 'name') query = {$set: {name: queryValue}}
        if (queryKey === 'ready_for_home') {
            queryValue = queryValue === 'true' ? true : false
            query = {$set: {name: queryValue}}
        }
        if (queryKey === 'personality') query = {$addToSet: {personality: queryValue }}
        if (queryKey === 'personalitynot') query = {$pull: {personality: queryValue }}
                
        catModel.update({_id: id},query, function (error, cats) {
             if (error) {
                return res.status(500).send({error: error});
            }
            res.status(202).send({MODIFIED: cats})
        })
    })
    .delete(function (req, res) {
        const id = req.params.cat_id
        catModel.remove({_id: id}, function (error, cats) {
            if (error) {
                return res.status(500).send({error: error});
            }
            res.status(204).send({DELETED: cats})
        })

    });


module.exports = router;




