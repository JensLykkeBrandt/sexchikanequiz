
// Load editor
import editor from "./editor/editor.js";

// start editor
let ei = new editor({"solutionId": "sexchikanequiz"}); 
// When data is loaded
ei.loadData(function(txt){
    // Start viz
    new viz(txt);

    // Show userinterface
    ei.initGUI();
});