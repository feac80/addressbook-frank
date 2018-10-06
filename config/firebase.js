const admin = require("firebase-admin");

const serviceAccountTest = require("../serviceAccountKeyTest.json");
const serviceAccount = require("../serviceAccountKey.json");
//initialize firebase
//https://addressbook-b04d0.firebaseio.com
//https://addressbook-test-9f9b7.firebaseio.com/
let config = {};
process.env.NODE_ENV.trim() === "test"
  ? (config = {
      credential: admin.credential.cert(serviceAccountTest),
      databaseURL: "https://addressbook-test-9f9b7.firebaseio.com"
    })
  : (config = {
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://addressbook-b04d0.firebaseio.com"
    });

admin.initializeApp(config);

const dbfirebase = admin.firestore();
dbfirebase.settings({ timestampsInSnapshots: true });

module.exports = admin.app();
//!admin.apps.length ? admin.initializeApp(config) :
//const  = dbf.ref("users");
//const message = { title: "hello there", timestamp: new Date().toString() };
