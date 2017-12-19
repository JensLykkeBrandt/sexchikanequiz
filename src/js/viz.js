

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
        this.answers = [];
        this.currentQuestion = 0;
        this.clicked = false;

        // For testing purposes
        window.test = this;

        // indsæt html
        this.topElem = window.document.getElementById("databaseRedInteractive");
        this.topElem.innerHTML = new mainTemplate().render(txt);

        // get elements once
        this.span = this.topElem.querySelector("span");
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

        // set width
        this.span.style.width = this.span.clientWidth + "px";

        // start
        this.showQuestion();
    }

    /**
     * Shows the current question
     */
    showQuestion() {
        // Move question into view
        this.span.classList.remove("outLeft");
        this.span.classList.add("inRight");
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
            this.answers.push(true);
        } else {
            this.answerFalse.style.display = "block";
            this.answers.push(false);
        }

        // fade out the wrong answer
        this.yesOption.style.opacity = this.spgs[this.currentQuestion] == 1 ? 1 : 0.1;
        this.noOption.style.opacity = this.spgs[this.currentQuestion] == 0 ? 1 : 0.1;

        // Show text and next button
        this.answerText.innerHTML = this.txt["a" + (this.currentQuestion+1)];
        this.answerText.style.display = "block";
        this.nextQuestion.style.display = "block";
    }

    moveToNextQuestion() {
        // move out
        this.span.classList.remove("inRight");
        this.span.classList.add("outLeft");

        // if it the last, then show "Resultat"
        if ((this.currentQuestion + 1) == this.spgs.length) {
            this.showScore();            
        } else {
            // wait for animation
            setTimeout(function(){
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
                this.yesOption.style.opacity = 1;
                this.noOption.style.opacity = 1;
                // if it the last, then show "Resultat"
                if ((this.currentQuestion + 1) == this.spgs.length) {
                    this.nextQuestion.textContent = "RESULTAT";
                }
                // showQuestion
                this.showQuestion();
            }.bind(this),500);
        }
    }

    showScore() {
        setTimeout(function() {
            let r = `<div class="yesOption" style="opacity: 1;float:none; text-align:center">RESULTAT</div><div style="text-align:center">`;
            for (let a = 0; a < this.answers.length; a++) { 
                if (a == 5) {
                    r += "<br />";
                }
                if (this.answers[a]) {
                    r += `<div class="answerRight" style="display: inline-block; text-align:center"></div>`;
                } else {
                    r += `<div class="answerFalse" style="display: inline-block; text-align:center"></div>`;
                }
            }
            r += "</div>";
            this.span.innerHTML = r;
            this.showQuestion();
        }.bind(this), 750);
    }
}