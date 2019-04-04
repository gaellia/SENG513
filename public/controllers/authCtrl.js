const developmentMode = false

const auth = firebase.auth()

// on login listener
auth.onAuthStateChanged(user => {
  
  // reset local storage
  model.local('user', null)
  model.local('boxes', null)
  model.local('currentBox', null)

  if(user) {
    model.user().get().then(({docs}) => {

      // if new user
      if(!docs.map(docs => docs.data()).some(({uid}) => uid==user.uid)) {
        const {uid, displayName, email} = user
        model.user().add({uid, displayName, email})
        
        model.local('boxes', [])
        model.local('user', {uid, displayName, email})

        view.selectShoeBox()
      } else {
        
        // fetch my shoeboxes
        authGlobal.fetchBoxes(user)
      }
    })
  }
})

const authGlobal = {
  // returns shoeboxes of user
  fetchBoxes: function(user) {
    model.shoebox().where('memberEmails', 'array-contains', user.email).get().then(response => {

      model.local('user', {uid: user.uid, displayName: user.displayName, email: user.email})
      model.local('boxes', response.docs.map(docs => docs.data()))

      view.selectShoeBox()
    })
  },

  // initializes login module
  init() {
    view.auth()

    if(developmentMode)
      auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
    else
      auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    
    // auth ctrl inner
    new firebaseui.auth.AuthUI(auth).start('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => false,
      },
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    })
  }
}