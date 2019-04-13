// Creates a new card from the given parametres
createNewCard: (type, title, text, resourceURL, authorEmail) => {
    switch (type) {
        case 'text':
            return {
                "mediaType": type,
                "title": title,
                "text": text,
                "author": authorEmail
            }
            break
        default:
            return {
                "mediaType": type,
                "title": title,
                "text": text,
                "resourceURL": resourceURL,
                "author": authorEmail
            }
            break
    }
}

// Closure for uploaded file flag
const setFileUpdateFlag = () => {
    let uploadedFile = false
    
    return { setTrue: () => {
        uploadedFile = true},
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
    
    let newCard = {
        title: $('#card-name').val(),
        text: $('#card-text').val(),
        author: model.local("user").email,
    }
    
    if (fileChanged) {
        // TODO add video recgonition to differentiate
        newCard.mediaType = "picture"
        newCard.resourceURL = $('#shoebox-image').attr('src')
    } else newCard.mediaType = "text"

    model.getByBoxID(model.local('currentBox').boxID, "cards").then(res => {
        res.get().then(cards => {
            console.log(cards.docs.data)
            cards.push(newCard)

            model.getByBoxID(model.local('currentBox').boxID, "cards").then(res => {
                res.set(cards)})


            // TODO is this correct and how to push update to other viewers
        })
    }).catch(err => {
        console.log('err', err)
    })
})