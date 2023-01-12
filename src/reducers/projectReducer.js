const actions = {
    ADD_PROJECT: "ADD_PROJECT",
    DELETE_PROJECT: "DELETE_PROJECT",
    ADD_TASK: "ADD_TASK",
    UPDATE_TASK: "UPDATE_TASK",
    DELETE_TASK: "DELETE_TASK"
}

export const projectReducer = (draft, { type, payload }) => {
    switch (type) {
        case actions.ADD_PROJECT:
            let newProj = {
                id: "pr-" + parseInt(draft.projects.length + 1),
                name: payload.name,
                description: payload.description,
                tasklist: []
            }
            draft.projects.push(newProj)
            return;
        case actions.ADD_TASK:
            {
                let newTask = {
                    id: 'tsk-' + parseInt(draft.totalTasks + 1),
                    title: payload.title,
                    description: payload.description,
                    project: payload.projectId,
                    status: 0
                }
                draft.totalTasks += 1;
                let currentProject = draft.projects.find(project => project.id === payload.projectId)
                currentProject.tasklist.push(newTask)
                return;
            }
        case actions.UPDATE_TASK:
            {
                let currentProject = draft.projects.find(project => project.id === payload.projectId)
                let currTask = currentProject.tasklist.find(task => task.id === payload.taskId)
                currTask.status = payload.status
                return;
            }
        case actions.DELETE_PROJECT:
            {
                let currentProject = draft.projects.find(project => project.id === payload.projectId)
                draft.totalTasks -= currentProject.tasklist.length
                draft.projects = draft.projects.filter(project => project.id !== payload.projectId)
                return;
            }
        case actions.DELETE_TASK:
            {
                let currentProject = draft.projects.find(project => project.id === payload.projectId)
                draft.totalTasks -= 1
                currentProject.tasklist = currentProject.tasklist.filter(task => task.id !== payload.taskId)
                return;
            }
        default:
            return draft
    }
}