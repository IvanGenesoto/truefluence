const { createStore, combineReducers } = require('redux');

const defaultBotStatus = {
  egon: false,
  ray: false,
  peter: false,
  winston: false,
  janine: false,
  gozer: false
}

const botStatus = (state = defaultBotStatus, action) => {
  switch (action.type) {
    case 'EGON_READY':
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
    case 'GOZER_READY':
      return;
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
      state.tasks = true;
      return state;
    case 'PROFILES_AVAILABLE':
      console.log('omg, profiles available!');
      state.profiles = true;
      return state;
    default:
      return state;
  }
}
const reducer = combineReducers({
  botStatus,
  taskPipeline
});

const controller = createStore(reducer);

module.exports = controller;