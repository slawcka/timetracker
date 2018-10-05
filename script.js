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
    var calcTotal = () => {
        var total = 0;
        projectsData.projects.forEach(el => total += el.time);
        projectsData.totalTime = total;
    }
    return {
        addItem: (value, time) => {
            var newItem, ID;
            ID = 5;
            newItem = new Projects(ID, value, time);
            projectsData.projects.push(newItem);
            return newItem;
        },
        calculateTotaTime: () => calcTotal,
        testproj: () => console.log(projectsData)
    }
})();

var UiController = (function () {

    var DOMstrings = {
        inputButton: '.input-button',
        inputValue: '.input-name',
        inputTime: '.input-time',
        taskWrapper: '.tasks-wrapper',
        inputAttribute: '[data-input]'
    }

    return {
        getInput: function () {
            return {
                value: document.querySelector(DOMstrings.inputValue).value,
                time: document.querySelector(DOMstrings.inputTime).value
            }
        },
        getDOMstrings: () => DOMstrings,
        addListItemDOM: (obj) => {
            var wrapper = DOMstrings.taskWrapper;
            var html = `<div class='task-item'><p>${obj.name}</p><h1>${obj.time}</h1>`;
            document.querySelector(wrapper).insertAdjacentHTML('beforeend', html);
        },
        clearInputValues: () => {
            var inputFields = document.querySelectorAll(DOMstrings.inputAttribute);
            inputFields.forEach(el => el.value = '')
            inputFields[0].focus();
        }
    }
})();

var controller = (function (TimeCtrl, UIctrl) {

    var setupEventListeners = () => {
        var DOM = UIctrl.getDOMstrings();
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', ev => (ev.keyCode === 13 && ctrlAddItem()));
    }
    //kai paspaudzia enter ar go
    var ctrlAddItem = () => {
        var input = UIctrl.getInput();
        if (input.description !== '' && isNaN(input.value)) {
            var newItem = TimeCtrl.addItem(input.value, input.time);
            UIctrl.addListItemDOM(newItem);
            UIctrl.clearInputValues();
            console.log(input)
        } else {
            alert('duh! write something you lazy twat..')
        }
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