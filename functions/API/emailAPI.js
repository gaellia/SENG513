const nodemailer = require('nodemailer')
const URL = `https://shoebox513.firebaseapp.com`
const LOGO = `https://firebasestorage.googleapis.com/v0/b/shoebox513.appspot.com/o/defaultfiles%2FIllustration.png?alt=media&token=ffd383f9-0d8d-43ad-8450-ac24439a8ce9`

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seng513shoebox@gmail.com',
        pass: 'seng513w19'
    }
})

function sendEmail(to, user, name, description, logoURL) {
    mailOptions = {
        to,
        from: ' "Team ShoeBox" <seng513shoebox@gmail.com>',
        subject: `${user.displayName} invited you to join ${name || 'a ShoeBox'}`,
        html: `
        <div style="position: absolute; width: 100vw; height: 180vh; background-color: rgb(234, 252, 252)">
            <div style="font-family: Helvetica; max-width: 75%; z-index: 1; background-color: white; margin: 2em auto; padding: 2em;">
                
                <div style="text-align: center">

                    <br><br>
                    <h4>${user.displayName} invited you to join a ShoeBox:</h4>
                    <img id="mainLogo" src="${logoURL.includes(`Illustration.png`)? URL: logoURL}" style="max-width: 100px">
                    <h3>${name}</h3>
                    <p>${description || ""}</p>

                    <br>
                    <h5> <a target="_blank" href="${URL}">Click here</a> to create or access your account!</h5>

                    <br><br>
                    <p style="font-size:10px">
                        ShoeBox is a social web-platform for desktop and mobile
                        that acts as an all-in-one space to reflect on events
                        and special moments with your closest friends and family.
                        <a target="_blank" href="${URL}">Click here</a> to learn more about ShoeBox.
                    </p>

                    <br>
                </div>

                <div style="text-align: right">
                    <p>Sincerely,</p>
                    <p><i> The ShoeBox Team</i></p>
                    <br><br>
                </div>

                <div style="text-align: center">
                    <img style="max-width: 75px" src="${LOGO}">
                </div>
        </div>
    </div>
        `
    }
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error)
        else console.log('Email sent: ' + info.response)
    })
}

module.exports = {sendEmail}
