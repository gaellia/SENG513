const authView = ({MID}) => {
    MID.html(`
    <div style="text-align: center">
        <img style="width: 150px; display:block; margin-left: auto; margin-right: auto; margin-bottom: 2em" src="./Shoebox_Logo.png" />
        <h1>Shoebox</h1>
        <br>
        <p> One place for all your memories </p>
        <hr>
        <br>
        <div id="firebaseui-auth-container"></div>
    </div>
    `)
}