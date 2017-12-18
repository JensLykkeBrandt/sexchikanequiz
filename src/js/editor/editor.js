export default class editor {
    constructor(params) {
        this.data = params.data;
        this.solutionId = params.solutionId;
        this.status = "";
    }

    /**
     * Initiates the GUI
     */
    initGUI() {
        // insert element before
        this.topElem = window.document.getElementById("databaseRedInteractive");
        this.newElem = document.createElement("div");
        this.topElem.parentNode.insertBefore(this.newElem, this.topElem);

        // insert content
        this.newElem.innerHTML =
            `<div style="z-index:1; position:absolute; top:0px; right: -55px; height:auto; width:auto;padding: 2px;cursor:pointer; background-color:white; border: 1px solid black; border-radius:3px" id="editorMenu">
                <div title="Ret tekster" style="display:none; width:24px; height:24px">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-5 17l1.006-4.036 3.106 3.105-4.112.931zm5.16-1.879l-3.202-3.202 5.841-5.919 3.201 3.2-5.84 5.921z"/>
                    </svg>
                </div>
                <div title="Gem ændringer" style="display:none; width:24px; height:24px">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597z"/>
                    </svg>
                </div>
                <div title="Gem ikke ændringer" style="display:none; width:24px; height:24px">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/>
                    </svg>
                </div>
                <div title="Loading" style="width:24px; height:24px">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 23c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm4.209-.834c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm3.568-2.387c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.447 1-1zm2.385-3.568c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm.838-4.209c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.447 1-1zm-.838-4.209c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.447 1-1zm-2.385-3.568c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm-3.567-2.385c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm-4.21-.84c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm-4.21.838c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm-3.569 2.385c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm-2.384 3.57c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.447 1-1zm-.837 4.209c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm.837 4.209c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.447 1-1zm2.384 3.569c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.447 1-1zm3.571 2.383c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1z"/>
                    </svg>
                </div>
                <div title="Login for at rette" style="display:none; width:24px; height:24px">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.625 8.292c0 .506-.41.917-.917.917s-.916-.411-.916-.917.409-.917.916-.917.917.411.917.917zm7.375 3.708c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-11.293 1.946c-1.142-.436-2.065-1.312-2.561-2.423l-3.146 3.185v2.292h3v-1h1v-1h.672l1.035-1.054zm5.293-4.279c0-2.025-1.642-3.667-3.667-3.667-2.024 0-3.666 1.642-3.666 3.667s1.642 3.667 3.666 3.667c2.025-.001 3.667-1.643 3.667-3.667z"/></svg>
                </div>
                <div title="Du har ikke adgang til at rette i teksten." style="display:none; width:24px; height:24px">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.971 0h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm.932 11.667c-.127.328-1.695 3.888-2.096 4.786-.42.941-1.239 1.881-2.751 1.881h-2.627c-1.592-.001-2.429-.945-2.429-2.597v-7.208c0-.956 1.317-.908 1.317-.044v3.16c0 .26.477.259.477 0v-5.078c0-.982 1.472-.957 1.472 0v4.795c0 .264.442.252.442-.005v-5.628c0-.957 1.458-.984 1.458 0l.001 5.692c0 .254.459.261.459 0v-4.78c0-.905 1.596-.933 1.596 0v5.417c0 .331.327.384.45.131.118-.24.605-1.315.613-1.327.489-1.029 2.127-.404 1.618.805z"/></svg>
                </div>
            </div>`;

        // set style
        this.newElem.style.position = "relative";

        // Set topmenu-var
        this.menu = document.querySelector('#editorMenu').getElementsByTagName("div");

        // add events
        this.menu[0].addEventListener('click', this.editClick.bind(this));
        this.menu[1].addEventListener('click', this.saveClick.bind(this));
        this.menu[2].addEventListener('click', this.cancelClick.bind(this));
        this.menu[4].addEventListener('click', this.loginPage.bind(this));

        // Update according to status
        this.updateStatus();
    }

    /**
     * Open a window to login
     */
    loginPage() {
        window.open('https://drdb.azurewebsites.net/login/facebook', "Login", "height=600,width=600");
    }

    /**
     * Update buttons according to data from the server.
     */
    updateStatus() {
        if (this.status == "access") {
            this.setIcons(1,0,0,0,0,0);
        } else if (this.status == "no access.") {
            this.setIcons(0,0,0,0,0,1);
        } else if (this.status == "not logged in.") {
            this.setIcons(0,0,0,0,1,0);
        }
    }

    /**
     * Load data from server
     * @returns The data -> json
     */
    loadData(callback) {
        //this.solutionId
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://drdb.azurewebsites.net/data?id=' + this.solutionId);
        xhr.withCredentials = true;
        xhr.onload = function() {
            if (xhr.status === 200) {
                let result = JSON.parse(xhr.responseText);

                this.data = JSON.parse(result.data);
                this.status = result.status;

                callback(this.data);
            }
            else {
                alert('Request failed.  Returned status of ' + xhr.status);
            }
        }.bind(this);
        xhr.send();
    }

    /**
     * When the edit-button is clicked.
     */
    editClick() {
        window.test = [];
        // get all editable elements, save for future use.
        this.editList = document.querySelectorAll('[ds]');
        for (let a=0, len = this.editList.length; a < len; a++) {
            // set them to editable.
            this.editList[a].contentEditable = true;
            // Set change-event on all
            this.editList[a].addEventListener('input', this.elementChanged.bind(this));
        }

        // Change icons
        this.setIcons(0,1,1,0,0,0);
    }

    /**
     * When the cancel-button is clicked.
     */
    cancelClick() {
        // Change icons
        this.setIcons(1,0,0,0,0,0);
        // Remove event and stuff
        this.stopEdit();
        // show message
        window.alert("Genindlæs siden for at få nulstillet værdierne");
    }

    /**
     * When the save-button is clicked
     */
    saveClick() {
        // Change icons
        this.setIcons(0,0,0,1);

        // Send data to server
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://drdb.azurewebsites.net/data?id=' + this.solutionId);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.withCredentials = true;
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Change icons
                this.setIcons(1,0,0,0,0,0);
                // Remove event and stuff
                this.stopEdit();
            } else {
                alert("Der skete en fejl?!?");
            }
        }.bind(this);
        xhr.send(JSON.stringify(this.data));
    }

    /**
     * Make it non-editable and remove events
     */
    stopEdit() {
        for (let a = 0, len = this.editList.length; a < len; a++) {
            // set them to un-editable.
            this.editList[a].contentEditable = false;
            // Remove change-event on all
            this.editList[a].removeEventListener('input', this.elementChanged);
        }
    }

    /**
     * Event-handler on change
     * Gets the ds (datasource) and initiates the change
     */
    elementChanged() {
        // get datasource and split
        let ds = event.target.getAttribute("ds").split(".");
        // set value
        this.changeJson(this.data, ds, event.target.innerHTML.trim());
    }

    /**
     * recursive function to traverse into JSON and change a value
     * @param datajson - where the 'pointer' is right now in JSON
     * @param ds - An array with the 'path' to the value that needs to be changed
     * @param content - the new value
     */
    changeJson(datajson, ds, content) {
        if (ds.length == 1) {
            datajson[ds.shift()] = content;
        } else {
            this.changeJson(datajson[ds.shift()], ds, content);
        }            
    }

    /**
     * Shows or hides icons
     * @param x - Start edit
     * @param y - Save
     * @param z - Cancel
     * @param u - loading
     * @param t - Login
     * @param s - No Access
     */
    setIcons(x, y, z, u, t, s) {
        this.menu[0].style.display = x ? "block" : "none";
        this.menu[1].style.display = y ? "block" : "none";
        this.menu[2].style.display = z ? "block" : "none";
        this.menu[3].style.display = u ? "block" : "none";
        this.menu[4].style.display = t ? "block" : "none";
        this.menu[5].style.display = s ? "block" : "none";
    }
}