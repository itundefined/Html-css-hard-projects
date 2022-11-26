(function () {
  class TodoListHelper {
    constructor() {
      const databaseName = "testing1"; //localDatabse name connected to the localStorage
      const localdatabase = JSON.parse(localStorage.getItem(databaseName));

      this.databasename = databaseName;

      this.localdatabase = localdatabase;

      if (localdatabase) {
        this.renderAllTasks(databaseName);
      } else {
        localStorage.setItem(databaseName, JSON.stringify([]));
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
      const taskAndTitle = {
        title: yourObj.keyNote.value,
        task: yourObj.descriptionText.value,
        id: yourObj.id,
      };

      //checking whether if there is some data previously

      const oldData = localStorage.getItem(this.databasename);

      // converting
      const parsedArr = JSON.parse(oldData);

      let tempArray = [];

      if (parsedArr) {
        tempArray.push(...parsedArr);
        tempArray.push(taskAndTitle);
        let jsonArr = JSON.stringify(tempArray);
        localStorage.setItem(this.databasename, jsonArr);
      } else {
        tempArray.push(taskAndTitle);
        let jsonArr = JSON.stringify(tempArray);
        localStorage.setItem(this.databasename, jsonArr);
      }

      this.renderAllTasks();
    }

    databaseUpdate(yourObj){
        let tempArray = yourObj;
        let jsonArr = JSON.stringify(tempArray);
        localStorage.setItem(this.databasename, jsonArr);
    }

    createUniqueId() {
      return Date.now();
    }

    pageTransition() {
        const pageChanger = document.querySelector(".pageChanger");
        pageChanger.classList.toggle("stepPage");
    }

    pageTransition2() {
        const pageChanger = document.querySelector(".pageChanger2");
        pageChanger.classList.toggle("stepPage2");
    }

    

    AllEventListeners() {
      const that = this;
      const [today, allOtherDay, createNew] =
        document.querySelectorAll(".menuList li");

        const createUpdateWindow = document.querySelector(".createUpdate");
        const buttonToCreate = document.querySelector(".updateOrDelete");

        const MainCards = document.querySelector(".TasksList");


        MainCards.addEventListener("click", function(e){

            if(e.target.classList.contains("updateButton")) {
                that.updateTask(e.target.classList);
                buttonToCreate.innerText = "update";


                setTimeout(() => {
                    createUpdateWindow.style.display = "flex";
                }, 800);
            }

            else if(e.target.classList.contains("deleteButton")) {
                that.removeTask(e.target.classList);
            }

            else if(e.target.classList.contains("card")) {
                const UniqueId = parseInt(e.target.classList[1]);
                const allTasks = that.databaseRead();
                const windowToChange = document.querySelector(".pageChanger2");
                const elementToUpdate = allTasks.filter((item)=>{return item.id === UniqueId});
                windowToChange.innerHTML = "";
                const html = `
                <div class="closeSection" onclick="helper()"><span class="material-symbols-outlined">close</span></div>
                <h3>${elementToUpdate[0].title}</h3> <p>${elementToUpdate[0].task}</p>`
                windowToChange.insertAdjacentHTML("afterbegin", html);
                that.pageTransition2(); 
            }
        })

      createNew.onclick = function () {
        that.pageTransition();
        buttonToCreate.innerText = "Create";
        buttonToCreate.onclick = function () {
          that.addTask();
        };

        setTimeout(() => {
            createUpdateWindow.style.display = "flex";
        }, 800);

      };
    }

    renderAllTasks() {
      const taskContainer = document.querySelector(".TasksList");
      taskContainer.innerHTML = "";

      const allTasks = this.databaseRead();

      const niceBackground = [
        "background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);",
        "background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);",
        "background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);",
        "background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);",
      ];
      let wheel = -1;

      allTasks.map((item) => {
        wheel = wheel + 1;
        
        if (wheel >= niceBackground.length) {
          wheel = 0;
        }
        const colorToChoose = niceBackground[wheel];

        const html = `<div class="card ${item.id}" style="${colorToChoose}">
                                    <div class="cardWrapper">
                                        <p class="title">${item.title}</p>
                                    </div>
                                    <p>Read More.</p>

                                    <div class="moreOptions"><button class="updateButton ${item.id}">update</button> <button class="deleteButton ${item.id}">delete</button></div>
                                </div>
                            `;
        taskContainer.insertAdjacentHTML("afterbegin", html);
      });
    }

    addTask() {
      const createUpdateWindow = document.querySelector(".createUpdate");
      const [keyNote, descriptionText] = document.querySelectorAll(".inputs");

      let verify = descriptionText.value.split("");
      let verify2 = keyNote.value.split("");

      verify = verify.filter((x) => {
        if (x !== " ") {
          return x;
        }
      });

      verify2 = verify2.filter((x) => {
        if (x !== " ") {
          return x;
        }
      });

      if (verify.length !== 0 && verify2.length !== 0) {
        // Unique Id
        const id = this.createUniqueId();

        // Creating the task object
        const taskAndTitle = {
          keyNote: keyNote,
          descriptionText: descriptionText,
          id: id,
        };

        this.databaseWrite(taskAndTitle);

        keyNote.value = "";
        descriptionText.value = "";

        createUpdateWindow.style.display = "none";

        setTimeout(() => {
            this.pageTransition();
        }, 100);
        
        
      } else {
        alert("Please fill all fields");
      }
    }

    removeTask(itemToRemove) {
        const UniqueId = parseInt(itemToRemove[1]);
        const oldData = this.databaseRead();
        const newData = oldData.filter((item)=>{
            return item.id !== UniqueId;
        })
        this.databaseUpdate(newData);
        this.renderAllTasks();
    }

    updateTask(itemToUpdate) {
        const that = this;
        const createUpdateWindow = document.querySelector(".createUpdate");
        const buttonToCreate = document.querySelector(".updateOrDelete");

        let [keyNote, descriptionText] = document.querySelectorAll(".inputs");
        const UniqueId= parseInt(itemToUpdate[1]);

        let indexer = -1;

        const allTasks = this.databaseRead();
        const elementToUpdate = allTasks.filter((item)=>{return item.id === UniqueId});


        keyNote.value = elementToUpdate[0].title;
        descriptionText.value = elementToUpdate[0].task;

        this.pageTransition();


        buttonToCreate.onclick = function () {
            let [keyNote, descriptionText] = document.querySelectorAll(".inputs");
            elementToUpdate[0].title = keyNote.value;
            elementToUpdate[0].task = descriptionText.value;
            that.databaseUpdate(allTasks);
            that.renderAllTasks();
            that.pageTransition();
            createUpdateWindow.style.display = "none";
        }


    }

    sortTask() {}
  }

  const trigger = new TodoListHelper();
})();
