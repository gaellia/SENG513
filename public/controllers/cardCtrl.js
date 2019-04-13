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
    view.createCard()

    $(".file").on("change", function(event) {
        GLOBAL_FILE = event.target.files[0]
    })
    
    $('#card-image').hide()
})


// create new shoebox form submit
$(document).on('click', '#create-card-submit', e => {
    e.preventDefault() // access form elements here

    model.shoebox().add({}).then(({id}) => {
        // In the case that a logo image failed to upload, grab random default
        if (!DOWNLOAD_URL)
            DOWNLOAD_URL = DEFAULT_LOGOS[Math.floor(Math.random()*DEFAULT_LOGOS.length)]

        const boxObject = {
            name: $('#shoebox-name').val(),
            description: $('#shoebox-description').val(),
            boxID: id,
            memberEmails: members.map(({email}) => email),
            logoURL: $('#shoebox-image').attr('src')
        }

        // send invite emails
        requestService(`/sendInvites`, "POST", {
            boxObject,
            members,
            user: model.local('user')
            })

        model.shoebox(id).set(boxObject).then(() => {  

            for(let member of members) {
                model.shoebox(id).collection('members').add(member)
            }       
            
            // update local
            model.local('currentBox', boxObject)
            let tempBoxes = model.local('boxes')
            tempBoxes.push(boxObject)
            model.local('boxes', tempBoxes)
            // change view to the newly created box
            view.viewShoeBox(boxObject)
        })

    }).catch(err => {
        console.log('err', err)
    })
})