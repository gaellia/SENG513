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
 *      email: String,
 *      role: ["owner", "member", "invited"]
 *  }],
 *  messages: [{
 *      email: String,
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
                // When null passed, clear the item from local storage
                case null:
                    localStorage.removeItem(name)
                    if(log) console.log(`REMOVED ${name}`)
                    break
                // When undefined, return the value from local storage
                case undefined:
                    return JSON.parse(localStorage.getItem(name))
                // Otherwise set the value for the given key
                default:
                    localStorage.setItem(name, JSON.stringify(value))
                    if(log) {
                        console.log(`SET ${name} TO:`)
                        console.log(value)
                    }

            }
        }
    })
}

const model = m()