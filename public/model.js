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
 *  name: String,
 *  description: String,
 *  members: [{
 *      userID: String,
 *      role: ["owner", "member", "invited"]
 *  }],
 *  messages: [{
 *      userID: String,
 *      message: String,
 *      timestamp: Date,
 *  }],
 *  media: [{
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
 * }
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

        local: (name, value, log) => {
            switch(value) {
                case null:
                    Cookies.remove(name)
                    if(log) console.log(`REMOVED ${name}`)
                    break
                
                case undefined:
                    return Cookies.getJSON(name)
                
                default:
                    Cookies.set(name, value)
                    if(log) {
                        console.log(`SET ${name} TO:`)
                        console.log(value)
                    }

            }
        }
    })
}

const model = m()