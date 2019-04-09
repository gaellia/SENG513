const selectShoeBoxView = ({MID}, boxRepeat) => {
    const user = model.local('user')
    const boxes = model.local('boxes')
    let boxList = boxRepeat(boxes)

    MID.html(`
        <div style="text-align: center">
            <h1>Welcome, ${user.displayName}</h1>
            <br>
            ${(() => boxes.length===0? `<p>Create a new shoebox to get started.</p><br>` : 'Select a shoebox to continue.')()}
            <br><br>

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
                    <li class="list-group-item">
                        <button class="btn maxw logout">
                            <span>
                                <i class="fas fa-sign-out-alt"></i>
                                Logout
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
            <!-- card -->
        </div>
    `)
}