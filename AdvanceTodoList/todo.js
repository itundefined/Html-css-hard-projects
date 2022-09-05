class todo{
    constructor() {
        const databaseName = "testing1" //localDatabse name connected to the localStorage
        const themeHolder = "user-setting"
        const localdatabase = JSON.parse(localStorage.getItem(databaseName));

        let tempdrag;
        let temp = [];
        
        this.temp = temp;
        this.tempdrag = tempdrag;
        this.databaseName = databaseName;
        this.themeHolder = themeHolder;
        this.localdatabase = localdatabase;

        this.toggleTheme();


        if(localdatabase) {
            this.renderAllThetasks(databaseName);
        }
        else{
            localStorage.setItem(databaseName, JSON.stringify([]))
        }
    }

    renderAllThetasks(databaseName) {
        const str = localStorage.getItem(databaseName);
    
        // convert string to valid object
        const parsedArr = JSON.parse(str);
        if(parsedArr) {
            parsedArr.map((element, index) => {
                // Create html now
                const containerForSpans = document.createElement("div");
                const containerForFunctionIcons = document.createElement("div")
                const titleSpan = document.createElement("span");
                const mainTaskSpan = document.createElement("span")
                const deleteSpan = document.createElement("span");
                const updateSpan = document.createElement("span");
    
                // Adding eventListener to hover and toggle the class
                containerForSpans.setAttribute("draggable", "true");
                containerForSpans.setAttribute("ondragstart", "todohelper.drag(event)");
                containerForSpans.setAttribute("ondragend", "todohelper.stopDragged(event)")
    
                // Fetching the DropBox
                const DropBox = document.getElementsByClassName("dropbox")[0];
                DropBox.setAttribute("ondrop", "todohelper.drop(event)");
                DropBox.setAttribute("ondragover", "todohelper.allowDrop(event)");
    
    
                // create Text node for spans
                const titleText = document.createTextNode(element["title"]);
                const taskText = document.createTextNode(element["task"])
                const deleteSpanText = document.createTextNode("delete");
                const updateSpanText = document.createTextNode("update");
    
                // creating hr line
                const hr = document.createElement("hr")
                hr.classList.add("hrLine");
    
                // add text to the spans
                titleSpan.appendChild(titleText);
                mainTaskSpan.appendChild(taskText);
                deleteSpan.appendChild(deleteSpanText);
                updateSpan.appendChild(updateSpanText);
    
                // Assigning em class
                containerForSpans.classList.add("spans-container");
                containerForFunctionIcons.classList.add("func-container");
                containerForSpans.classList.add(index);
                titleSpan.classList.add("titleSpan");
                mainTaskSpan.classList.add("mainTaskSpan");
                deleteSpan.classList.add("material-symbols-outlined");
                updateSpan.classList.add("material-symbols-outlined");
                deleteSpan.classList.add("deleteIcon");
                updateSpan.classList.add("updateIcon");
                
                
    
                // Binding them togather
                containerForSpans.appendChild(titleSpan);
                if(element['title'] !== "") {containerForSpans.appendChild(hr)}
                containerForSpans.appendChild(mainTaskSpan);
                
                containerForFunctionIcons.appendChild(deleteSpan)
                containerForFunctionIcons.appendChild(updateSpan)
                
                containerForSpans.appendChild(containerForFunctionIcons);
    
                // Fetching the node element 
                const node = document.getElementsByClassName("showtasks")[0];
    
                // Now pushing into main Node
                node.appendChild(containerForSpans);
    
    
                // Adding eventListener for delete and update
                const updateIcon = updateSpan;
                const deleteIcon = deleteSpan;
    
                updateIcon.addEventListener('click', ()=>{
                    // Calling update Function to update things
                    const elementToUpdate = containerForSpans.className;
                    this.updateButton(elementToUpdate);
                })
    
                updateIcon.addEventListener("mouseover", ()=>{
                    this.updationIndication(containerForSpans);
                })
    
                updateIcon.addEventListener("mouseout", ()=>{
                    this.updationIndication(containerForSpans);
                })
    
                deleteIcon.addEventListener('click', ()=>{
                    // calling delete function to delete things
                    const elementToDel = containerForSpans.className;
                    this.deleteButton(elementToDel);
                })
    
                deleteIcon.addEventListener("mouseover", ()=>{
                    this.deletionIndication(containerForSpans);
                })
    
                deleteIcon.addEventListener("mouseout", ()=>{
                    this.deletionIndication(containerForSpans);
                })
    
            })
        }
    }


    addTheTask() {
        let databaseName = this.databaseName;
        let tempArray = [];
        // fetch the data from the inputs
        const title = document.getElementById("title").value;
        const task = document.getElementById("task");
        const taskvalue = task.value
    
        let verify = taskvalue.split("");
    
        verify = verify.filter((x)=>{
            if(x !== " "){
                return x;
            }
        })
        
        if(verify.length !== 0) {
            // Creating the task object 
            const taskAndTitle = {"title":title, "task":taskvalue};
    
    
            //checking whether if there is some data previously
    
            const oldData = localStorage.getItem(databaseName);
    
            // converting
            const parsedArr = JSON.parse(oldData);
    
            if(parsedArr) {
                tempArray.push(...parsedArr);
                tempArray.push(taskAndTitle);
                let jsonArr = JSON.stringify(tempArray);
                localStorage.setItem(databaseName, jsonArr)
                location.reload();
            }
            else{
                let jsonArr = JSON.stringify(tempArray);
                localStorage.setItem(databaseName, jsonArr)
                location.reload();
            }
        }
    
        else{
            task.classList.add("giveError");
        }
    }


    deleteButton(element) {
        let databaseName = this.databaseName;
        const storedInfo = localStorage.getItem(databaseName);
        // converting
        const parsedArr = JSON.parse(storedInfo);
        const elementToDelete = parsedArr[parseInt(element.split(" ")[1])];
        const elementFromDom = document.getElementsByClassName(element.split(" ")[1]);
        elementFromDom[0].classList.add("remove-item")
        // Filter the array now with filter method
        const filteredArray = parsedArr.filter((x)=>{
            return x !== elementToDelete;
        })
    
        let jsonArr = JSON.stringify(filteredArray);
        localStorage.setItem(databaseName, jsonArr)
        setTimeout(() => {
            location.reload();
        }, 500);
    }


    deleteDropbox() {
        let databaseName = this.databaseName;
        const storedInfo = localStorage.getItem(databaseName)
        // converting
        const parsedArr = JSON.parse(storedInfo);
        let elementsToDel = [];
        
        // fetching from the databaseName
        let elementsFromData = [];
    
        // FilteredArray
        let filteredArray = [];
    
        const dropboxElement = document.getElementsByClassName("dropbox")[0];
    
        dropboxElement.classList.add("remove-item");
    
        dropboxElement.childNodes.forEach((element)=>{
            elementsToDel.push(element);
        })
        elementsToDel = elementsToDel.slice(3, elementsToDel.length)
    
        elementsToDel.forEach(element => {
            elementsFromData.push(parsedArr[parseInt(element.classList[1])]);
        })
    
        filteredArray = parsedArr.filter((x)=>{
            if(!elementsFromData.includes(x))  {return x}
        })
    
        // changing from here
        let jsonArr = JSON.stringify(filteredArray);
        localStorage.setItem(databaseName, jsonArr)
        setTimeout(() => {
            location.reload();
        }, 500);
    
    }

    updateTheTask() {
        let temp = this.temp;
        let databaseName = this.databaseName;
        const storedInfo = localStorage.getItem(databaseName);
        // converting
        const parsedArr = JSON.parse(storedInfo);
        
        // Change it's text with the new one
        const elementToUpdate = temp[0].split(" ")[1];
    
        // change the value in localStorage and reload the page;
        const newText = document.getElementById("editable-input").value;
    
        // modifying the same element
        parsedArr[elementToUpdate]['task'] = newText
        
        // Now to Store this modified array to localStorage
    
        let jsonArr = JSON.stringify(parsedArr);
        localStorage.setItem(databaseName, jsonArr)
    
        // making the editableWindowSection hidden
        const editableWindowSection = temp[1];
        editableWindowSection.style.display = "none";
    
        // Making the temp empty again to use and reload the page
        temp = [];
        location.reload();
    }

    allowDrop(ev) {
        ev.preventDefault();
    }
    
    drag(ev) {
        this.tempdrag = ev.target;
        this.tempdrag.classList.add("whileDragging")
    }

    stopDragged(ev) {
        this.tempdrag = ev.target;
        this.tempdrag.classList.remove("whileDragging")
    }

    drop(ev) {
    ev.preventDefault();
    const dropbox = document.getElementsByClassName('dropbox')[0];
    dropbox.appendChild(this.tempdrag);
    this.tempdrag = "";
    }

    updateButton(element) {
        // Fetching the Editable window to make it block
        const editableWindowSection = document.getElementsByClassName("editable")[0];
        editableWindowSection.style.display = "flex";
    
        // Fetching the editableWindow
        const editableWindow = document.getElementById("editable-input");
    
    
        // Fetch the old text from the span 
        let unUpdatedValue = document.getElementsByClassName(element.split(" ")[1])[0].childNodes;
    
        if(unUpdatedValue.length <= 3) {
    
            // Now add that into editableWindow
            editableWindow.value = unUpdatedValue[1].innerText
        }
        else if(unUpdatedValue.length >= 4){
    
            // Now add that into editableWindow
            editableWindow.value = unUpdatedValue[2].innerText
        }
    
    
        // Pushing to the temp array
        this.temp.push(element, editableWindowSection)
    }

    hideTitle(hide, show) {
        const hideEelment = document.getElementsByClassName(hide)[0];
        const showElement = document.getElementsByClassName(show)[0];
        showElement.classList.remove("header-hide-element");
        hideEelment.classList.add("header-hide-element")
        setTimeout(() => {
            hideEelment.style.display = "none"
            showElement.style.display = "flex"
        }, 500);
    }

    deletionIndication(element){
        let splitting = element.classList[1];
        const elementToFetch = document.getElementsByClassName(splitting)[0];
        elementToFetch.classList.toggle("deletionIndication");
    }

    updationIndication(element){
        let splitting = element.classList[1];
        const elementToFetch = document.getElementsByClassName(splitting)[0];
        elementToFetch.classList.toggle("updationIndication");
    }

    toggleDropBox() {
        const dropbox = document.getElementsByClassName("dropbox")[0];
        const menuTrigger = document.getElementsByClassName("menu-trigger")[0];
        dropbox.classList.toggle("toggleDropBox");
        menuTrigger.classList.toggle("rotate-it");
    }

    toggleTheme() {
        let themeHolder = this.themeHolder;
        const savedTheme = localStorage.getItem(themeHolder);
        const inputtogge = document.getElementsByClassName("toggle-theme")[0];
        const MainSection = document.getElementsByClassName("body")[0];
        inputtogge.addEventListener('click', ()=>{
            MainSection.classList.toggle("dark");
            if(MainSection.classList.length === 2) {
                localStorage.setItem(themeHolder, "dark");
            }
            else{
                localStorage.setItem(themeHolder, "white");
            }
        })
    
        if(savedTheme === "dark") {
            MainSection.classList.toggle("dark");
            document.getElementById("myCheck").checked = true;
        };
    }

}

const todohelper = new todo();



