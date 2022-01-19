import { useContext } from 'react'
import { dispatchContext } from '../../App'
import deleteImg from '../../assets/delete.svg'

export const Card = ({content, dragging}) => {

    const dispatch = useContext(dispatchContext)
    const deleteTask = () => {
        dispatch({type: "DELETE_TASK", payload: {taskId: content.id, projectId: content.project}})
    }
    const colors = [
        'var(--secondary-red)',
        'var(--primary-yellow)',
        'var(--secondary-green)',
    ]

    return (
        <div className="kanban-card" style={{backgroundColor: colors[content.status]} }>
            <div className="card-header">
                <div className="card-title">{content.title}</div>
                <img src={deleteImg} className='delete-icon' onClick={deleteTask} alt="delete-task" />
            </div>
            <div className="card-description">
                {content.description}
            </div>
        </div>
    )
}