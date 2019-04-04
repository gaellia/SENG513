// all code view related go here
const MID = $('#middle-container')
const LEFT = $('#left-container')
const RIGHT = $('#right-container')

// For parsing cards (TODO get it out of here)
   
// Returns HTML for a given card
function getHTMLFor(card) {
    let cardBody = `<div style="text-align: center"><div class="card" style="width: 18rem;"><div class="card-header">
    <div class="delete-card-icon">
        <i class="fas fa-trash"></i>
    </div></div>`
    if (card.mediaType !== "text"){
        cardBody += `<img class="card-img-top" src="${card.resourceURL}">`
    }
    cardBody += `<div class="card-body"><h5 class="card-title">${card.title}</h5><p class="card-text">${card.text}</p></div></div></div>`

    return cardBody;
}

// Returns an array containing the HTML of each column in the main view as a string
function loadCards(cards){
    let cols = ["", "", ""]

    let index = 0

    cards.forEach(card => {
        cols[index%cols.length] += getHTMLFor(card)
        index++
    });

    return cols
}

const v = () => ({
    auth: () => {
        MID.html(`
        <div style="text-align: center">
            <img style="width: 150px; display:block; margin-left: auto; margin-right: auto; margin-top: 2em; margin-bottom: 2em" src="./Illustration.png" />
            <h1>Shoebox</h1>
            <br>
            <p> One place for all your memories </p>
            <hr>
            <br>
            <div id="firebaseui-auth-container"></div>
        </div>
        `)
    },

    selectShoeBox: () => {
        const user = model.local('user')
        const boxes = model.local('boxes')

        let boxList = ``
        if(boxes.length!==0) {
            boxes.forEach(box => {
                boxList = `${boxList}
                <li class="list-group-item box-btn view-box-btn" id="${box.boxID}">
                    <image src="${box.logoURL}" style="width: 64px; height: 64px"></image>
                    ${box.name}
                </li>`
            });
        }
        
        MID.html(`
            <i class="fas fa-bars" id="bar-menu"></i>
            <div style="text-align: center">
                <br>
                <h1>Welcome, ${user.displayName}</h1>
                <br>
                ${(() => boxes.length===0? `<p>Create a new shoebox to get started.</p><br>` : '')()}
                <div class="card" style="text-align: left">
                    <ul class="list-group list-group-flush">
                        ${boxList}
                        <li class="list-group-item box-btn" id="box-new">
                            <i class="fas fa-plus-circle"></i>
                            Create new...
                        </li>
                    </ul>
                </div>
                <!-- card -->
            </div>
        `)
    },

    createShoebox: () => {
        MID.html(`
            <img style="text-align: center">
                <br>
                <h1>New Shoebox</h1>
                <img style="height: 80px; width: 80px; text-align: center" id="shoebox-image" src="Illustration.png" </img>
                <br>
                <div>
                    <form id="create-shoebox-form">
                        <div class="form-group">
                            <label for="shoebox-name">Shoebox Name</label>
                            <input type="text" class="form-control" id="shoebox-name">
                            <label for="shoebox-description">Description</label>
                            <input type="text" class="form-control" id="shoebox-description">
                            <br>

                            <div class="fas fa-camera"> 
                        <input type="file" id="file">
                    <button type="button"  id="uploadButton">Submit</button>
                    </div>
                            <br>
                            <label for="invite-list">Invite Members</label>
                            <ul class="list-group list-group-flush" id="invite-list">
                                <li class="list-group-item box-btn" id="invite-new">
                                    <i class="fas fa-plus-circle"></i>
                                    Invite by email
                                </li>
                            </ul>
                        </div>
                        <button id="create-shoebox-submit" class="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        `)
    },

    viewShoebox: box => {
        
        const boxes = model.local('boxes')


        let boxList = ``
        if(boxes.length!==0) {
            boxes.forEach(box => {
                boxList = `${boxList}
                <li class="list-group-item box-btn view-box-btn" id="${box.boxID}">
                    <image src="${box.logoURL}" style="width: 64px; height: 64px""></image>
                    ${box.name}
                </li>`
            });
        }
        LEFT.html(`
        <div class="main-wrapper">      
     
        <div class="drawer">
           <div class="card" style="text-align: left">
                    <ul class="list-group list-group-flush">
                        ${boxList}
                       
                    </ul>
                </div>
            
    </div>
  
</div>`)

        MID.html(`

            <div style="text-align: center;">
                <h1>${box.name}</h1>
            </div>
            <h1>Loading cards...</h1>

        `)

        
        // Asynchronously access the cards from the shoebox
        model.getByBoxID(box.boxID, "cards").then(res => {
            res.get().then(cards => {
            cards.docs.map(doc => doc.data());
            
            let columnHTML = loadCards(cards)

        MID.html(`

            <div style="text-align: center;">
                <h1>${box.name}</h1>
            </div>
            <div class="col-sm">
                ${columnHTML[0]}
            </div>
            <div class="col-sm">
                ${columnHTML[1]}
            </div>
            <div class="col-sm">
                ${columnHTML[2]}
            </div>

            <button class="fas fa-plus"></button>

        `)

        })})

        //TEMP TEST
        
    },

    inviteMember: () => {
        $('#invite-new').prepend(`
            <li class="box-btn" style="list-style-type: none;">
                <input type="text" class="form-control" placeholder="Email">
            </li>
        `)
    },

    chatButton: () => {
        RIGHT.html(`
            <div style='align: center'>
                <button class="btn btn-primary" id="load-chatbox">
                    <a>
                    load chat
                    </a>
                </button>
            </div>
        `)
    }
})

const view = v()