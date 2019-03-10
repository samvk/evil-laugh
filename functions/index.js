const { dialogflow, SimpleResponse, Suggestions } = require('actions-on-google');
const functions = require('firebase-functions');
const { randomPop, randomNumberFromRange } = require('./util');
const { playAnotherPhrase, yesPhrase, noPhrase } = require('./translation');

const LAUGH_TOTAL_COUNT = 25;

const app = dialogflow({ debug: true });

/** **** DIALOGFLOW ***** */
const nextLaughFilePath = (count) => {
    if (count === 0) {
        // todo - need to also randomize the order they're played in
    }
    const index = (count % LAUGH_TOTAL_COUNT);
    return `https://evil-laugh.firebaseapp.com/audio/laugh-${index}.mp3`;
};

app.intent(['laugh', 'Default Fallback Intent'], (conv) => {
    conv.data.count = conv.data.count ? conv.data.count + 1 : 0;

    const region = conv.user.locale.split('-')[0];

    const randomIndex = randomNumberFromRange(1, 25);

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

    conv.ask(new SimpleResponse({
        speech: `<speak><audio src='${nextLaughFilePath(conv.data.count)}' /><break time="500ms"/></speak>`,
        text: laughText,
    }));
    conv.ask(playAnotherPhrase(region));
    conv.ask(new Suggestions([yesPhrase(region), noPhrase(region)]));
});

app.intent(['no', 'actions_intent_CANCEL', 'actions_intent_NO_INPUT'], (conv) => {
    conv.close(new SimpleResponse({
        speech: `<speak><break time="1ms"/></speak>`, // HACK::there must be a way to have a silent conv.close()...
        text: `👋😈`,
    }));
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
