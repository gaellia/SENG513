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
 
 // serving the client side
 app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))
 app.post('/sendInvites', (req, res) => {
     let members = req.body
     for (let member of members) {
         if (member.role === 'invited') {
             emailAPI.sendEmail(member.email)
         }
     }
 })


/* firestore.collection('shoebox').onSnapshot(snapshot => {
  const changes = snapshot.docChanges()
  changes.some(res => {
   const {_type, _document} = res
   if(_type==='added') {
    firestore.collection('shoebox').doc(_document.id).collection('members').where('role', '==', 'invited').get().then(({docs}) => {
     docs.map(docs => docs.data()).forEach(doc => {
      console.log(doc)
      emailAPI.sendEmail()
     })
     return true
    }).catch(err => {
     console.log('uhoh')
     console.log(err)
    })
   }
  })
 })*/
 
 exports.app = functions.https.onRequest(app)