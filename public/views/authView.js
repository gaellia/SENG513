const authView = ({MID}) => {
    MID.html(`
    <div style="text-align: center">
        <img style="width: 100px; display:block; margin-left: auto; margin-right: auto; margin-bottom: 2em" src="./img/Illustration.png" />
        <h1>ShoeBox</h1>
        <br>
        <p> The place to keep your memories.</p>
        <hr>
        <br>
        <div id="firebaseui-auth-container"></div>
        <br>
        <a data-toggle="collapse" href="#toCollapse" role="button" aria-expanded="false" aria-controls="toCollapse" id="home-learn-more">
            Learn more
        </a>
        <br>
        <br>
        <br>
        <div class="collapse" id="toCollapse" style="max-width: 480px; margin: auto;">
            <img class="card-img-top" src="./img/sample.PNG" alt="Card image cap" style="max-width: 240px;">

            <div class="card card-body" style="padding: 2em">
                <p>
                    Party organizers, event attendees, groups of friends, and others can often find it
                    difficult to compile all the memories, such as photos and quotes, from multiple
                    people who attended an event.
                </p>
                <p>
                    With ShoeBox, they can create and manage a shared
                    online space where they can invite all attendees of an event to upload and view
                    photos and text from specific events, while also using the built-in chat feature
                    to continually reflect on these moments.This platform can be used to store memories
                    from weddings, birthdays, travel, holidays, and much more. ShoeBox makes it easy to
                    upload photos and quotes by everyone who was at any social event and review it from
                    every perspective.
                </p>
                <p>
                    Not a moment will be forgotten or missed with ShoeBox!
                </p>
                <br> <br>
                <button
                    class="btn btn-primary"
                    id="to-top"
                    style="max-width: 240px; margin: auto"
                    type="button"
                    data-toggle="collapse"
                    data-target="#toCollapse"
                    aria-expanded="false"
                    aria-controls="toCollapse">
                    Create Account or Continue
                </button>

            </div><!-- card body -->
        </div><!-- collapsible -->
    </div><!-- main container: align center -->
    `)
}