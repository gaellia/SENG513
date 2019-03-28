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
        user: param => {
            // get ref for all
            if(!param) return db.collection('user')
            // get ref for one
            else if(typeof(param)!=='function') {
                return db.collection('user')
            }
            // listener
            else {
                return db.collection('user').onSnapshot(param)
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
        shoebox: param => {
            // get ref for all
            if(!param) return db.collection('shoebox')
            // get ref for one
            else if(typeof(param)!=='function') {
                return db.collection('shoebox')
            }
            // listener for changes of shoebox
            else {
                return db.collection('shoebox').onSnapshot(param)
            }
        },

        local: (name, value, log) => {
            switch(value) {
                // When null passed, clear the user from local storage
                case null:
                    localStorage.removeItem(name)
                    if(log) console.log(`REMOVED ${name}`)
                    break
                // When undefined, return the user from local storage
                case undefined:
                    return localStorage.getItem(name)
                // Otherwise set the user that is passed
                default:
                    localStorage.setItem(name, value)
                    if(log) {
                        console.log(`SET ${name} TO:`)
                        console.log(value)
                    }

            }
        }
    })
}

const model = m()