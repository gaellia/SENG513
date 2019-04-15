// all code database related go here

// global variables
let GLOBAL_FILE
let MSG_LISTENER
let GLOBAL_DOWNLOAD


// Temp(?) Solution for default logos
const DEFAULT_LOGOS = ["https://firebasestorage.googleapis.com/v0/b/shoebox513.appspot.com/o/images%2Fdefault_logos%2FShoebox0.png?alt=media&token=ea1cd29c-6939-498b-8717-711f56dc5f56",
                        "https://firebasestorage.googleapis.com/v0/b/shoebox513.appspot.com/o/images%2Fdefault_logos%2FShoebox1.png?alt=media&token=e22da256-c377-4749-9120-bf1004692c74",
                        "https://firebasestorage.googleapis.com/v0/b/shoebox513.appspot.com/o/images%2Fdefault_logos%2FShoebox2.png?alt=media&token=def9f899-17ad-4180-9f60-1db6c08ecf9c",
                        "https://firebasestorage.googleapis.com/v0/b/shoebox513.appspot.com/o/images%2Fdefault_logos%2FShoebox3.png?alt=media&token=a9b7e506-7125-4679-b707-24ed71d42474",
                        "https://firebasestorage.googleapis.com/v0/b/shoebox513.appspot.com/o/images%2Fdefault_logos%2FShoebox4.png?alt=media&token=8980d59a-c78f-4026-9321-56ce11978ff6"]


const m = () => {
    const db = firebase.firestore()

    return ({

/**
 * user: {
 *  uid: String,
 *  displayName: String,
 *  email: String,
 * }
 */

//
        user: (docID, callback) => {
            // get ref for all
            if(!docID) return db.collection('user')
            // get ref for one
            else if(!callback) {
                return db.collection('user').doc(docID)
            }
            // listener for one user
            // no use cases currently
            else {
                return db.collection('user').doc(docID).onSnapshot(callback)
            }
        },

/**
 * shoebox: {
 *  boxID: String,
 *  name: String,
 *  description: String,
 *  memberEmails: [String],
 *  logoURL: String,
 * }
 * 
 * collections in shoebox:
 *   members: [{
 *      email: String,
 *      role: ["owner", "member", "invited"]
 *  }],
 *  messages: [{
 *      displayName: String,
 *      message: String,
 *      timestamp: Date,
 *  }],
 *  cards: [{
 *      mediaType: ["picture", "video", "text"],
 *      storageID: String,
 *      display: {
 *          x: Number,
 *          y: Number,
 *          width: Number,
 *          height: Number
 *      }
 *      title: String,
 *      text: String.
 *      author: String (user.email),
 *      resourceURL: String
 * }]
 * 
 * example:
 * 
 * model.shoebox('vET5va5u3J5V2gPieine').collection('members').get()
 * 
 */
        shoebox: (docID, callback) => {
            // get ref for all
            if(!docID) return db.collection('shoebox')
            // get ref for one
            else if(!callback) {
                return db.collection('shoebox').doc(docID)
            }
            // listener for changes of one shoebox
            else {
                return db.collection('shoebox').doc(docID).onSnapshot(callback)
            }
        },

        //model.getByBoxID(boxID, 'members')
        // you may chain .add() || .set() || .get() || .where() || .orderBy() || .onSnapshot
        getByBoxID: (id, collectionName) => new Promise ((resolve, reject) => {
            db.collection('shoebox').where('boxID', '==', id).get().then(({docs}) => {
                resolve(db.collection('shoebox').doc(docs[0].id).collection(collectionName))
            })
        }),

        /**
         * Only supports: [array, object, string]
         */
        local: (name, value, log) => {
            switch(value) {
                // When null passed, clear the item from local storage
                case null:
                    localStorage.removeItem(name)
                    if(log) console.log(`REMOVED ${name}`)
                    break
                // When undefined, return the value from local storage
                case undefined:
                    const result = localStorage.getItem(name)
                    return JSON.parse(result)
                // Otherwise set the value for the given key
                default:
                    const obj = typeof(value)==='object'? JSON.stringify(value): value
                    localStorage.setItem(name, obj)
                    if(log) {
                        console.log(`SET ${name} TO:`)
                        console.log(value)
                    }
                    return obj
            }
        }
    })
}

const model = m()