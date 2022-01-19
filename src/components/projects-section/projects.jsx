import { useContext, useState  } from "react"
import ReactModal from "react-modal"
import { useFormik } from "formik"
import { dispatchContext, StateContext } from "../../App"
import { ProjectItem } from "../project-item/project-item"

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
    if(!values.name) {
        errors.name = 'Required'
    }
    if(!values.description){
        errors.description = 'Required'
    }
    return errors;
}
export const Projects = ({ currentProjectId, setCurrentProject }) => {
    const state = useContext(StateContext)
    const dispatch = useContext(dispatchContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleNewProject = (values) => {
        dispatch({type: "ADD_PROJECT", payload: {...values}})
        handleCloseModal();
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validate,
        onSubmit: handleNewProject
    })

    const handleCloseModal = () => {
        setIsModalOpen(false)
        formik.resetForm();
    }

    
    return (
        <div className="projects-container">
            <div className="header">
                <h1>Projects</h1>
                <button className="primary-btn btn" onClick={handleOpenModal}>+ New Project</button>
                <ReactModal isOpen={isModalOpen}
                    style={customStyles}
                    shouldCloseOnOverlayClick={true}
                    ariaHideApp={false}>
                    <div style={{textAlign: 'center', fontWeight: 'var(--weight-bold)'}}>Enter details of new project</div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <div className="label-with-error">
                                <label htmlFor="project-name">Name:</label>
                                {formik.errors.name ? <div className="error">{formik.errors.name}</div> : ''}
                            </div>
                            <input type="text" id="project-name" name="name" placeholder="Project Name" onChange={formik.handleChange}
         value={formik.values.name}/>
                        </div>
                        <div className="form-group">
                            <div className="label-with-error">
                                <label htmlFor="project-description">Description:</label>
                                {formik.errors.description ? <div className="error">{formik.errors.description}</div> : ''}
                            </div>
                            <textarea id="project-description" name="description" placeholder="Project Description" onChange={formik.handleChange}
         value={formik.values.description}></textarea>
                        </div>
                        <div className="form-group" style={{flexDirection: 'row'}}>
                            <button type="submit" className="btn primary-btn">+ save</button>
                            <button className="btn secondary-btn" onClick={handleCloseModal}>&times; close</button>
                        </div>
                    </form>
                </ReactModal>
            </div>
            {
                state && state.projects.length > 0 ?  state.projects.map((project, idx) => (
                    <ProjectItem key={idx} project={project} currentProjectId={currentProjectId} setCurrentProject={setCurrentProject}/>
                )) : <div style={{textAlign: 'center', padding: '40px'}}>Such Empty! No projects available!</div>
            }
        </div>
    )
}