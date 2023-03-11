export {allProjects, newProject, Task, }
let allProjects = {}


class Task {
    constructor(name, description, date=null, important=false, done=false) {
        this.name = name
        this.description = description
        this.date = date
        this.important = important
        this.done = done
    }
}

function newProject(projectName){
    if (projectName in allProjects) return
    allProjects[projectName] = []
}

