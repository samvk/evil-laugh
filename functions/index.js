const { dialogflow, SimpleResponse } = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({ debug: true });

/** **** UTILS ***** */
const randomPop = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomNumberFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/** **** DIALOGFLOW ***** */
// app.intent('Default Welcome Intent', (conv) => {
//     conv.ask(`Welcome to your live studio audience! Ready?`);
// });

app.intent(['Default Welcome Intent', 'laugh'], (conv) => {
    const randomIndex = randomNumberFromRange(1, 17);

    const laughText = randomPop([
        `HAAHAAHAAHAAHAA`,
        `HaaHaaHaaHaaHaa`,
        `HaHaHaHaHaHaHaHa`,
        `Hahahahahahahaha`,
        `HAAHAAHAAHAAhahahaha`,
        `HAHAHAHAHahahaha`,
    ]);

    conv.ask(new SimpleResponse({
        speech: '<speak></speak>',
        text: 'Ready?',
    }));
    conv.ask(new SimpleResponse({
        speech: `<speak><audio src='https://evil-laugh.firebaseapp.com/audio/laugh-${randomIndex}.mp3' /></speak>`,
        text: laughText,
    }));
});

// app.intent(['actions_intent_CANCEL', 'actions_intent_NO_INPUT'], (conv) => {
//     conv.close(`Come back soon.`);
// });

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
