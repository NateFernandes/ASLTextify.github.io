import { SpeechToText } from "./speech-to-text.js";

const speechToText = new SpeechToText({
    micElementSelector: '.mic-btn',
    outputElementSelector: '#input-text',
    clearElementSelector: '.clear-everything',
});
