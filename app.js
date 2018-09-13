const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const crypto = require('crypto')

const url = 'mongodb://localhost:27017'

const dbName = 'jobby'

const insertUser = function(db, callback) {
  let passwd = 'jobby123'
  let shasum = crypto.createHash('sha256')
  shasum.update(passwd)

  let user = {
    'username': 'admin',
    'password': shasum.digest('hex')
  }

  const usersCollection = db.collection('users')

  usersCollection.insertOne(user, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted 1 documents user into the users collection");
    callback(result)
  })
}

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err)
  console.log("Connected successfully")

  const db = client.db(dbName)

  insertUser(db, function() {
    client.close()
  })
})


