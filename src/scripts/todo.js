import {configureAddProjectButton, renderProjects, configureNavButton} from "./dom/projects";
import {loadStoredProjects} from "./tasks";
import {initializeAllFilters, viewDefault} from "./dom/filters";

loadStoredProjects()
renderProjects()
configureAddProjectButton()
configureNavButton()
initializeAllFilters()
viewDefault()