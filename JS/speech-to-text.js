export class SpeechToText {
    #micButtonElement;
    #outputElement;
    #clearButtonElement;
    #speechRecognition;

    _isListening;
    get isListening() {
        return this._isListening;
    }
    set isListening(value) {
        this._isListening = value;
        if (value) {
            this.#micButtonElement.classList.add('listening');
        } else {
            this.#micButtonElement.classList.remove('listening');
        }
    }

    #_activeText;
    get activeText() {
        return this.#_activeText;
    }
    set activeText(value) {
        this.#_activeText = value;
        this.#updateTextarea();
    }

    #_outputText = '';
    get outputText() {
        return this.#_outputText;
    }
    set outputText(value) {
        this.#_outputText = value;
        this.#updateTextarea();
    }

    constructor(options) {
        if (this.#optionsNullCheck(options)) {
            console.error('Closing app...');
            return;
        }

        const {
            micElementSelector,
            outputElementSelector,
            clearElementSelector,
        } = options;

        this.#micButtonElement = document.querySelector(micElementSelector);
        this.#outputElement = document.querySelector(outputElementSelector);
        this.#clearButtonElement = document.querySelector(clearElementSelector);

        this.isListening = false;
        this.#addEventListeners();
        this.#enableSpeechRecognition();
    }

    #extractTranscript(event) {
        return event.results[0][0].transcript;
    }

    #enableSpeechRecognition() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.#speechRecognition = new SpeechRecognition();
        this.#speechRecognition.interimResults = true;

        this.#speechRecognition.addEventListener('result', (event) => {
            const transcript = this.#extractTranscript(event);
            this.activeText = transcript;
        });

        this.#speechRecognition.addEventListener('end', this.#onRecognitionEnd.bind(this));
    }

    #onRecognitionEnd() {
        this.#updateOutputText();
        if (this.isListening) {
            this.startRecognition();
        }
    }

    #updateOutputText() {
        if (!this.activeText) return;
        this.outputText += this.activeText + ' ';
        this.activeText = '';
    }

    #updateTextarea() {
        this.#outputElement.value = `${this.outputText}${this.activeText}`;
    }

    #optionsNullCheck(options) {
        const nullSelectors = [
            'micElementSelector',
            'outputElementSelector',
            'clearElementSelector',
        ].filter(selector => !options[selector]);

        if (nullSelectors.length) {
            console.error(`Please provide the following selectors: ${nullSelectors.join(', ')}`);
            return true;
        }

        return false;
    }

    #addEventListeners() {
        this.#micButtonElement.addEventListener('click', this.toggleListen.bind(this));
        this.#clearButtonElement.addEventListener('click', this.#clearEverything.bind(this));
    }

    toggleListen() {
        if (this.isListening) {
            this.stopRecognition();
        } else {
            this.startRecognition();
        }
    }

    startRecognition() {
        this.isListening = true;
        this.#speechRecognition.start();
    }

    stopRecognition() {
        this.isListening = false;
        this.#speechRecognition.stop();
    }

    #clearEverything() {
        this.activeText = '';
        this.outputText = '';
    }
}
