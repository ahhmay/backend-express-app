const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const mongoURL = "mongodb://localhost:27017";
const DATABASE_NAME = "jobs";
const COLLECTION_NAME = "joblist";


// HTTP GET REQUEST
// URL: http://localhost:4000/api/joblist
router.get("/joblist", (req, res) => {
  mongoClient.connect(mongoURL, (err, client) => {
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    collection.find({}).sort({jobid: 1}).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    })
  });
});


// PUT HTTP REQUEST(To change JobName, and JobDescription)
// URL: http://localhost:4000/api/update_record
router.put("/update_record", (req, res, next) => {
  const { jobId, job_name, job_desc } = req.body;

  mongoClient.connect(mongoURL, (err, client) => {
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    collection.updateOne(
      { jobid: +jobId },
      { $set: { jobename: job_name, jobdescription: job_desc }},
      (err, result) => {
        if (err) throw console.log(err);
        res.send("RECORD UPDATED");
      }
    );
  });
});


// PUT HTTP REQUEST(To change JobStatus)
// URL: http://localhost:4000/api/update
router.put("/update", (req, res, next) => {
  const { jobId, status_bool } = req.body;

  let statusCompleted = status_bool ? "Completed" : "InProgress";

  mongoClient.connect(mongoURL, (err, client) => {
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    collection.updateOne(
      { jobid: +jobId },
      { $set: { status_bool: status_bool, status: statusCompleted }},
      (err, result) => {
        if (err) throw console.log(err);
        res.send("UPDATED SUCCESSFULLY");
      }
    );
  });
});


// HTTP DELETE REQUEST
// URL: http://localhost:4000/api/delete/1001
router.delete('/delete/:jobid', (req, res)=>{
  mongoClient.connect(mongoURL, (err, client)=>{
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME)

    collection.deleteOne({jobid: +req.params.jobid}, (err, result)=>{
      if(err) throw err;
      res.send('DELETED RECORD SUCCESSFULLY')
    })
  })
})

let boolean_value = true;
// POST HTTP REQUEST
// URL: http://localhost:4000/api/post
router.post('/post', (req, res, next)=>{
    const {jobid, jobename, jobdescription, status, status_bool} = req.body;
    mongoClient.connect(mongoURL, (err, client)=>{
        const db = client.db(DATABASE_NAME)
        const collection = db.collection(COLLECTION_NAME)

        collection.find({}).sort({jobid: -1}).limit(1).toArray((err, result)=>{
          if(err) throw err;
          console.log(result[0].jobid)
          collection.insertOne(
            {
              jobid: parseInt(+result[0].jobid + 1),
              jobename: jobename,
              jobdescription: jobdescription,
              status: status,
              status_bool: status_bool,
            },
            (err, result) => {
              if (err) throw err;
              res.send('Record Inserted Successfully.')
            }
          );
        })
    })
})

module.exports = router;
