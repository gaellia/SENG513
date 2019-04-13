// this code is stolen. we'll use an npm package later
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

$(document).on('click', '#uploadButton', e => {
    console.error("INSIDE OF UPLOAD BUTTON")
    e.preventDefault()
    const selectedFile = GLOBAL_FILE

    const fileURL = `/images/${slugify(selectedFile.name)}`

    // back end call here

    const uploadTask = firebase.storage().ref(fileURL).child(fileURL).put(selectedFile, { contentType: 'image/jpeg' })

    const uploadCB = {
        inProgress(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    break
    
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    $('#shoebox-image').hide('fast')
                    $('#loader-container').show()
                    $('#up-loader').show()
                    // do stuff
                    break
            }
        },

        fail({code}) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break
    
                case 'storage/canceled':
                    // User canceled the upload
                    break
            }
        },

        success() {



            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                
                GLOBAL_DOWNLOAD = downloadURL

                $('#up-loader').hide()
                $('#loader-container').hide('slow')




                $('#shoebox-image').attr("src", downloadURL).delay(500).show('fast')
                console.error("WE IN HERE IT A SUCESS")

                if($(e.target).attr('class') === "addCard"){


                    $('#middle-container').append('<div class="card" style="width: 18rem;"><div class="card-header">\n' +
                        '            <div class="delete-card-icon">\n' +
                        '                <i class="fas fa-trash"></i>\n' +
                        '            </div></div><img class="card-img-top" src="'+downloadURL+'"><div class="card-body"><h5 class="card-title">Whiplash</h5><p class="card-text">Not quite my tempo.</p></div></div>')






                }
    
            })
        }
    }

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        uploadCB.inProgress,
        uploadCB.fail,
        uploadCB.success)

})