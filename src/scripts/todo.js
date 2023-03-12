import {configureAddProjectButton, renderProjects} from "./dom/projects";
import {getAllTasks} from "./tasks";
import {newProject, allProjects, Task} from "./tasks";
import {initializeFilters, selectTaskFilter} from "./dom/filters";

newProject('wuffle fluffle')
newProject('spoofle doofle')
newProject('snuggly wuggly')
newProject('foobar.')

const brekky = new Task('eat brekky', 'eat brekky at a reasonable time')
const lunch = new Task('eat lunch', 'eat lunch at a reasonable time', null, true, true)
const dinner = new Task('eat dinner', 'eat dinner at a reasonable time')
const brekky2 = new Task('eat brekky2', 'eat brekky at a reasonable time')
const lunch2 = new Task('eat lunch2', 'eat lunch at a reasonable time')
const lunch3 = new Task('eat lunch2', 'eat lunch at a reasonable time')
const dinner2 = new Task('eat dinner2', 'eat dinner at a reasonable time')

allProjects['snuggly wuggly'].push(brekky, lunch, dinner)
allProjects['wuffle fluffle'].push(brekky2, lunch2, dinner2, lunch3)

renderProjects()
configureAddProjectButton()
initializeFilters()
selectTaskFilter(document.querySelector('.all'), ()=> getAllTasks(), 'all tasks')
