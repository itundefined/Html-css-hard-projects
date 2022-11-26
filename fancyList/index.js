(function(){

    class TodoListHelper{
        constructor(){

            const databaseName = "testing1" //localDatabse name connected to the localStorage
            const localdatabase = JSON.parse(localStorage.getItem(databaseName));

            this.databasename = databaseName;


            this.localdatabase = localdatabase;

            if(localdatabase) {
                this.renderAllTasks(databaseName);
            }
            else{
                localStorage.setItem(databaseName, JSON.stringify([]))
            }
            
            
            this.AllEventListeners();
        }

        databaseRead() {
            const oldData = localStorage.getItem(this.databasename);

            // converting
            const parsedArr = JSON.parse(oldData);

            return parsedArr;
        }

        databaseWrite(yourObj) {
            // Creating the task object 
            const taskAndTitle = {"title":yourObj.keyNote.value, "task":yourObj.descriptionText.value, "id":yourObj.id};


            //checking whether if there is some data previously
    
            const oldData = localStorage.getItem(this.databasename);
    
            // converting
            const parsedArr = JSON.parse(oldData);

            let tempArray = [];

            if(parsedArr) {
                tempArray.push(...parsedArr);
                tempArray.push(taskAndTitle);
                let jsonArr = JSON.stringify(tempArray);
                localStorage.setItem(this.databasename, jsonArr)
            }
            else{
                tempArray.push(taskAndTitle);
                let jsonArr = JSON.stringify(tempArray);
                localStorage.setItem(this.databasename, jsonArr)
            }

            this.renderAllTasks();
        }


        createUniqueId() {
            return Date.now();
        }

        pageTransition() {
        }

        AllEventListeners() {

        const that = this;
        const [today, allOtherDay, createNew] = document.querySelectorAll(".menuList li");


        createNew.onclick = function(){
            that.pageTransition();
            const createUpdateWindow = document.querySelector(".createUpdate");
            const buttonToCreate = document.querySelector(".updateOrDelete");
            buttonToCreate.innerText = "Create";
            buttonToCreate.onclick = function(){that.addTask()};
            createUpdateWindow.style.display = "flex"};
        };

        renderAllTasks() {
            const taskContainer = document.querySelector(".TasksList");
            taskContainer.innerHTML = "";

            const allTasks = this.databaseRead();

            const niceBackground = ["background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);", "background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);","background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);", "background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);"] 
            let wheel = -1;

            allTasks.map((item)=>{
                wheel = wheel + 1;
                const colorToChoose = niceBackground[wheel];
                if(wheel >= niceBackground.length) {
                    wheel = -1;
                }
                console.log(wheel);
                const html = `   <div class="card ${item.id}" style="${colorToChoose}">
                                    <div class="cardWrapper">
                                        <p class="title">${item.title}</p>
                                        <span class="material-symbols-outlined">more_horiz</span>
                                    </div>
                                    <p>Read More.</p>
                                </div>
                            `;
                taskContainer.insertAdjacentHTML("afterbegin", html);
            });

        };

        addTask() {
            const createUpdateWindow = document.querySelector(".createUpdate");
            const [keyNote, descriptionText] = document.querySelectorAll(".inputs");

            let verify = descriptionText.value.split("");
            let verify2 = keyNote.value.split("");

            verify = verify.filter((x)=>{
                if(x !== " "){
                    return x;
                }
            })


            verify2 = verify2.filter((x)=>{
                if(x !== " "){
                    return x;
                }
            })


            if(verify.length !== 0 && verify2.length !== 0) {
                // Unique Id
                const id = this.createUniqueId();

                // Creating the task object 
                const taskAndTitle = {"keyNote":keyNote, "descriptionText":descriptionText, "id":id};

                this.databaseWrite(taskAndTitle);
               
                keyNote.value = "";
                descriptionText.value = "";
                createUpdateWindow.style.display = "none";
            }

            else{
                alert("Please fill all fields")
            }

        };

        removeTask() {};

        updateTask() {};

        sortTask() {};
    }

    const trigger = new TodoListHelper();

})();
