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

// listens to the add button
$(document).on('click', '#addButton', e => {
    console.error("WE ARE IN HERE")
    if ($('#addNote').is(':visible')){
        console.error("WE IN HERE !")
        $('#addNote').hide()
    }
    else{
        console.error("WE IN HERE 2")

        $('#addNote').show()

    }
    if ($('#newFile').is(':visible')){
        $('#newFile').hide()
    }
    else{
        $('#newFile').show()

    }
})