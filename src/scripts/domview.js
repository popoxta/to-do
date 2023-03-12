import {removeFilterSelector} from "./filters";
import {
    allProjects,
    getCurrentTasks,
    getSelectedFilter,
    getSelectedProject,
    newProject,
    setCurrentTasks,
    setSelectedProject,
    Task
} from "./tasks.js";
import {format, formatISO} from "date-fns";

export {renderProjects, configureAddProjectButton, renderContainer}

const todoContainer = document.querySelector(".todo")

function renderProjects() {
    const projectsArray = Object.keys(allProjects).map(project => {

        const projectItem = document.createElement('h3')
        projectItem.textContent = project

        if (project === getSelectedProject()) {
            projectItem.className = 'selected'
        }

        projectItem.addEventListener('click', () => {
            removeFilterSelector()
            setSelectedProject(project)
            setCurrentTasks(()=> allProjects[project])
            console.log(`now displaying .... ${project}`)

            renderProjects()
            renderContainer()
        })

        return projectItem
    })

    document.querySelector('.project-items').replaceChildren(...projectsArray)
}

function buildTaskElement(task) {

    const taskContainer = document.createElement('div')
    taskContainer.className = 'task-container'

    const taskDiv = document.createElement('div')
    taskDiv.className = 'task'

    const taskInfoFirstDiv = document.createElement('div')
    const checkBox = document.createElement('div')
    checkBox.className = 'check-box'
    if (task.done) checkBox.classList.add('done')


    const taskTitle = document.createElement('h4')
    taskTitle.textContent = task.name
    if (task.important) taskTitle.classList.add('important-task')
    taskInfoFirstDiv.append(checkBox, taskTitle)

    const taskInfoSecondDiv = document.createElement('div')
    const taskDue = document.createElement('p')

    taskDue.textContent = task.date ? `due ${format(task.date, 'eee do LLL y')}` : ''

    const taskEdit = document.createElement('button')
    taskEdit.className = 'edit-btn'
    taskEdit.textContent = 'edit'
    taskInfoSecondDiv.append(taskDue, taskEdit)

    const taskInfo = document.createElement('div')
    taskInfo.className = 'task-info'
    taskInfo.textContent = task.description
    const taskDescription = document.createElement('p')
    const taskDelete = document.createElement('button')
    taskDelete.className = 'delete-btn'
    taskDelete.textContent = 'delete'
    taskInfo.append(taskDescription, taskDelete)

    taskDiv.append(taskInfoFirstDiv, taskInfoSecondDiv)

    taskContainer.append(taskDiv, taskInfo)


    checkBox.addEventListener('click', () => {
        task.done = !task.done
        renderContainer()
    })

    taskEdit.addEventListener('click', () => renderTaskForm(task))

    taskDelete.addEventListener('click', () => deleteTask(task))

    return taskContainer
}

function deleteTask(task) {
    if (!confirm(`Are you sure you would like to delete ${task.name}?`)) return
    for (let project of Object.keys(allProjects)) {
        let index = allProjects[project].indexOf(task)

        if (index !== -1) {
            allProjects[project].splice(index, 1)
            console.log(allProjects[project])
            break
        }
    }
    renderContainer()
}

function renderContainer() {

    const contentArray = getCurrentTasks().map(buildTaskElement)

    contentArray.unshift(renderProjectHeader())

    todoContainer.replaceChildren(...contentArray)
}

function renderProjectHeader() {
    const container = document.createElement('div')

    const projectTitle = document.createElement('h2')

    if (getSelectedProject() !== '') {
    projectTitle.textContent = getSelectedProject()

        const addTask = document.createElement('button')
        addTask.textContent = 'add task'
        addTask.addEventListener('click', () => {
            renderTaskForm()
        })

        projectTitle.append(addTask)
    } else {
        projectTitle.textContent = getSelectedFilter()
    }

    container.append(projectTitle)

    return container
}

