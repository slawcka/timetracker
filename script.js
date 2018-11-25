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
            if (projectsData.projects.length > 0) {
                ID = projectsData.projects[projectsData.projects.length - 1].id + 1
            } else {
                ID = 0
            }
            var newItem, time;
            time = 0;
            newItem = new Projects(ID, value, time);
            projectsData.projects.push(newItem);
            return newItem;
        },
        updateObjTime: (id, seconds) => {
            projectsData.projects.forEach(el => {
                if (el.id == id) {
                    el.time = seconds
                }
            })


        },
        returnCurrentTime:(id)=>{
            var time;
            projectsData.projects.forEach(el => {
                if (el.id == id){
                    projectTime= el;
                }
                
                ;}
               
            )
            return projectTime
        },
        //
       

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
        pauseButton: '.pause',
        container: '.task-box',
        input: 'input-name'
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
            var html = `<div class=col-12 m-3><div class='task-item clearfix ' data-id='${obj.id}'><h2>${obj.name}</h2><div class="time"><p data-currentTimer=${obj.id}>0</p><i class="fas fa-pause-circle pause pr"></i><i class="fas fa-trash-alt delete pr"></i></div></div></div>`;
            document.querySelector(wrapper).insertAdjacentHTML('beforeend', html);
            currentID = obj.id;
        },

      

        pausetimer: (ev) => {

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
        document.addEventListener('keypress', ev => (ev.keyCode === 13 && ctrlAddItem()));
    }

    var setupUniversalListeners = () => {
        document.addEventListener('click', whichClicked);
        function whichClicked(e) {
            const el = e.target;
            
            el.matches(DOM.inputButton) && ctrlAddItem();
            el.matches(DOM.pauseButton) && pauseResumeTimer(e);
            e.target.matches(DOM.inputAttribute) && console.log('tik tak tik tak')

        }
    }
    //kai paspaudzia enter ar go
    var ctrlAddItem = () => {

        var input = UIctrl.getInput();
        if (input.description !== '' && isNaN(input.value)) {
            var newItem = TimeCtrl.addItem(input.value);
            UIctrl.addListItemDOM(newItem);
            startTimer(TimeCtrl.returnCurrentTime(newItem.id));
            UIctrl.clearInputValues();
        } else {
            alert('duh! write something you lazy twat..')
        };

        //TimeCtrl.startcount();
    };
    var pauseResumeTimer = (el) => {
        
        var currentIntervalID=el.target.previousElementSibling.getAttribute('timer-id');
        var currentIDattribute=el.target.parentNode.getAttribute('data-id');
        var parent=el.target.parentNode;
       
        if(parent.className.includes('resume')){
            parent.classList.toggle('resume')
            startTimer(TimeCtrl.returnCurrentTime(currentIDattribute))
            
        }else {
            clearInterval(currentIntervalID)
            parent.classList.toggle('resume')
        }
    }

    var startTimer = (el) => {
        console.log('elzzz: ', el);
        var parent,seconds,intervalID,currentSeconds,currentobj;
        parent = document.querySelector('[data-currenttimer="' + el.id + '"]')
        currentobj=TimeCtrl.returnCurrentTime(el.id);
        currentSeconds= currentobj.time;
        seconds = 0;

        intervalID = setInterval(() => {
            var timeHours,timeMinutes,timeSeconds,timeHoursMinutes;
            timeHours=Math.floor(currentSeconds / 3600);    
            timeMinutes=Math.floor((currentSeconds - (timeHours * 3600)) / 60);
            timeSeconds=currentSeconds - (timeHours * 3600) - (timeMinutes * 60);
    
            if (timeHours   < 10) {timeHours   = "0"+timeHours;}
            if (timeMinutes < 10) {timeMinutes = "0"+timeMinutes;}
            if (timeSeconds < 10) {timeSeconds = "0"+timeSeconds;}
    
            timeHoursMinutes=timeHours+' : '+timeMinutes+' : '+timeSeconds;
            currentSeconds++
            parent.textContent = timeHoursMinutes;
            TimeCtrl.updateObjTime(el.id, currentSeconds);
        }, 1000)
        parent.setAttribute('timer-id', intervalID);
    };



    return {
        init: () => {
            console.log('app started');
            setupEventListeners();
            setupUniversalListeners();
        }
    }
})(timeController, UiController);
controller.init();


//swatches background: linear-gradient(90deg, #efd5ff 0%, #515ada 100%);
