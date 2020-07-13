const express = require('express');
var cors = require('cors')
const{MongoClient, ObjectID} = require('mongodb');
app = new express();
app.use(cors())
let connection;

mongoconfig = {
   url: "mongodb://localhost:27017",
   database : "test"
}
app.use(express.json())

MongoClient.connect(mongoconfig.url,{ useUnifiedTopology: true})
.then(db=>{
   connection = db;
   console.log("connected");
})
.catch(err => console.error(err.stack))

app.get('/test', (req,res)=>{
   connection.db(mongoconfig.database).collection('mycol').find().toArray((err, result)=>{
      if(err) throw err;
      res.json(result);
	  console.log("posting");
      console.log(result);
   })
})
app.get('/:name', (req,res)=>{
   connection.db(mongoconfig.database).collection('mycol').find().toArray((err, result)=>{
      if(err) throw err;
      res.json(result);
	  console.log("posting");
      console.log(result);
   })
})




// obj = {"name":"dfdsf",
// "adsfadsf":"asfasd"}    

app.post('/test', (req,res)=>{
   console.log("dd");
   connection.db(mongoconfig.database).collection('mycol').insertOne(req.body, function (err, result) {
      if(err) throw err;
      res.json(req.body);
      console.log(req.body);
   })
})
app.listen(9000);

