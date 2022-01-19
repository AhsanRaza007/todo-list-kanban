import { useContext } from 'react'
import { dispatchContext } from '../../App'
import deleteImg from '../../assets/delete.svg'

export const ProjectItem = ({project, currentProjectId, setCurrentProject}) =>{
    const dispatch = useContext(dispatchContext)
    const handleDeleteProject = (projectId) => {
        dispatch({type: "DELETE_PROJECT", payload: {projectId}})
    }
    return (
        <div className={"project-item " + (currentProjectId === project.id ? 'selected-project' : '')} onClick={() => setCurrentProject(project.id)}>
            <div className="project-item-header">
                <div>{project.name}</div>
                <div>Total Tasks - {project.tasklist.length}</div>
            </div>
            <div className="descripion-delete-container">
                <div className="project-item-descripiton">{project.description}</div>
                <img className="delete-icon" onClick={()=> handleDeleteProject(project.id)} src={deleteImg} alt="delete-task" />
            </div>
        </div>
    )
}