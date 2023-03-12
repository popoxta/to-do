export {
    allProjects,
    updateLocalStorage,
    loadStoredProjects,
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

function updateLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(allProjects))
}

function loadStoredProjects() {
    let storedProjects = JSON.parse(localStorage.getItem('projects'))
    if (!storedProjects) {
        createDefaultProjects()
        updateLocalStorage()
    } else {
        for (let key of Object.keys(storedProjects)) {
            allProjects[key] = storedProjects[key].map(task => {
                return new Task(
                    task.name,
                    task.description,
                    task.date ? new Date(task.date) : null,
                    task.important,
                    task.done,
                )
            })
        }
    }
}

class Task {
    constructor(name, description, date = null, important = false, done = false) {
        this.name = name
        this.description = description
        this.date = date
        this.important = important
        this.done = done
    }
}

function getAllTasks() {
    let allTasks = []

    for (let key of Object.keys(allProjects)) {
        allProjects[key].forEach(task => {
            allTasks.push(task)
        })
    }
    return allTasks
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

function createDefaultProjects() {
    newProject('study')
    newProject('work')
    newProject('bunnies')

    const study1 = new Task('remove that negative energy', 'eat the bran', null, true)
    const study2 = new Task('make mistakes', 'fail faster, embrace the process', null, true)
    allProjects['study'].push(study1, study2)

    const work1 = new Task('work less play more', 'much better idea')
    const work2 = new Task('remove powerpoint', 'there is no power in these points')
    const work3 = new Task('streamline cranberry production', 'there is a strong requirement for further cranberry production', null, true)
    allProjects['work'].push(work1, work2, work3)

    const bunnies1 = new Task('pat some spuds', 'bunnies are wonderful little tater-tots', null, true)
    const bunnies2 = new Task('give him cranberries', 'and pat his nose, he is adorable')
    allProjects['bunnies'].push(bunnies1, bunnies2)
}
