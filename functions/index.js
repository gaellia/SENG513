 // firebase
 const firebase = require("firebase-admin")
 const functions = require('firebase-functions')
 const emailAPI = require('./API/emailAPI')
 const bodyParser = require('body-parser')
 const cors = require('cors')
 firebase.initializeApp(functions.config().firebase)

 const app = require('express')()
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended: true}))
 app.use(cors())
 
 app.post('/sendInvites', ({body}, res) => {
    //  console.log('sending invites')
    //  console.log(body)

     const {user, boxObject: {name, description, logoURL}, members} = body
    for (let member of members) {
        if (member.role === 'invited') {
            emailAPI.sendEmail(member.email, user, name, description, logoURL)
        }
    }
    res.send({status: 200, msg: "invite sent"})
    return
 })
 
 // serving the client side
 app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))
 
 
 exports.app = functions.https.onRequest(app)