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
 *      email: String,
 *      role: ["owner", "member", "invited"]
 *  }],
 *  messages: [{
 *      email: String,
 *      displayName: String,
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

                    localStorage.setItem(name, typeof(value)==='object'? JSON.stringify(value): result)
                    if(log) {
                        console.log(`SET ${name} TO:`)
                        console.log(value)
                    }

            }
        }
    })
}

const model = m()