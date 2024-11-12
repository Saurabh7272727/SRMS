import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';



const emailSender = async (email, messages, OTP, person) => {
    // node mail gen with node mail;
    let mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: 'SRMS-Sender',
            link: 'https://mailgen.js/',
            // Optional product logo
            logo: 'https://th.bing.com/th/id/OIP.z4Y6UwyXNj6eqviWv70RPgHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7'
        }
    });

    let Info = {
        body: {
            name: email,
            intro: `Welcome ${person}`,
            action: {
                instructions: 'Student Result Mangement System - saurabh sharma(Team Leader)',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: `${OTP}`,
                    link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                }
            },
            outro: `${messages}`
        }
    };

    let emailBody = mailGenerator.generate(Info);
    const config = {
        service: 'gmail',
        port: 465,
        secure: true,
        logger: true,
        debug: true,
        secureConnection: true,
        auth: {
            user: process.env.NAME,
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: true
        }
    }

    const transport = new nodemailer.createTransport(config);
    const message = {
        from: process.env.NAME,
        to: email,
        subject: "Email verfication center",
        html: emailBody,
    }

    await transport.sendMail(message);

    return { person };
}


export default emailSender;