import {configureAddProjectButton, renderProjects, configureNavButton} from "./dom/projects";
import {getAllTasks, loadStoredProjects} from "./tasks";
import {initializeAllFilters, selectTaskFilter} from "./dom/filters";

loadStoredProjects()
renderProjects()
configureAddProjectButton()
configureNavButton()
initializeAllFilters()
selectTaskFilter(document.querySelector('.all'), () => getAllTasks(), 'all tasks')

