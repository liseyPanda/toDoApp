import React, { useState, useEffect } from 'react';
import ToDoItem from '../Components/ToDoItem'
import AddModal from '../Components/AddModal'
import { Container, Row, Col, Button, Alert } from 'react-bootstrap'
import { FaCircle, FaCirclePlus } from "react-icons/fa6"; 
import { motion } from "framer-motion"
import '../Styles/ToDoList.css'


function ToDoList(params) {

    // Setting up state of items in the todo list
    const [tasks, setTasks] = useState(loadToDoList());
    
    // handle state of modal show or close
    const [show, setShow] = useState(false);
    // handle animations 
    const [animationType, setAnimationType] = useState('addItem');
    // functions to setShow when user interacts with modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        saveToDoList(tasks);
    },[tasks]);

    function saveToDoList() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadToDoList() {
        const savedList = localStorage.getItem('tasks')
        return savedList ? JSON.parse(savedList) : [{
            id: 0,
            info: {
                subject: "Clean the living room",
                details: "I want to clean the living room before tomorrow because we have guests coming over",
                time: "need done by 5PM",
                completed: false
            }
        }];
    }
    
    // animation params
    const animations = {  
        addItem: {
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -100 },
        },
    }


    // handle adding items
    const handleAdd = (newTask) => {
        console.log(`successfully added your item ${newTask.info.subject}`)
        // we need to be able to have an input that takes the user's task text 
        //adds it to the list ()
        // modal needs to have the same structure as the payload we have above 
        setAnimationType('addItem');
        const updatedTasks = [...tasks, {...newTask, id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0}];
        setTasks(updatedTasks);
        
    }

    // handle deleting items
    const handleDelete = (id) => {
        console.log(`successfully deleted your item ${id}`)
        setAnimationType('deletedItem');
        console.log(animationType)
        const updatedTasks = tasks.filter(t => t.id !== id);
        setTasks(updatedTasks);
        
    }

    // handle completed item 
    const handleComplete = (id) => {
        const updatedTasks = (
            tasks.map(t => {
            return t.id === id ? {
              ...t, 
              info: {
                  ...t.info, 
                  completed: !t.info.completed
              }
          } : t;
          }))
        setTasks(updatedTasks);

    }

    return (
        <>
        <Container>
        <Row >
            <Col></Col>
            <Col><h1>To Do List</h1></Col>
            <Col></Col>
        </Row>
        <Row >
            <Col>
                <AddModal show={show} handleClose={handleClose} handleAdd={handleAdd}/>
                {tasks.map(task => (
                <ToDoItem 
                key={task.id}
                task={task}
                handleDelete={handleDelete}
                handleComplete={handleComplete}
                animations={animations}
                animationType={animationType}
                />
                ))}
            </Col>
        </Row>
        <Row>
            <Col></Col>
            <Col>
            <motion.div whileHover={{ scale: 1.3 }} onHoverStart={e => {}} onHoverEnd={e => {}} whileTap={{ scale: 0.8 }}>
                    <Button className="btn-style" id="btn-add" onClick={handleShow}><FaCirclePlus  style={{color: "#FFD43B",}} /></Button>
           </motion.div>
            </Col>
            <Col></Col>

        </Row>
        
        </Container>
        

        </>
    )  
}

export default ToDoList;