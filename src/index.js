const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const { sendBasicEmail } = require('./services/email-service')
// const {sendBasicEmail}=require('./services/email-service')

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.listen(PORT, () => {
        console.log(`server started on port : ${PORT}`);
        // sendBasicEmail(
        //     'support@admin.com',
        //     'cs191297@gmail.com',
        //     'this is a testing email',
        //     'Hey, how are you, I hope you like the support'
        // )

        cron.schedule('*/2 * * * *', () => {
            console.log('running a task every two minutes');
        });
    });
}
setupAndStartServer();