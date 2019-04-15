const viewShoeBoxView = ({LEFT, RIGHT, MID}, box, boxRepeat, loadCards) => {
    const user = model.local('user')
    const boxes = model.local('boxes')
    const boxList = boxRepeat(boxes)

    $("#banner").css({'visibility': 'visible'})
    $('#box-pic').hide('fast').attr('src', box.logoURL).show('fast')

    LEFT.html(`
    <div class="drawer" style="text-align: center; padding-top: 20px">
        <button class="btn btn-light" id="profile-btn" data-toggle="modal" data-target="#modal-container" style="min-width: 90%">
            <div class="d-flex justify-content-between">
                <div class="p-2">
                    <h5><i class="far fa-user-circle"></i><span id="profileName"> ${user.displayName}</span></h5>
                </div>
                <div class="p-2">
                    <i class="fas fa-ellipsis-v"></i>
                </div>
            </div><!-- flex box --> 
        </button>
        <br>
        <br>
    </div>

    <div class="main-wrapper">
        <div class="drawer">
            <div class="card" style="text-align: left">
                <ul class="list-group list-group-flush">
                    ${boxList}
                    <li class="list-group-item">
                        <button class="btn maxw box-new" data-toggle="modal" data-target="#modal-container">
                            <span class="box-new">
                                <i class="fas fa-plus-circle"></i>
                                Create new...
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>`)

    MID.html(`
        <div style="text-align: center;">
            <h2>${box.name}</h2>
        </div>
        <div class="loader"></div>

    `)

    
    // Asynchronously access the cards from the shoebox
    model.getByBoxID(box.boxID, "cards").then(res => {
        res.get().then(cards => {

            let columnHTML = loadCards(cards)

            MID.html(`
            <div class="row d-flex justify-content-between">
                <div class="p-2" style="text-align: center;">
                        <h2>${box.name}</h2>
                    </div>
                    <div class="p-2" style="text-align: left; padding-bottom: 20px;">
                        <button style="padding: 0.5rem 1.25rem" class="btn btn-light btn-lg" id="setting-btn" data-toggle="modal" data-target="#modal-container">
                        <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </div>
                <hr>
                <div class="middle-cards">
                    <div class="row d-flex justify-content-center">
                        <div class="col">
                            ${columnHTML[0]}
                        </div>
                        <div class="col">
                            ${columnHTML[1]}
                        </div>
                        <div class="col">
                            ${columnHTML[2]}
                        </div>
                    </div>
                </div>
            `)

            RIGHT.html(`
            <div id='chat-container'>
                <ul id='chat'>
                </ul>

                <!-- Message input -->
                <div class="send">
                    <form id="msg-form" actions="">
                        <textarea rows="3" id="m" autocomplete="off" /><button><i class="far fa-paper-plane"></i></button>
                    </form>
                </div>

            </div>`)

            // loads the chat history for this box
            chatGlobal.msgREF().orderBy('timestamp').get().then(snapshot => {
                snapshot.forEach(doc => chatGlobal.display(doc.data()))
                chatGlobal.toBottom()
            })

        })
    })
    
}