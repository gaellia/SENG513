 // firebase
 const firebase = require("firebase-admin")
 const functions = require('firebase-functions')
 firebase.initializeApp(functions.config().firebase)
 
 const app = require('express')()
 
 // serving the client side
 app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))

 
 
 exports.app = functions.https.onRequest(app)