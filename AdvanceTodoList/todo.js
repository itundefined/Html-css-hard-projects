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


        // Fetching the DropBox
        const DropBox = document.getElementsByClassName("dropbox")[0];
        DropBox.setAttribute("ondrop", "todohelper.drop(event)");
        DropBox.setAttribute("ondragover", "todohelper.allowDrop(event)");

        this.toggleTheme();


        if(localdatabase) {
            this.renderAllThetasks(databaseName);
        }
        else{
            localStorage.setItem(databaseName, JSON.stringify([]))
        }
    }


    refreshTheDom() {
        let container = document.querySelector(".showtasks");
        container.innerHTML = "<div></div>";
        this.renderAllThetasks(this.databaseName);
    }

    
    renderAllThetasks(databaseName) {
        
        const str = localStorage.getItem(databaseName);
    
        // convert string to valid object
        const parsedArr = JSON.parse(str);

        if(parsedArr) {
            parsedArr.map((element, index) => {


                const title = element.title;
                const description = element.task;
                let container = document.querySelector(".showtasks");

                let hr = `<hr class="hrLine"/>`;
                
                if(!title) {hr = `<div></div>`}


                const html = `<div draggable="true" ondragstart="todohelper.drag(event)" ondragend="todohelper.stopDragged(event)" class="spans-container ${index}"><span class="titleSpan">${title}</span>${hr}<span class="mainTaskSpan">${description}</span><div class="func-container"><span class="material-symbols-outlined deleteIcon">delete</span><span class="material-symbols-outlined updateIcon">update</span></div></div>`;

                container.insertAdjacentHTML('afterbegin', html);

                
                // Adding the EventListener to deleteIcon and updateIcon

                container= [...document.querySelector(".showtasks").childNodes];
                container = container.slice(0, container.length - 1).reverse();

                const parentOfFuncs = container[index];
                const deleteIcon = parentOfFuncs.childNodes[3].childNodes[0];
                const updateIcon = parentOfFuncs.childNodes[3].childNodes[1];

                // For function

                deleteIcon.addEventListener('click', () => {this.deleteButton(parentOfFuncs)});
                updateIcon.addEventListener('click', () => {this.updateButton(parentOfFuncs)});

                // for styling

                updateIcon.addEventListener("mouseover", ()=>{
                    this.updationIndication(parentOfFuncs);
                })
                
                updateIcon.addEventListener("mouseout", ()=>{
                    this.updationIndication(parentOfFuncs);
                })                    


                deleteIcon.addEventListener("mouseover", ()=>{
                    this.deletionIndication(parentOfFuncs);
                })

                deleteIcon.addEventListener("mouseout", ()=>{
                    this.deletionIndication(parentOfFuncs);
                })        
            })
        }
    }



    addTheTask() {
        let databaseName = this.databaseName;
        let tempArray = [];
        // fetch the data from the inputs
        const title = document.querySelector("#title");
        const task = document.querySelector("#task");

        const taskvalue = task.value;
        const titlevalue = title.value;
    
        let verify = taskvalue.split("");
    
        verify = verify.filter((x)=>{
            if(x !== " "){
                return x;
            }
        })
        
        if(verify.length !== 0) {
            // Creating the task object 
            const taskAndTitle = {"title":titlevalue, "task":taskvalue};
    
    
            //checking whether if there is some data previously
    
            const oldData = localStorage.getItem(databaseName);
    
            // converting
            const parsedArr = JSON.parse(oldData);
    
            if(parsedArr) {
                tempArray.push(...parsedArr);
                tempArray.push(taskAndTitle);
                let jsonArr = JSON.stringify(tempArray);
                localStorage.setItem(databaseName, jsonArr)
            }
            else{
                let jsonArr = JSON.stringify(tempArray);
                localStorage.setItem(databaseName, jsonArr)
            }

            this.refreshTheDom();
            title.value = "";
            task.value = "";
        }
    
        else{
            task.classList.add("giveError");
        }
        
        
    }


    deleteButton(element) {
        element = element.className;
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
            this.refreshTheDom();
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
        const domElement = temp[2];

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
        domElement.childNodes[2].innerText = newText;
        this.refreshTheDom();
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
        const domElement = element;
        element = element.className;
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
        this.temp = [];
        this.temp.push(element, editableWindowSection, domElement);
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
