// this code is stolen. we'll use an npm package later
let GLOBAL_DOWNLOAD

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

$(document).on('click', '#uploadButton', e => {
    const selectedFile = GLOBAL_FILE

    const fileURL = `/images/${slugify(selectedFile.name)}`

    // back end call here

    const uploadTask = firebase.storage().ref(fileURL).child(fileURL).put(selectedFile, { contentType: 'image/jpeg' })

    const uploadCB = {
        inProgress(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
    
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused')
                    break
    
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running')
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

                console.log('File available at', downloadURL)
    
                $('#shoebox-image').attr("src", downloadURL)
    
            })
        }
    }

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        uploadCB.inProgress,
        uploadCB.fail,
        uploadCB.success)

})