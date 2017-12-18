

// Load html-template
import mainTemplate from "./../templates/mainTemplate";

/**
 * class containing all the databaseredaktion-fun
 */
export default class viz {
    /**
     * Initialize the viz-component.
     */
    constructor(txt) {
        this.txt = txt;
        this.spgs = [1,1,1,0,0,1,0,0,0,0];
        this.currentQuestion = 0;
        this.clicked = false;

        // For testing purposes
        window.test = this;

        // indsæt html
        this.topElem = window.document.getElementById("databaseRedInteractive");
        this.topElem.innerHTML = new mainTemplate().render(txt);

        // get elements once
        this.questionText = this.topElem.querySelector(".questionText");
        this.answerRight = this.topElem.querySelector(".answerRight");
        this.answerFalse = this.topElem.querySelector(".answerFalse");
        this.answerText = this.topElem.querySelector(".answerText");
        this.yesOption = this.topElem.querySelector(".yesOption");
        this.noOption = this.topElem.querySelector(".noOption");
        this.nextQuestion = this.topElem.querySelector(".nextQuestion");

        // Add events: yes, no, next
        this.yesOption.addEventListener("click", this.yesClicked.bind(this));
        this.noOption.addEventListener("click", this.noClicked.bind(this));
        this.nextQuestion.addEventListener("click", this.moveToNextQuestion.bind(this));
    }

    /**
     * Shows the current question
     */
    showQuestion() {
        // Move question into view
    }

    noClicked() {
        if (!this.clicked) {
            this.handleClick(false);
        }
    }
    yesClicked() {
        if (!this.clicked) {
            this.handleClick(true);
        }
    }
    handleClick(answer) {
        // Disable clicks
        this.clicked = true;

        // Is it right? Show indicator
        if (this.spgs[this.currentQuestion] == 1 == answer) {
            this.answerRight.style.display = "block";
        } else {
            this.answerFalse.style.display = "block";
        }

        // Show text and next button
        this.answerText.innerHTML = this.txt["a" + (this.currentQuestion+1)];
        this.answerText.style.display = "block";
        this.nextQuestion.style.display = "block";
    }

    moveToNextQuestion() {
        // increment question-number
        this.currentQuestion++;
        // Move old out
        // Make buttons work again
        this.clicked = false;
        // insert text and reset view
        this.questionText.innerHTML = this.txt["s" + (this.currentQuestion+1)];
        this.answerText.style.display = "none";
        this.answerRight.style.display = "none";
        this.answerFalse.style.display = "none";
        this.nextQuestion.style.display = "none";
        // showQuestion
        this.showQuestion();
    }

}