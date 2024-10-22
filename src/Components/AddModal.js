import {React, useState, useEffect} from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import ShowAlert from './ShowAlert'

function AddModal({show, handleClose, handleAdd}) {
  // handle task information
  const [taskName, setTaskName] = useState('');
  const [taskDetail, setTaskDetails] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
  // make sure alert is not showing
  setShowAlert(false);
  }, [show])

  // save task funciton 
  const onSave = () => {
    const newTask = {
    info: {
        subject: taskName,
        details: taskDetail,
        time: "",
        completed: false
    }
  }
  
  if(!newTask.info.subject.trim()){
    setShowAlert(true);
    return;
}
  
  // send the new task data to our task array
  handleAdd(newTask);

  // Make sure input values are clean 
  setTaskName('')
  setTaskDetails('')
  // close modal
  handleClose();
  

  }

  const handleKeyPress = (e) => {
   if (e.key === 'Enter'){
    e.preventDefault();
    onSave();
    
    document.getElementById("btn-add").blur();
   }

  }
  return (
    <>
      
      <ShowAlert alertState={showAlert}/>
      <Modal show={show} onHide={handleClose} className='main-modal'>
      <Modal.Header closeButton>
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={e => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="input"
              placeholder="Meal Prep Lunch"
              value={taskName}
              onKeyDown={handleKeyPress}
              onChange={e => setTaskName(e.target.value)}
              autoFocus
            />
          </Form.Group>
          {/* <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Details</Form.Label>
            <Form.Control as="textarea" 
            rows={3} 
            value={taskDetail} 
            onChange={e => setTaskDetails(e.target.value)}
            />
          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Add Task
        </Button>
      </Modal.Footer>
    </Modal>
    </>
   
  )
}

export default AddModal;