function renderTaskForm(task) {
    // cleans up prev form if existent
    const prevForm = document.querySelector('.form-body')
    if (prevForm) todoContainer.removeChild(prevForm)

    const taskForm = document.createElement('div')
    taskForm.className = 'form-body'

    const formHead = document.createElement('div')
    formHead.className = 'form-head'

    const formHeader = document.createElement('h4')
    formHeader.textContent = 'new task'

    formHead.appendChild(formHeader)

    const form = document.createElement('form')

    const taskNameLabel = document.createElement('label')
    taskNameLabel.htmlFor = 'taskName'
    taskNameLabel.textContent = 'name'
    const taskName = document.createElement('input')
    taskName.type = 'text'
    taskName.id = 'taskName'
    taskName.name = 'taskName'
    taskName.placeholder = 'name'

    const descriptionLabel = document.createElement('label')
    descriptionLabel.htmlFor = 'description'
    descriptionLabel.textContent = 'description'
    const description = document.createElement('textarea')
    description.id = 'description'
    description.name = 'description'
    description.placeholder = 'description'

    const dueDateLabel = document.createElement('label')
    dueDateLabel.htmlFor = 'dueDate'
    dueDateLabel.textContent = 'due date'
    const dueDate = document.createElement('input')
    dueDate.type = 'date'
    dueDate.id = 'dueDate'
    dueDate.name = 'dueDate'

    const importantLabel = document.createElement('label')
    importantLabel.htmlFor = 'important'
    importantLabel.className = 'center'
    importantLabel.textContent = 'mark important'
    const important = document.createElement('input')
    important.type = 'checkbox'
    important.id = 'important'
    important.name = 'important'
    importantLabel.appendChild(important)

    const submitButton = document.createElement('button')
    submitButton.textContent = 'add'
    submitButton.type = 'submit'

    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'cancel'
    cancelButton.addEventListener('click', () => todoContainer.removeChild(taskForm))

    if (task) { // if task is passed as argument ( e.g. edit )
        formHeader.textContent = 'edit task'
        submitButton.textContent = 'confirm'

        taskName.value = task.name
        description.value = task.description
        dueDate.value = !(task.date) ? null : formatISO(task.date, { representation: 'date' })
        important.checked = task.important

        taskForm.addEventListener('submit', e => {
            editTask(e, task)
            renderContainer()
        })
    } else {
        taskForm.addEventListener('submit', e => {
            addTask(e)
            renderContainer()
        })
    }

    form.append(taskNameLabel, taskName, descriptionLabel, description, dueDateLabel, dueDate, importantLabel,
        submitButton, cancelButton)
    taskForm.append(formHead, form)

    todoContainer.appendChild(taskForm)
}

function editTask(e, task) {
    e.preventDefault()
    const formData = new FormData(e.target)
    task.name = formData.get('taskName')
    task.description = formData.get('description')
    task.date = !formData.get('dueDate') ? null : new Date(formData.get('dueDate').toString())
    task.important = formData.get('important') === "on"
}

function addTask(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const task = new Task(
        formData.get('taskName'),
        formData.get('description'),
        !formData.get('dueDate') ? null : new Date(formData.get('dueDate').toString()),
        formData.get('important') === "on"
    )
    allProjects[getSelectedProject()].push(task)
}

function configureAddProjectButton() {
    const addProjectButton = document.querySelector('.add-project')
    addProjectButton.addEventListener('click', () => renderProjectForm())
}

function renderProjectForm() {
    const projectForm = document.createElement('div')
    projectForm.className = 'form-body'

    const formHead = document.createElement('div')
    formHead.className = 'form-head'

    const formHeader = document.createElement('h4')
    formHeader.textContent = 'new project'

    formHead.appendChild(formHeader)

    const form = document.createElement('form')

    const projectNameLabel = document.createElement('label')
    projectNameLabel.htmlFor = 'projectName'
    projectNameLabel.textContent = 'project name'
    const projectName = document.createElement('input')
    projectName.type = 'text'
    projectName.id = 'projectName'
    projectName.name = 'projectName'
    projectName.required = true

    const submitButton = document.createElement('button')
    submitButton.textContent = 'add'
    submitButton.type = 'submit'

    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'cancel'

    function removeForm() {
        todoContainer.removeChild(projectForm)
    }

    cancelButton.addEventListener('click', removeForm)

    projectName.addEventListener('input', (e) => {
        if (projectName.value in allProjects) {
            projectName.setCustomValidity('Project name already exists')
        } else {
            projectName.setCustomValidity('')
        }
    })

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        newProject(formData.get('projectName'))
        renderProjects()
        removeForm()
    })

    form.append(projectNameLabel, projectName, submitButton, cancelButton)
    projectForm.append(formHead, form)

    todoContainer.appendChild(projectForm)
}