const cron = require('node-cron');
const sender = require('./config/emailConfig');
/**
 * 10:00 am
 * Every 5 minutes we will check if there are any pending emails which was expected to be
 * sent by now and is pending
 */

const setupJobs = () => {
    cron.schedule('*/5 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {
            // emailService.sendBasicEmail(   // here we didnt write await because email creation takes time and we dont want user2 to wait till the creation of email of user1
            //     "RemainderService@airline.com",
            //     email.recepientEmail,
            //     email.subject,
            //     email.content
            // );
            sender.sendMail({
                to: email.recepientEmail,
                subject: email.subject,
                text: email.content
            }, async(err, data) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                    await emailService.updateTicket(email.id, {status: "SUCCESS"});
                }
            });
        });
        console.log(response);
    });
}

module.exports = setupJobs;