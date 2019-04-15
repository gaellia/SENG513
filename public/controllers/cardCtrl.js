// listens to the add button
$(document).on('click', '#addButton', e => {
    view.createCard()

    $(".file").on("change", function(event) {
        GLOBAL_FILE = event.target.files[0]
    })
    
    $('#card-image').hide()
})


// create new card form submit
$(document).on('click', '#create-card-submit', e => {
    e.preventDefault() // access form elements here

    let currentBox = model.local('currentBox')
    
    let newCard = {
        title: $('#card-name').val(),
        text: $('#card-text').val(),
        author: model.local("user").email,
    }

    let imageSrc = $('#card-image').attr('src')

    if (imageSrc !== "//:0") {
        // TODO add video recgonition to differentiate
        newCard.mediaType = "picture"
        newCard.resourceURL = $('#card-image').attr('src')
    }
    else {newCard.mediaType = "text"}

    model.getByBoxID(currentBox.boxID, "cards").then(res => {
        res.add(newCard).then(() => {
            chatGlobal.bot(`Checkout "${newCard.title} by ${model.local('user').displayName}"!`)
            view.viewShoeBox(currentBox)
        })
    }).catch(err => {
        console.log('err', err)
    })
})

// listens to the edit button
$(document).on('click', '.edit-card-btn', e => {
    view.editCard(e.currentTarget.id.substr(5))

    $(".file").on("change", function(event) {
        GLOBAL_FILE = event.target.files[0]
        fileChanged.setTrue()
    })
    
})

$(document).on('click', '.delete-card-btn', e => {
    model.shoebox(model.local('currentBox').boxID).collection('cards').doc(e.currentTarget.id.substr(12)).delete().then(response => {
        view.viewShoeBox(model.local('currentBox'))
    })
})