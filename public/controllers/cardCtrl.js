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

    console.log(currentBox.boxID)
    model.getByBoxID(currentBox.boxID, "cards").then(res => {
        res.add(newCard).then(() => {
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
    })
    
})

$(document).on('click', '.delete-card-btn', e => {
    model.shoebox(model.local('currentBox').boxID).collection('cards').doc(e.currentTarget.id.substr(12)).delete().then(response => {
        view.viewShoeBox(model.local('currentBox'))
    })
})

$(document).on('click', `.save-card-btn`, e => {

    const box = model.local('currentBox')
    const cardID = e.currentTarget.id.substr(10)

    let newTitle = $('#card-name').val()
    let newText = $('#card-text').val()

    model.shoebox().where('boxID', '==', box.boxID).get().then(response => {
        response.docs.map(doc => {

            // update card
            model.shoebox(doc.id).collection('cards').doc(cardID).update({
                title: newTitle,
                text: newText
            }).then( () => {
                view.viewShoeBox(box)
            })
        })
    })
})