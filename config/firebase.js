const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");
//initialize firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://addressbook-b04d0.firebaseio.com"
});
const dbfirebase = admin.firestore();
dbfirebase.settings({ timestampsInSnapshots: true });

module.exports = admin.app();
//!admin.apps.length ? admin.initializeApp(config) :
//const  = dbf.ref("users");
const message = { title: "hello there", timestamp: new Date().toString() };
