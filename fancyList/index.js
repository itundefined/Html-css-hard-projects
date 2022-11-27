(function () {
  class TodoListHelper {
    constructor() {
      const databaseName = "CodeonebFancyList"; //localDatabse name connected to the localStorage
      const databaseNameUserSettings = "CodeonebFancyListuserSettings";
      

      const localdatabase = JSON.parse(localStorage.getItem(databaseName));
      const localUserSettings = localStorage.getItem(databaseNameUserSettings);
      this.userSettingsDataBase = databaseNameUserSettings;

      this.UserSettings = localUserSettings;

      this.databasename = databaseName;

      this.localdatabase = localdatabase;
    

      if (localdatabase) {
        this.renderAllTasks();
      } else {
        localStorage.setItem(databaseName, JSON.stringify([]));
        this.renderAllTasks();
      }

      if (!localUserSettings) {
        localStorage.setItem(databaseNameUserSettings, "today");
      } 
      
      this.AllEventListeners();

      this.SearchedData;

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

    defaultSelector() {
      const [today, allOtherDay, createNew] =
        document.querySelectorAll(".menuList li");

        today.classList.add("selected")
        allOtherDay.classList.remove("selected")
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
      const [today, allOtherDay, createNew] = document.querySelectorAll(".menuList li");
      const createUpdateWindow = document.querySelector(".createUpdate");
      const buttonToCreate = document.querySelector(".updateOrDelete");
      const MainCards = document.querySelector(".TasksList");
      const trigger = document.querySelector("input[type='checkbox']");
      const Searchbar = document.querySelector(".searchBar");

      Searchbar.oninput = function(inputValue){
        that.SearchedData = this.value;
        if(this.value.trim() === ""){
          that.renderAllTasks();
        }
      };

      Searchbar.onkeydown = function(event){
        if(event.key === "Enter") {that.sortTask("search")}
      }


      trigger.onclick = function(){that.themeChanger(trigger)};



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
        const [keyNote, descriptionText] = document.querySelectorAll(".inputs");
        keyNote.value = "";
        descriptionText.value = "";
        that.pageTransition();
        buttonToCreate.innerText = "Create";
        buttonToCreate.onclick = function () {
          that.addTask();
        };

        setTimeout(() => {
            createUpdateWindow.style.display = "flex";
        }, 800);

      };


      today.onclick = function () {
        today.classList.add("selected")
        allOtherDay.classList.remove("selected")
        that.sortTask("recent");
      };

      allOtherDay.onclick = function () {
        today.classList.remove("selected");
        allOtherDay.classList.add("selected");
        that.sortTask("allOtherTasks");
      };

    }
    

    renderAllTasks(ListOfTaskss=this.databaseRead()) {
      const taskContainer = document.querySelector(".TasksList");

      taskContainer.innerHTML = "";
      
      const allTasks = ListOfTaskss; 

      const niceBackground = [
        "background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);",
        "background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);",
        "background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);"
      ];
      let wheel = -1;

      allTasks.map((item) => {
        wheel = wheel + 1;
        
        if (wheel >= niceBackground.length) {
          wheel = 0;
        }
        const colorToChoose = niceBackground[wheel];

        const time = Math.floor(Date.now()/1000/60/60 - item.id/1000/60/60);

        const html = `<div class="card ${item.id}" style="${colorToChoose}">
                                    <div class="cardWrapper">
                                        <p class="title">${item.title}</p>
                                    </div>
                                    
                                    <div class="cardInfo">${time} HOURS AGO <p>Read More.</p></div>

                                    <div class="moreOptions"><button class="updateButton ${item.id}">update</button> <button class="deleteButton ${item.id}">delete</button></div>
                                </div>
                            `;
        taskContainer.insertAdjacentHTML("afterbegin", html);
      });
    }

    addTask() {
      this.defaultSelector();
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

    sortTask(SortWhat) {
      const CurrentData = this.databaseRead();
      let ModifiedData;

      if(SortWhat === "recent") {  

            ModifiedData = CurrentData.filter((item)=>{
              const CreatedAt = Math.floor(Date.now()/1000/60/60 - item.id/1000/60/60);
              return CreatedAt <= 24;
          })
          
      }

      else if(SortWhat === "allOtherTasks") {
            ModifiedData = CurrentData.filter((item)=>{
              const CreatedAt = Math.floor(Date.now()/1000/60/60 - item.id/1000/60/60);
              return CreatedAt > 24;
          })
      }

      else if(SortWhat === "search") {
        let findThis = this.SearchedData;
        findThis = findThis.trim();
        if (findThis === "") {

        }

        else{
          ModifiedData = CurrentData.filter((item)=>{
            if(item.title.toLowerCase().includes(this.SearchedData.toLowerCase()) || item.task.toLowerCase().includes(this.SearchedData.toLowerCase())){
              return item;
            }
          })
        }
      }
      
      this.renderAllTasks(ModifiedData);

    }

    themeChanger(){
      const TheWholeContainer = document.querySelector(".container");
      const SearchBar = document.querySelector(".searchWrapper");
    
      SearchBar.classList.toggle('borderHelper');
      TheWholeContainer.classList.toggle("WholeContainer");
    }

  }

  const trigger = new TodoListHelper();
})();

// For The automate welcome line

(function (){
  var TxtRotate = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };
    
    TxtRotate.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];
    
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
    
      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
    
      var that = this;
      var delta = 200 - Math.random() * 100;
    
      if (this.isDeleting) { delta /= 2; }
    
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }
    
      setTimeout(function() {
        that.tick();
      }, delta);
    };
    
    window.onload = function() {
      var elements = document.getElementsByClassName('txt-rotate');
      for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
      document.body.appendChild(css);
    };
})();
