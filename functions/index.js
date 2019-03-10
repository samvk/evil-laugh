const { dialogflow, SimpleResponse, Suggestions } = require('actions-on-google');
const functions = require('firebase-functions');
const { randomPop, randomNumberFromRange } = require('./util');
const { playAnotherPhrase, yesPhrase, noPhrase } = require('./translation');

const app = dialogflow({ debug: true });

/** **** DIALOGFLOW ***** */
app.intent(['laugh', 'Default Fallback Intent'], (conv) => {
    const region = conv.user.locale.split('-')[0];

    const randomIndex = randomNumberFromRange(1, 29);

    const laughText = randomPop([
        `HAAHAAHAAHAAHAA`,
        `HaaHaaHaaHaaHaa`,
        `HaHaHaHaHaHaHaHa`,
        `Hahahahahahahaha`,
        `HAAHAAHAAHAAhahahaha`,
        `HAHAHAHAHahahaha`,
        `Muahahahahahaa`,
        `MWAHAAHAAhahaha`,
    ]);

    const againText = playAnotherPhrase(region);

    conv.ask(new SimpleResponse({
        speech: `<speak><audio src='https://evil-laugh.firebaseapp.com/audio/laugh-${randomIndex}.mp3' /><break time="500ms"/></speak>`,
        text: laughText,
    }));
    conv.ask(againText);
    conv.ask(new Suggestions([yesPhrase(region), noPhrase(region)]));
});

app.intent(['no', 'actions_intent_CANCEL', 'actions_intent_NO_INPUT'], (conv) => {
    conv.close(new SimpleResponse({
        speech: `<speak><break time="1ms"/></speak>`, // HACK::there must be a way to have a silent conv.close()...
        text: `👋😈`,
    }));
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
