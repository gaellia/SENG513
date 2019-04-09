const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seng513shoebox@gmail.com',
        pass: 'seng513w19'
    }
})

let mailOptions = {
    from: 'seng513shoebox@gmail.com',
    to: 'rnarshmallow2017@hotmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
}

function sendEmail() {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

module.exports = {sendEmail}
