export {
    allProjects,
    newProject,
    Task,
    getAllTasks,
    getCurrentTasks,
    setCurrentTasks,
    getSelectedProject,
    setSelectedProject,
    getSelectedFilter,
    setSelectedFilter
};

let allProjects = {}

class Task {
    constructor(name, description, date = null, important = false, done = false) {
        this.name = name
        this.description = description
        this.date = date
        this.important = important
        this.done = done
    }
}

function newProject(projectName) {
    if (projectName in allProjects) return
    allProjects[projectName] = []
}

let selectedProject = ""
const setSelectedProject = project => selectedProject = project
const getSelectedProject = () => selectedProject
let currentTasks = () => {}
const setCurrentTasks = task => currentTasks = task
const getCurrentTasks = () => currentTasks()
let selectedFilter = ""
const setSelectedFilter = filter => selectedFilter = filter
const getSelectedFilter = () => selectedFilter

function getAllTasks() {
    let allTasks = []

    for (let key of Object.keys(allProjects)) {
        allProjects[key].forEach(task => {
            allTasks.push(task)
        })
    }
    return allTasks
}