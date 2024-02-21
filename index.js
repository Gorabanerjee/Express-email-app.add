const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//CREATE the middeleware for the pasrsing required 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//define to the server that the srtatic files are stored indide the public

app.use(express.static('public'));

//definge the route for home page
app.get('/',(req,res)=>
{
    res.sendFile(__dirname+'/public/send-email.html');
});

// config nodemailer

const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'banerjeeg2010@gmail.com',//yeour particular gmail
        pass:'ukke hppp svjt lzhb',

    }
});

//create the route  for 
app.post('/send-email',(req,res)=>{
    const {to,subject,text} =req.body;

    const mailOption = {
        to,
        subject,
        text
    };


transport.sendMail(mailOption,(error,infor)=>
{
if(error){
        console.error(error);
        res.status(500).send('error in sending mail');

} else{
        console.log('email sent:'+ infor.response);
        res.send('email sent succesfully');
}
});

});

app.listen (port,()=>
{
    console.log(`server in running on port ${port}`)
});

