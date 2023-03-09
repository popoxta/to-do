export {allProjects, Project, Task}
let allProjects = {}
class Project {
    constructor(name) {
        this.name = name
        this.tasks = []
    }

    addTask(task){
        this.tasks.push(task)
    }
    removeTask(name){
        const index = this.tasks.findIndex((item) => item === name)
        if (index >=0){
            this.tasks.splice(index, 1)
            return `Successfully deleted ${name.name}`
        }
    }

    addToMaster(project){
        allProjects[project.name] = project.tasks
    }

}

class Task {
    constructor(name, description, date="none", important=false, done=false) {
        this.name = name
        this.description = description
        this.date = date
        this.important = important
        this.done = done
    }
    setValue(propertyString, val){
        this[propertyString] = val
    }

}
