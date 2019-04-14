// Closure for uploaded file flag
const setFileUpdateFlag = () => {
    let uploadedFile = false
    
    return {
        setTrue: () => {uploadedFile = true},
        value: () => {return uploadedFile}
    }
}

let fileChanged = setFileUpdateFlag()

// listens to the add button
$(document).on('click', '#addButton', e => {
    view.createCard()

    $(".file").on("change", function(event) {
        GLOBAL_FILE = event.target.files[0]
        fileChanged.setTrue()
    })
    
    $('#card-image').hide()
})


// create new card form submit
$(document).on('click', '#create-card-submit', e => {
    e.preventDefault() // access form elements here

    let currentBox = model.local('currentBox').boxID
    
    let newCard = {
        title: $('#card-name').val(),
        text: $('#card-text').val(),
        author: model.local("user").email,
    }

    if (fileChanged.value()) {
        // TODO add video recgonition to differentiate
        newCard.mediaType = "picture"
        newCard.resourceURL = $('#card-image').attr('src')
    }
    else {newCard.mediaType = "text"}

    console.log(currentBox)
    model.getByBoxID(currentBox, "cards").then(res => {
        res.add(newCard).then(() => {
            console.log(currentBox)
            view.viewShoeBox(currentBox)
        })
    }).catch(err => {
        console.log('err', err)
    })
})

// listens to the edit button
$(document).on('click', '#cardButton', e => {
    view.editCard()

    $(".file").on("change", function(event) {
        GLOBAL_FILE = event.target.files[0]
        fileChanged.setTrue()
    })
    
})