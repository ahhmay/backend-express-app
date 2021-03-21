const express = require('express')
const router = express.Router()
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient;
const mongoURL = "mongodb://localhost:27017";
const DATABASE_NAME="products";
const COLLECTION_NAME="product_list";

// GET HTTP REGUEST
// URL: http://localhost:4000/api/product_list
router.get('/product_list', (req, res, next)=>{
    mongoClient.connect(mongoURL, (err, client)=>{
        const db = client.db(DATABASE_NAME)
        const collection = db.collection(COLLECTION_NAME)

        collection.find({}).toArray((err, result)=>{
            if(err) throw err;
            res.send(result);          
        })
    })
})

// POST HTTP REQUEST
// URL: http://localhost:4000/api/enter_product
// router.post('/enter_product', (req, res, next)=>{
//     const {username, name, email, password} = req.body;
//     mongoClient.connect(mongoURL, (err, client)=>{
//         const db = client.db(DATABASE_NAME)
//         const collection = db.collection(COLLECTION_NAME)

//         collection.insertOne({username:username, name:name, email:email, password:password}, (err, result)=>{
//             if(err) throw err;
//             res.send('USER REGISTERED SUCCESSFULLY');
//         })
//     })
// })

// ------------------------------ QUOTES DATABASE ---------------------------------------------------------------------------------

const QUOTES_DATABASE='quotes';
const QUOTES_COLLECTION='quotes_collection';
// GET HTTP REGUEST
// URL: http://localhost:4000/api/quotes
router.get('/quotes', (req, res, next)=>{
    mongoClient.connect(mongoURL, (err, client)=>{
        const db = client.db(QUOTES_DATABASE)
        const collection = db.collection(QUOTES_COLLECTION)

        collection.find({}).toArray((err, result)=>{
            if(err) throw err;
            res.send(result);          
        })
    })
})

// POST HTTP REQUEST
// URL: http://localhost:4000/api/enter_quote
router.post('/enter_quote', (req, res, next)=>{
    const {quote, author} = req.body;
    mongoClient.connect(mongoURL, (err, client)=>{
        const db = client.db(QUOTES_DATABASE)
        const collection = db.collection(QUOTES_COLLECTION)

        collection.insertOne({quote: quote, author: author}, (err, result)=>{
            if(err) throw err;
            res.send('QUOTE INSERTED');
        })
    })
})


module.exports = router;