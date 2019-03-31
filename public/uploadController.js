view.createShoebox()

var selectedFile;

$(document).on('click', '#uploadButton', e => {
    var filename = selectedFile.name;

    //var storageRef = firebase.storage().ref();
    var storageRef = firebase.storage().ref('/images/' + filename);

    var metadata = {
        contentType: 'image/jpeg'
    };

    var uploadTask = storageRef.child('/images/' + filename).put(selectedFile, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;
            }
        }, function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                //firebase.database().ref("shoebox/" + shoebox())
                console.log('File available at', downloadURL);


                $('#shoebox-image').attr("src", downloadURL)
                console.error(  $('#shoebox-image'))

            });
        });

})

$("#file").on("change", function(event) {
    console.error("WE HAVE CHANGED FILE ")
    selectedFile = event.target.files[0];
});