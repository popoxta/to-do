import {configureAddProjectButton, renderProjects} from "./dom/projects";
import {getAllTasks, loadStoredProjects} from "./tasks";
import {initializeAllFilters, selectTaskFilter} from "./dom/filters";

loadStoredProjects()
renderProjects()
configureAddProjectButton()
initializeAllFilters()
selectTaskFilter(document.querySelector('.all'), ()=> getAllTasks(), 'all tasks')
