/**
 * Hold the main template: the basis for all other stuff
 */
export default class mainTemplate{

    render(texts) {

return `
<span>
    <div class="questionText" ds="s1">${texts.s1}</div>
    <div class="yesOption" ds="yes">${texts.yes}</div>
    <div class="noOption" ds="no">${texts.no}</div>
    <div class="answerRight"></div>
    <div class="answerFalse"></div>
    <div class="answerText"></div>
    <div class="nextQuestion" ds="next">${texts.next}</div>
</span>
`;
}
}