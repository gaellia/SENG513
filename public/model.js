// all code database related go here

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