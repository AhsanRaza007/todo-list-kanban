import './App.css';
import { createContext, useState } from 'react';
import { projectReducer } from './reducers/projectReducer';
import { Projects } from './components/projects-section/projects';
import { useImmerReducer } from 'use-immer';
import { TasksList } from './components/tasks-section/tasks';

const initialState = {
  projects: [{
      id: 'pr-1',
      name: 'Your First Project',
      description: 'This is Your First Project. You can edit Tasks.',
      tasklist: [{
              id: 'tsk-1',
              title: 'task 1',
              project: 'pr-1',
              description: 'this is a task.',
              status: 0 // Open
          },
          {
              id: 'tsk-2',
              title: 'task 2',
              project: 'pr-1',
              description: 'this is a task.',
              status: 1 // In Progress
          },
          {
              id: 'tsk-3',
              title: 'task 3',
              project: 'pr-1',
              description: 'this is a task.',
              status: 2 // Completed
          }
    ]
  }],
  totalTasks: 3
}

export const StateContext = createContext()
export const dispatchContext = createContext()


function App() {
  const [state, dispatch] = useImmerReducer(projectReducer, initialState)
  const [currentProjectId, setCurrentProject] = useState(null);
  const updateProjectId = (projectId) =>{
    setCurrentProject(projectId)
  }
  return (
    <dispatchContext.Provider value={dispatch}>
       <StateContext.Provider value={state}>
        <div className="app">
          <Projects currentProjectId={currentProjectId} setCurrentProject={updateProjectId}></Projects>
          <TasksList currentProjectId={currentProjectId}></TasksList>
        </div>
      </StateContext.Provider>
    </dispatchContext.Provider>
  );
}

export default App;
