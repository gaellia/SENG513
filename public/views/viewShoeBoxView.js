const viewShoeBoxView = ({LEFT, RIGHT, MID}, box, viewBoxRepeat, loadCards) => {
    const user = model.local('user')
    const boxes = model.local('boxes')
    const boxList = viewBoxRepeat(boxes)

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
                <div class="row middle-cards d-flex justify-content-center">
                    <div class="col-auto">
                        ${columnHTML[0]}
                        
                        
<div class="card" id="mydiv">
  <div id="mydivheader">
  <button id="cardButton" class="btn" data-toggle="modal" data-target="#modal-container" value="undefined"> Edit<button>
  
  
</div>
  <img class="card-img-top" src="https://firebasestorage.googleapis.com/v0/b/shoebox513.appspot.com/o/images%2F3572jpg%2Fimages%2F3572jpg?alt=media&amp;token=12f32c91-745e-4190-ac63-61daa2f872fd">
  <div class="card-body"><h5 class="card-title">THINGY</h5>
                      <p class="card-text">thinghhhhhy</p></div>

</div>
                        
    
                      
                      
                        
                    </div>
                    <div class="col-auto">
                        ${columnHTML[1]}
                    </div>
                    <div class="col-auto">
                        ${columnHTML[2]}
                    </div>
                </div>
            `)

            $("#mydiv").each(function( index ) {
                $( this ).css("width", "18rem");

            });

            document.getElementById("mydiv").style.width = 18 +"rem";

            dragElement(document.getElementById("mydiv"));


            function dragElement(elmnt) {
                var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                if (document.getElementById(elmnt.id + "header")) {
                    /* if present, the header is where you move the DIV from:*/
                    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
                } else {
                    /* otherwise, move the DIV from anywhere inside the DIV:*/
                    elmnt.onmousedown = dragMouseDown;
                }

                function dragMouseDown(e) {
                    e = e || window.event;
                    e.preventDefault();
                    // get the mouse cursor position at startup:
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    document.onmouseup = closeDragElement;
                    // call a function whenever the cursor moves:
                    document.onmousemove = elementDrag;
                }

                function elementDrag(e) {
                    e = e || window.event;
                    e.preventDefault();
                    // calculate the new cursor position:
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;
                    // set the element's new position:
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                    elmnt.style.width = 18 +"rem";
                }

                function closeDragElement() {
                    /* stop moving when mouse button is released:*/
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
            }

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