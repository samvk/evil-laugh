const { dialogflow, SimpleResponse } = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({ debug: true });

/** **** UTILS ***** */
const randomNumberFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/** **** DIALOGFLOW ***** */
app.intent('Default Welcome Intent', (conv) => {
    conv.ask(`Welcome to your live studio audience! Ready?`);
});

app.intent('Default Fallback Intent', (conv) => {
    const randomIndex = randomNumberFromRange(1, 10);

    conv.ask(new SimpleResponse({
        speech: `<speak><audio src='https://evil-laugh.firebaseapp.com/audio/laugh-${randomIndex}' /></speak>`,
        text: `HAAHAAHAAHAAHAA`,
    }));
});

// app.intent(['actions_intent_CANCEL', 'actions_intent_NO_INPUT'], (conv) => {
//     conv.close(`Come back soon.`);
// });

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
