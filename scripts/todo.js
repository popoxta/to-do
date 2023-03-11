import {allProjects, newProject, Task} from "./tasks.js";
import {configureAddProjectButton, renderProjects, initializeFilters} from "./domview.js";
export {setSelectedFilter, getSelectedFilter, setSelectedProject, getSelectedProject, setCurrentTasks, getCurrentTasks, getAllTasks}

let selectedProject = ""

const setSelectedProject = project => selectedProject = project
const getSelectedProject = () => selectedProject

let currentTasks = []

const setCurrentTasks = task => currentTasks = task
const getCurrentTasks = () => currentTasks

let selectedFilter = ""

const setSelectedFilter = filter => selectedFilter = filter
const getSelectedFilter = () => selectedFilter

newProject('garbage')
newProject('garbage1')
newProject('garbage2')

const brekky = new Task('eat brekky', 'eat brekky at a reasonable time')
const lunch = new Task('eat lunch', 'eat lunch at a reasonable time', '12pm', true, true)
const dinner = new Task('eat dinner', 'eat dinner at a reasonable time')
const brekky2 = new Task('eat brekky2', 'eat brekky at a reasonable time')
const lunch2 = new Task('eat lunch2', 'eat lunch at a reasonable time')
const lunch3 = new Task('eat lunch2', 'eat lunch at a reasonable time')
const dinner2 = new Task('eat dinner2', 'eat dinner at a reasonable time')

allProjects['garbage'].push(brekky, lunch, dinner)
allProjects['garbage2'].push(brekky2, lunch2, dinner2, lunch3)

renderProjects()
configureAddProjectButton()
initializeFilters()
function getAllTasks() {
    let allTasks = []

    for (let key of Object.keys(allProjects)) {
        allProjects[key].forEach(task => {
            allTasks.push(task)
        })
    }

    return allTasks
}

// const brekky = new Task('eat brekky', 'eat brekky at a reasonable time')
// const lunch = new Task('eat lunch', 'eat lunch at a reasonable time')
// const dinner = new Task('eat dinner', 'eat dinner at a reasonable time')
// allProjects['garbage'].push(brekky, lunch, dinner)
// dinner.important = true
// console.log(allProjects)


// reRenderAllTasks(getAllTasks(allProjects))

// renderProjectForm()
// renderForm()