const { createStore, combineReducers } = require('redux');
const ScrapeBot = require('./scrape-bot');
const TaskManager = require('./task-manager');
const taskManager = new TaskManager();

// bot declarations;
const egon = new ScrapeBot('EGON', 0);
const winston = new ScrapeBot('WINSTON', 1);
const ray = new ScrapeBot('RAY', 2);
const peter = new ScrapeBot('PETER', 3);

const defaultBotStatus = {
  egon: true,
  ray: true,
  peter: false,
  winston: false,
  janine: false
}

const botStatus = (state = defaultBotStatus, action) => {
  switch (action.type) {
    case 'EGON_READY':
      console.log('egon now ready');
      state.egon = true;
      return state;
    case 'RAY_READY':
      state.ray = true;
      return state;
    case 'PETER_READY':
      return;
    case 'WINSTON_READY':
      return;
    case 'JANINE_READY':
      state.janine = true;
      return state;
    case 'EGON_BUSY':
      console.log('egon now busy');
      state.egon = false;
      return state;
    default:
      return state;
  }
}

const defaultTaskPipeline = {
  tasks: false,
  profiles: false
}

const taskPipeline = (state = defaultTaskPipeline, action) => {
  switch (action.type) {
    case 'TASKS_AVAILABLE':
      console.log('omg, tasks availableee');
      // start task
      restartTaskManager();
      state.tasks = true;
      return state;
    case 'PROFILES_AVAILABLE':
      console.log('omg, profiles available!');
      // start harvesters
      restartIdleBots();
      state.profiles = true;
      return state;
    default:
      return state;
  }
}

const restartTaskManager = () => {
  console.log('restarting, TaskManager:', taskManager);
  if (taskManager.ready) {
    taskManager.startTasks()
      .then(result => {
        restartIdleBots();
      })
  }
}

const restartIdleBots = () => {
  if (egon.ready) {
    egon.startScrape();
  }
  if (winston.ready) {
    winston.startScrape();
  }
  if (ray.ready) {
    ray.startScrape();
  }
  if (peter.ready) {
    peter.startScrape();
  }
}

const reducer = combineReducers({
  botStatus,
  taskPipeline
});

const controller = createStore(reducer);

module.exports = { controller: controller, restartIdleBots: restartIdleBots };