const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var ulr = 'mongodb+srv://long123:12345@cluster0.fhx74.mongodb.net/test'

const databaseName = 'GCH0904_DB'

async function insertObject(collectionName, newP) {
    let client = await MongoClient.connect(ulr)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    await dbo.collection(collectionName).insertOne(newP)
}

async function getAllFromCollection(collectionName){
    let client = await MongoClient.connect(ulr)
    let dbo = client.db(databaseName) 
    return await dbo.collection(collectionName).find({}).toArray()
}

async function getDocumentById(collectionName, id){
    let client = await MongoClient.connect(ulr)
    let dbo = client.db(databaseName) 
    return await dbo.collection(collectionName).findOne({_id:ObjectId(id)})
}

//myquery: dieu kien update
//newvalues: gia tri moi can update
async function updateCollection(collectionName, myquery, newvalues) {
    let client = await MongoClient.connect(ulr)
    let dbo = client.db(databaseName) 
    await dbo.collection(collectionName).updateOne(myquery, newvalues)
} 

async function deleteDocumentById(collectionName,id){
    let client = await MongoClient.connect(ulr)
    let dbo = client.db(databaseName)
    await dbo.collection(collectionName).deleteOne({_id: ObjectId(id)})
}

module.exports = {insertObject,getAllFromCollection,getDocumentById,updateCollection,deleteDocumentById}