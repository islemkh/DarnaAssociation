import nodemailer from 'nodemailer';

    
  
export const Contact = (req, res) => {
    // Validate request


    let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'associationtndarna@gmail.com', // generated ethereal user
      pass:'darna123**' , // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
  }
  });
  const mailOptions = {  
    from: `ilhemmaalaouii@gmail.com`,              // sender
    to: `associationtndarna@gmail.com`,              // sender
    cc:  ` ${req.body.Email}`,
           // list of receivers
    subject: 'contacter association Darna',            // Mail subject
    html: `<h1> je suis  ${req.body.NomPrenom}</h1> <br>
    <p> ${req.body.Message} </p>`
  };
    
  /* if(!req.body.content) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }
    else { */
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        message: 'successfuly sent!'
      })
    }
  }); 

       

  }
  