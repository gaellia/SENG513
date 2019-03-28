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
        user: (param, docID) => {
            // get ref for all
            if(!param) return db.collection('user')
            // get ref for one
            else if(!docID) {
                return db.collection('user')
            }
            // listener
            else {
                return db.collection('user').doc(docID).onSnapshot(param)
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
        shoebox: (param, docID) => {
            // get ref for all
            if(!param) return db.collection('shoebox')
            // get ref for one
            else if(!docID) {
                return db.collection('shoebox')
            }
            // listener for changes of shoebox
            else {
                return db.collection('shoebox').doc(docID).onSnapshot(param)
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