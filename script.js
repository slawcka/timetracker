/* 
1. sukuriame trys kontrolerius- laiko ,  atvaizdavimo ir controller




*/


var timeController = (function () {

    var Projects = function (id, name, time) {
        this.id = id;
        this.name = name;
        this.time = time;
    };
    var projectsData = {
        projects: [],
        totalTime: 0
    };
    var projectTime = 0;
    var globalID = 1;




    var calcTotal = () => {
        var total = 0;
        projectsData.projects.forEach(el => total += el.time);
        projectsData.totalTime = total;
    }

    return {

        //ADD ITEM TO DATA 
        addItem: (value) => {
            let ID;
            if(projectsData.projects.length > 0){
                ID = projectsData.projects[projectsData.projects.length - 1].id + 1
            }else{
                ID = 0
            }
            var newItem, time;
            time = 0;
            newItem = new Projects(ID, value, time);
            projectsData.projects.push(newItem);
            return newItem;
        },
        updateTime:(currentProject,time)=>{
            projectsData.projects[currentProject].time=time;
        },
        //
        calculateTotaTime: () => calcTotal,
            timer: setInterval(() => {
                projectTime++;
                return projectTime
            }, 1000),

        //GIVE ID TO CTRL
        

        testproj: () => console.log(projectsData),
        startcount: () => timegoes(),
    }
})();

var UiController = (function () {
    let seconds = 0;
    var currentID;
    var interval;
    var DOMstrings = {
        inputButton: '.input-button',
        inputValue: '.input-name',
        time: '.time',
        inputTime: '.input-time',
        taskWrapper: '.tasks-wrapper',
        inputAttribute: '[data-input]',
        pauseButton: '.pause'
    }

    return {
        getInput: function () {
            return {
                value: document.querySelector(DOMstrings.inputValue).value,

            }
        },

        getDOMstrings: () => DOMstrings,

        addListItemDOM: (obj) => {
            var wrapper = DOMstrings.taskWrapper;
            var html = `<div class='task-item' data-id='${obj.id}'><p>${obj.name}</p><p class='time' data-currentTimer=${obj.id}>0</p><a href='#' class='pause'>pause</a>`;
            document.querySelector(wrapper).insertAdjacentHTML('beforeend', html);
            currentID = obj.id;
        },

        startTimer: () => {
            clearInterval(interval)
            seconds = 0;
            interval = setInterval(() => {
                seconds++
                var gugu = `[data-currentTimer="${currentID}"]`;
                console.log('gugu: ', gugu);
                var secondsDiv = document.querySelector(gugu);
                secondsDiv.textContent = seconds;
                return seconds
            }, 1000)
        },

        pausetimer: (ev) => {
            
            console.log('TCL: UiController -> currentPause', ev.target);
            clearInterval(interval)
            return seconds;
        },

        clearInputValues: () => {
            var inputFields = document.querySelectorAll(DOMstrings.inputAttribute);
            inputFields.forEach(el => el.value = '')
            inputFields[0].focus();
        }
    }
})();

// MAIN CONTROLLER
var controller = (function (TimeCtrl, UIctrl) {
    var DOM = UIctrl.getDOMstrings();
    
    var setupEventListeners = () => {
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', ev => (ev.keyCode === 13 && ctrlAddItem()));
    }
    var setupEventListenersAfter = () => {
        document.querySelector(DOM.pauseButton).addEventListener('click', pauseTimer);
    }
    //kai paspaudzia enter ar go
    var ctrlAddItem = () => {
        
        var input = UIctrl.getInput();
        if (input.description !== '' && isNaN(input.value)) {
            var newItem = TimeCtrl.addItem(input.value);
            UIctrl.addListItemDOM(newItem);
            UIctrl.startTimer();
            UIctrl.clearInputValues();
        } else {
            alert('duh! write something you lazy twat..')
        };
        setupEventListenersAfter();
        //TimeCtrl.startcount();
    };
    var pauseTimer = (ev) => {
       
        UIctrl.pausetimer(ev)
    }




    return {
        init: () => {
            console.log('app started');
            setupEventListeners();
        }
    }
})(timeController, UiController);
controller.init();









/* 
var allProjects=[];
  
var projectids=1;
  
  
  
  
  
function timerStart(e){
    
    const inputValue=document.querySelector('.input');
    const newObject={
        ids: projectids,
        name: inputValue.value,
        timer:0
    }
    allProjects.push(newObject)
    const currentID=allProjects.find(el=> el.ids = projectids );
    projectids++;
    inputValue.value='';
    addProjectDiv(currentID);
    
}
function addProjectDiv(obj){
    var time=0;
    
    const tasksWrapper=document.querySelector('.tasks-wrapper');
    
    const div=`<div class='project' data-id='${obj.id}'>
                  <h2>${obj.name}</h2><p class='time'>0</p>
                  <i class="fas fa-play-circle play-button"></i>
                  </div> `
    
                  tasksWrapper.insertAdjacentHTML('beforeend', div);
   const stopButton=document.querySelector('.play-button');
   stopButton.addEventListener('click',stop)
    function stop(){
        clearInterval(interval)
    }
    
  
       let interval= setInterval(function(){
            const pElement=document.querySelector('.time');
            time++
            pElement.textContent=time;
            obj.timer=time;
            
        },1000)
                 
}
  
  
  
const startButton= document.querySelector('.input-button');
const playButton=document.querySelector('.play-button')
const input=document.querySelector('input');
const addButton=document.querySelector('.add-task');
startButton.addEventListener('click',timerStart);
  
  
  
console.log('TCL: allProjects', allProjects); */
















/* 
  
  
  
 const div=`<div class='project' data-id='${obj.id}'>
                  <h2>${obj.name}${time}</h2>
                  <i class="fas fa-play-circle play-button"></i>
                  </div> `
  
const attributeNo= e.
e.target.previousElementSibling.value
  
  
  
  
*/