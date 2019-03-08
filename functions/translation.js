const { randomPop } = require('./util');

module.exports.playAnotherPhrase = (region) => randomPop({
    en: [
        'Want another one?',
        'Want another?',
        'Hear another?',
        'Play another?',
        'Go again?',
    ],
    es: [
        '¿Quieres otro?',
        'Escuchar otro?',
        'Jugar otro?',
        '¿Ve otra vez?',
    ],
    fr: [
        'Vous en voulez un autre?',
        'Veulent une autre?',
        'Entendre un autre?',
        'Jouer un autre?',
        'Vas y encore?',
    ],
    de: [
        'Willst du noch einen?',
        'Will ein anderes?',
        'Höre noch einen?',
        'Ein anderes spielen?',
        'Wieder gehen?',
    ],
    it: [
        'Ne vuoi un altro?',
        'Vuoi un altro?',
        'Ascoltare un altro?',
        'Gioca un altro?',
        'Vai ancora?',
    ],
    pt: [
        'Quer outro?',
        'Quero outro?',
        'Ouça outro?',
        'Jogar outro?',
        'Vá novamente?',
    ],
}[region]) || '🔁?';

module.exports.yesPhrase = (region) => ({
    en: 'Yes',
    es: 'Sì',
    fr: 'Oui',
    de: 'Ja',
    it: 'Sì',
    pt: 'Sim',
}[region]) || '👍';

module.exports.noPhrase = (region) => ({
    en: 'No',
    es: 'No',
    fr: 'Non',
    de: 'Nein',
    it: 'No',
    pt: 'Não',
}[region]) || '👎';
