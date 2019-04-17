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
    e.preventDefault()
    const selectedFile = GLOBAL_FILE

    let fileURL

    if ($('#modal-title').text() === 'New Shoebox') {
        // this is a cover photo
        fileURL = 'cover_photos'
    } else {
        // this is a card
        fileURL = `images/${model.local('currentBox').boxID}`
    }

    //hacky way to ensure uniqueness
    let time = firebase.firestore.Timestamp.now().seconds

    // back end call here

    const uploadTask = firebase.storage().ref(fileURL).child(time + selectedFile.name).put(selectedFile, { contentType: 'image/jpeg' })

    const uploadCB = {
        inProgress(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    break
    
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    $('#shoebox-image').hide('fast')
                    $('#card-image').hide('fast')
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

                $('#card-image').attr("src", downloadURL).delay(500).show('fast')
                $('#card-image').show('fast')
    
            })
        }
    }

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        uploadCB.inProgress,
        uploadCB.fail,
        uploadCB.success)

})