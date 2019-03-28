const developmentMode = true

const auth = firebase.auth()

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

auth.onAuthStateChanged(user => {
  model.local('user', null)
  model.local('boxes', null)
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
  fetchBoxes: function(user) {
    model.shoebox().get().then(({docs}) => {
      const activeMember = ({email, role}) => email==user.email&&['owner', 'member'].some(e=> e==role)
      const myShoeBoxes = docs.map(docs => docs.data()).filter(({members}) => members.some(activeMember))


      model.local('user', {uid: user.uid, displayName: user.displayName, email: user.email})
      model.local('boxes', myShoeBoxes)

      view.selectShoeBox()
    })
  }
}