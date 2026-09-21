const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const { subscribeMessage, createChannel } = require('./utils/messageQueues');
const { REMAINDER_BINDING_KEY } = require('./config/serverConfig');
const EmailService = require('./services/email-service');

// const { sendBasicEmail } = require('./services/email-service');

const jobs = require('./utils/job');

const TicketController = require('./controllers/ticket-controller');

const setUpAndStartServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const channel = await createChannel();
  subscribeMessage(channel, EmailService.subscribeEvents, REMAINDER_BINDING_KEY);

  app.post('/api/v1/tickets', TicketController.create);

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
    jobs();

    // sendBasicEmail(
    //     'support@admin.com',
    //     'cs191297@gmail.com',
    //     'this is a testing email',
    //     'Hey, how are you, I hope you like the support'
    // );
  });
}

setUpAndStartServer();