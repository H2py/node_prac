const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://ahdosj:%40Skt121497@cluster0.smpwmm7.mongodb.net/clone-code?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    
    console.log("Connected to MongoDB");
    await client.db("admin").command({ ping: 1 });

    // URI default DB와 일치
    const collection = client.db("test").collection("person");

    await collection.insertOne({ name: 'Andy', age: 30 });
    console.log("Done to add document");

    const documents = await collection.find({ name: 'Andy' }).toArray();
    console.log('Documents found:', documents);

    await collection.updateOne({ name: 'Andy' }, { $set: { age: 31 } });
    console.log("Done to update document");

    const updatedDocuments = await collection.find({ name: 'Andy' }).toArray();
    console.log('Updated documents:', updatedDocuments);

    // await collection.deleteOne({name : 'Andy'});
    // console.log("Done to delete document");

    const adminDB = client.db("admin").admin();
    const listDatabases = await adminDB.listDatabases();
    console.log(listDatabases);

    return "OK";
  } finally {
    await client.close();
  }
}

run()
  .then(console.log)
  .catch(console.dir);
