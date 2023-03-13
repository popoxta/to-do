export {renderProjects, configureAddProjectButton, renderProjectHeader, configureNavButton}

import {removeFilterSelector, selectTaskFilter, viewDefault} from "./filters";
import {renderContainer, renderTaskForm} from "./tasks";
import {
    allProjects,
    updateLocalStorage,
    getSelectedFilter,
    getSelectedProject,
    newProject,
    setCurrentTasks,
    setSelectedProject, getAllTasks
} from "../tasks";

const todoContainer = document.querySelector(".todo")


function renderProjects() {
    const projectsArray = Object.keys(allProjects).map(project => {

        const projectItem = document.createElement('h3')
        projectItem.textContent = project

        if (project === getSelectedProject()) projectItem.className = 'selected'

        const deleteButton = document.createElement('button')
        deleteButton.textContent = ''
        projectItem.appendChild(deleteButton)

        deleteButton.addEventListener('click', e => deleteProject(project, e))
        projectItem.addEventListener('click', () => openProject(project))
        return projectItem
    })
    document.querySelector('.project-items').replaceChildren(...projectsArray)
}

function renderProjectHeader() {
    const projectTitle = document.createElement('h2')

    if (getSelectedProject() !== '') {
    projectTitle.textContent = getSelectedProject()

        const addTask = document.createElement('button')
        addTask.addEventListener('click', () => {
            renderTaskForm()
        })
        projectTitle.append(addTask)

    } else {
        projectTitle.textContent = getSelectedFilter()
    }

    const container = document.createElement('div')
    container.append(projectTitle)
    return container
}

function configureNavButton() {
    const navButton = document.querySelector('.nav-button')
    const sidebar = document.querySelector('.sidebar')
    navButton.addEventListener('click', () => {
        sidebar.classList.contains('width-zero')
            ? sidebar.classList.remove('width-zero')
            : sidebar.classList.add('width-zero')
    })
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
    projectName.maxLength = 10
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

    projectName.addEventListener('input', () => {
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
        updateLocalStorage()
    })

    form.append(projectNameLabel, projectName, submitButton, cancelButton)
    projectForm.append(formHead, form)

    todoContainer.appendChild(projectForm)
}

function deleteProject(project, e){
    e.stopPropagation()
    if (!confirm(`Are you sure you would like to delete ${project}?`)) return

    delete allProjects[project]

    if(project === getSelectedProject()){
        viewDefault()
    } else {
        renderProjects()
        renderContainer()
    }
    updateLocalStorage()
}

function openProject(project){
    removeFilterSelector()
    setSelectedProject(project)
    setCurrentTasks(()=> allProjects[project])

    renderProjects()
    renderContainer()
}