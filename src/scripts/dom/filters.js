export {selectTaskFilter, initializeAllFilters, removeFilterSelector, viewDefault}

import {getAllTasks, setCurrentTasks, setSelectedFilter, setSelectedProject} from "../tasks";
import {renderContainer} from "./tasks";
import {isThisWeek, isToday} from "date-fns";
import {renderProjects} from "./projects";

const allFilter = document.querySelector('.all')

function initializeAllFilters() {

    initializeFilter('.all', ()=> getAllTasks(), 'all tasks')
    initializeFilter('.today', () => getAllTasks().filter((task) => isToday(task.date)), 'today')
    initializeFilter('.week', () => getAllTasks().filter((task) => isThisWeek(task.date)), 'this week')
    initializeFilter('.important', () => getAllTasks().filter((task) => task.important), 'important')
    initializeFilter('.completed', () => getAllTasks().filter((task)=> task.done), 'completed')
}

function initializeFilter(selector, filterFunc, header){
    document.querySelector(selector).addEventListener('click', e => {
        selectTaskFilter(e.target, filterFunc, header)
    })
}

function selectTaskFilter(filterElement, tasks, header) {
    setSelectedProject('')
    setSelectedFilter(header)
    setCurrentTasks(tasks)

    removeFilterSelector()
    filterElement.className = 'selected'

    renderProjects()
    renderContainer()
}

function removeFilterSelector() {
    const filterElements = document.querySelector('.home-items').children
    for (let element of filterElements) {
        element.classList.remove('selected')
    }
}

function viewDefault(){
    selectTaskFilter(allFilter, () => getAllTasks(), 'all tasks')
}