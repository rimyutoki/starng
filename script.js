document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('current-operand');
    const historyDisplay = document.getElementById('history');
    const buttons = document.querySelectorAll('.btn');

    // ... (existing logic) ...

    let currentInput = '';
    let history = '';

    // Message mapping
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

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const number = button.dataset.number;

            if (number !== undefined) {
                handleNumber(number);
            } else if (action === 'clear') {
                clear();
            } else if (action === 'delete') {
                deleteLast();
            } else if (action === 'calculate') {
                calculate();
            }
        });

        // Prevent double-tap zoom on iOS
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            // Trigger click manually since preventDefault stops it
            button.click();
        });
    });

    function handleNumber(num) {
        if (currentInput.length >= 10) return; // Limit input length
        currentInput += num;
        updateDisplay();
    }

    function clear() {
        currentInput = '';
        history = '';
        updateDisplay();
        display.classList.remove('is-message'); // Reset message style
    }

    function deleteLast() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    function calculate() {
        if (MESSAGE_MAPPING[currentInput]) {
            history = currentInput; // Show the code in history
            // Replace '、' with '、\n' for line breaks
            currentInput = MESSAGE_MAPPING[currentInput].replace(/、/g, '、\n');
            display.classList.add('is-message'); // Add class for styling

            updateDisplay();
            // Reset for next input after showing message? 
            // Or keep it until next keypress? 
            // Let's reset input on next number press if message is shown (logic needed in handleNumber)
            // For now simple replacement
        } else {
            // Default behavior if no mapping found
            history = currentInput;
            currentInput = "Unknown Code";
            updateDisplay();
        }
        // Reset state to allow new input to overwrite result if needed
        // (Not implemented for simplicity, user just wanted string output)
    }

    function updateDisplay() {
        display.textContent = currentInput || '0';
        historyDisplay.textContent = history;
    }
});
