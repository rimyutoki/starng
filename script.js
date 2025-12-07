const MESSAGE_MAPPING = {
    "001": "あいうえお",
    "002": "こんばんは",
    "888": "Congratulations!",
    "999": "Error: Reboot",
    "123": "Test Message",
    "523": "左最速、右振り被り中",
    "205": "右最速、左突進中",
    "035": "右最速、左発射",
    "354": "右最速、左発射",
    "557": "左最速、右振り被り中",
    "541": "左最速、J02、右前ジャンプ",
    "471": "左最速、J2、右ジャンプ",
    "710": "J5、右最速、左後ろジャンプ",
    "112": "右最速、左後ろジャンプ",
    "105": "左最速、着地2、右（突進）",
    "027": "右最速、左（突進中）",
    "255": "J1、右突進前、左突進中",
    "574": "右最速、左突進中",
    "751": "左最速、右最速",
    "541": "左最速、着地02、右",
    "410": "右振り被り中、左ジャンプ",
    "112": "右最速、左突進",
    "105": "右最速、左前ジャンプ",
    "024": "右最速、左発射",
    "256": "J45、左最速、J7、右ジャンプ",
    "540": "J5、左最速、J7、右ジャンプ",
    "464": "左最速、J7、右ジャンプ"
};

class Calculator {
    constructor(historyElement, currentOperandElement) {
        this.historyElement = historyElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.isMessage = false;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand === '') return;
        // If current operand is a message (result), clear it on delete
        if (Object.values(MESSAGE_MAPPING).includes(this.currentOperand)) {
            this.clear();
            return;
        }

        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        // Prevent appending to a displayed message
        if (Object.values(MESSAGE_MAPPING).includes(this.currentOperand)) {
            this.currentOperand = number.toString();
            this.isMessage = false;
        } else {
            if (number === '.' && this.currentOperand.includes('.')) return;
            this.currentOperand = this.currentOperand.toString() + number.toString();
            this.isMessage = false;
        }
    }



    compute() {
        // Check if the current operand matches a code
        const message = MESSAGE_MAPPING[this.currentOperand];

        if (message) {
            this.currentOperand = message;
            this.isMessage = true;
        } else {
            this.currentOperand = "未対応";
            this.isMessage = true;
        }
    }



    getDisplayNumber(number) {
        return number.toString();
    }

    updateDisplay() {
        if (this.isMessage) {
            this.currentOperandElement.innerText = this.currentOperand.replace(/、/g, '、\n');
            this.currentOperandElement.classList.add('is-message');
        } else {
            this.currentOperandElement.innerText = this.currentOperand === '' ? '' : this.getDisplayNumber(this.currentOperand);
            this.currentOperandElement.classList.remove('is-message');
        }

        this.historyElement.innerText = ''; // Hide history/operations
    }
}

const historyElement = document.getElementById('history');
const currentOperandElement = document.getElementById('current-operand');
const calculator = new Calculator(historyElement, currentOperandElement);

document.querySelectorAll('[data-number]').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
    });
});



document.querySelector('[data-action="calculate"]').addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

document.querySelector('[data-action="clear"]').addEventListener('click', () => {
    calculator.clear();
});

document.querySelector('[data-action="delete"]').addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});


