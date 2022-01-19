import { StateContext, dispatchContext } from "../../App"
import { useContext, useState } from "react";
import ReactModal from "react-modal";
import { useFormik } from "formik";
import Select from 'react-select'
import { Card } from "../card/Card";
import  Board from "@asseinfo/react-kanban";
import '@asseinfo/react-kanban/dist/styles.css'
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginTop: '-10%',
      minWidth: '450px',
      minHeight: '150px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const validate = values => {
    const errors = {};
    if(!values.title) {
        errors.title = 'Required'
    }
    if(!values.description){
        errors.description = 'Required'
    }
    if(!values.projectId){
        errors.description = 'Required'
    }
    return errors;
}
export const TasksList = ({ currentProjectId })=> {
    const state = useContext(StateContext)
    const dispatch = useContext(dispatchContext)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const projectList = state.projects.map(project => {
        return {
            value: project.id,
            label: project.name
        }
    })
    const currentProject = state.projects.find(project => project.id === currentProjectId);
    const tasksInProject = currentProject && currentProject.tasklist

    const kanbanBoard = {
        columns: [
          {
            id: 0,
            title: 'Open',
            cards: tasksInProject ? tasksInProject.filter(task => task.status === 0) : []
          },
          {
            id: 1,
            title: 'In Progress',
            cards: tasksInProject ? tasksInProject.filter(task => task.status === 1) : []
          },
          {
              id: 2,
              title: 'Completed',
              cards: tasksInProject ? tasksInProject.filter(task => task.status === 2) : []
          }
        ]
    }
    const handleOpenModal = () => {
        setIsModalOpen(true)
    }
    const handleNewTask = (values)=> {
        dispatch({type: "ADD_TASK", payload: {...values}})
        handleCloseModal();
    }
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            projectId: ''
        },
        validate,
        onSubmit: handleNewTask
    })
    const handleCloseModal = () => {
        setIsModalOpen(false)
        formik.resetForm();
    }

    const dragCard = (card, source, destination) => {
        dispatch({type: "UPDATE_TASK", payload: {taskId: card.id, projectId: card.project, status: destination.toColumnId}})
    }

    return (
        <div className="projects-container" style={{width: '70%'}}>
            <div className="header">
                <h1>Tasks in selected  project </h1>
                <button className="primary-btn btn" disabled={state.projects && state.projects.length <= 0} onClick={handleOpenModal}>+ New Task</button>
                <ReactModal isOpen={isModalOpen}
                    style={customStyles}
                    shouldCloseOnOverlayClick={true}
                    ariaHideApp={false}>
                    <div style={{textAlign: 'center', fontWeight: 'var(--weight-bold)'}}>Enter details of new task</div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <div className="label-with-error">
                                <label htmlFor="task-title">Title</label>
                                {formik.errors.title ? <div className="error">{formik.errors.title}</div> : ''}
                            </div>
                            <input type="text" id="title" name="title" placeholder="Task Title" onChange={formik.handleChange} value={formik.values.title}/>
                        </div>
                        <div className="form-group">
                            <div className="label-with-error">
                                <label htmlFor="task-description">Description:</label>
                                {formik.errors.description ? <div className="error">{formik.errors.description}</div> : ''}
                            </div>
                            <textarea id="task-description" name="description" placeholder="Task Description" onChange={formik.handleChange}
                                value={formik.values.description}></textarea>
                        </div>
                        <div className="form-group">
                        <div className="label-with-error">
                                <label htmlFor="projectId">Select Project:</label>
                                {formik.errors.projectId ? <div className="error">{formik.errors.projectId}</div> : ''}
                            </div>
                            <Select classNamePrefix="react-select" menuPortalTarget={document.body} options={projectList} onChange={option => formik.setFieldValue('projectId', option.value, true)} name="projectId"></Select>
                        </div>
                        <div className="form-group" style={{flexDirection: 'row'}}>
                            <button type="submit" className="btn primary-btn">+ save</button>
                            <button className="btn secondary-btn" onClick={handleCloseModal}>&times; close</button>
                        </div>
                    </form>
                </ReactModal>
            </div>
            {
                // renderCard={(card, { removeCard, dragging })=> <Card content={card} dragging={dragging} />}
                tasksInProject && tasksInProject.length > 0 ? 
                <Board disableColumnDrag={true} onCardDragEnd={dragCard} renderCard={(card, { removeCard, dragging })=> <Card key={card.id} content={card} dragging={dragging} />}>
                    {kanbanBoard}
                </Board> : <div style={{textAlign: 'center', padding: '40px'}}>No Tasks Available!!</div>
            }
    </div>
    )
}