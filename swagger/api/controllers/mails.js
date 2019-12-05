const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com", // hostname
    secureConnection: false,
    port: 587,
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
        user: 'correo@buenosaires.gob.ar',
        pass: 'contrasena'
    }
});
transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

async function enviarMail(req, res, next){
    var infoMail = req.swagger.params.body.value
    transporter.sendMail(infoMail,(err,info)=>{
        if(err){
            res.status(500).json(err)
        }
        else{
            res.status(200).json(info)
        }
    })
}

module.exports = {enviarMail} ;