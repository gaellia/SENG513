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
  } else {
    authGlobal.init()
    }
})

// profile button listener
$(document).on('click', '#profile-btn', () => {
  view.profileModal()
})

$(document).on('click', '#setting-btn', () => {
  view.settingsModal()
})

const authGlobal = {
  // returns shoeboxes of user
  fetchBoxes: function(user) {
    model.shoebox().where('memberEmails', 'array-contains', user.email).get().then(response => {

      model.local('user', {uid: user.uid, displayName: user.displayName, email: user.email})
      model.local('boxes', response.docs.map(docs => docs.data()))
      model.local('pendingBoxes', [])
      model.shoebox().get().then(res => {
        let allBoxes = res.docs.map(docs => docs.data())
        allBoxes.forEach(box => {
          model.shoebox(box.boxID).collection('members').where('role', '==', 'invited').where('email', '==', model.local('user').email).get().then(members => {
            if (members.docs.map(docs => docs.data()).length > 0) {
              let pending = model.local('pendingBoxes')
              pending.push(box.boxID)
              model.local('pendingBoxes', pending)
            }

            view.selectShoeBox()
          })
        })
      })
    })
  },

  // initializes login module
  init() {
    view.auth()

    if(developmentMode)
      auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
    else {
      // turn off console logs and console errors
      console = {log(){}, error(){}}

      // stay logged in
      auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    }
    
    // auth ctrl inner
    let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
    ui.start('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => false,
      },
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    })

    $(".firebaseui-title").html('Log in or create account')
    $(document).on('click', '#to-top', () => {
      $("html, body").animate({ scrollTop: 0 }, "slow")
    })

    $(document).on('click', '#home-learn-more', () => {
      $("html, body").animate({ scrollTop: $(document).height() }, "slow")
    })
  }
}

// listener for the logout button
$(document).on('click', '.logout', () => {
  firebase.auth().signOut().then( () => {
      location.reload()
  })
})