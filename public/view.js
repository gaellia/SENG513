// all code view related go here
const MID = $('#middle-container')
const LEFT = $('#left-container')
const RIGHT = $('#right-container')

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

        const boxList = ``
        if(boxes.length!==0) {
            boxes.forEach(box => {
                boxList = `${boxList}
                <li class="list-group-item box-btn" id="box-${box.id}">
                    <i class="fas fa-shapes"></i>
                    ${box.name}
                </li>`
            });
        }

        MID.html(`
            <div style="text-align: center">
                <br>
                <h1>Welcome, ${user.displayName}</h1>
                <br>
                ${(() => boxes.length===0? `<p>Create a new shoebox to get started.</p><br>` : '')()}
                <div class="card" style="width: 18rem; text-align: left">
                    <ul class="list-group list-group-flush">
                        ${boxList}
                        <li class="list-group-item box-btn" id="box-new">
                            <a>
                                <i class="fas fa-plus-circle"></i>
                                Create new...
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- card -->
            </div>
        `)
    },

    createShoebox: () => {
        MID.html(`
            <div style="text-align: center">
                <br>
                <h1>New Shoebox</h1>
                <br>
                <div>
                    <form id="create-shoebox-form">
                        <div class="form-group">
                            <label for="shoebox-name">Shoebox Name</label>
                            <input type="text" class="form-control" id="shoebox-name">
                            <label for="shoebox-description">Description</label>
                            <input type="text" class="form-control" id="shoebox-description">
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

    inviteMember: () => {
        $('#invite-new').prepend(`
            <li class="box-btn" style="list-style-type: none;">
                <input type="text" class="form-control" placeholder="Email">
            </li>
        `)
    }
})

const view = v()