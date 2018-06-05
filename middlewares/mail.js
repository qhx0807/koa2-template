const nodemailer = require('nodemailer')
const mailConfig = require('../config/mail')

let transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secureConnection: true,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.authcode
  }
})

transporter.verify(function (error, success) {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is ready to take our messages')
  }
})

/**
 * 发送邮件
 *
 * @param {String} to
 * @param {String} subject
 * @param {String} content html string
 */
module.exports = async (to, subject, content) => {
  let message = {
    from: mailConfig.user,
    to: to || '820240134@qq.com',
    subject: subject,
    html: content
  }

  return await transporter.sendMail(message)
}
