const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seng513shoebox@gmail.com',
        pass: 'seng513w19'
    }
})

function sendEmail(recipient) {
    console.log('Recipient: ' + recipient)
    mailOptions = {
        from: 'seng513shoebox@gmail.com',
        to: recipient,
        subject: 'Sending Email using Node.js',
        text: 'You\'ve been invited to join a shoebox!\nhttp://localhost:63342/shoebox2/SENG513/public/index.html'
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

module.exports = {sendEmail}
