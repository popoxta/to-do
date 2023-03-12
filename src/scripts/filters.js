export {selectTaskFilter, initializeFilters}

import {getAllTasks, setCurrentTasks, setSelectedFilter, setSelectedProject} from "./tasks";
import {isThisWeek, isToday} from "date-fns";
import {renderProjects, renderContainer} from "./domview";

function initializeFilters() {
    document.querySelector('.all').addEventListener('click', e => {
        selectTaskFilter(e.target, () => getAllTasks(), 'all tasks')
    })

    document.querySelector('.today').addEventListener('click', e => {
        selectTaskFilter(e.target, () => getAllTasks().filter((task) => isToday(task.date)), 'today')
    })

    document.querySelector('.week').addEventListener('click', e => {
        selectTaskFilter(e.target, () => getAllTasks().filter((task) => isThisWeek(task.date)), 'this week')
    })

    document.querySelector('.important').addEventListener('click', e => {
        selectTaskFilter(e.target, () => getAllTasks().filter((task) => task.important), 'important')
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

export function removeFilterSelector() {
    for (let element of document.querySelector('.home-items').children) {
        element.classList.remove('selected')
    }
}
