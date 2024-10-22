import React, { useState } from 'react';

import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap' 
import { FaTrashCan } from "react-icons/fa6";
import '../Styles/ToDoList.css'
import { motion } from "framer-motion"
function ToDoItem({task, handleDelete, handleComplete, animations, animationType}) {

    // handle checkbox change 
    const handleChange = () => {
        console.log(`I checked ${task.info.subject}, ${task.info.completed}`)
        handleComplete(task.id);
    }

    console.log(animations[animationType])
    return (
        <>
        <Container>
            <Row>
            <Col sm={4}></Col>
            <Col sm={4}>
                <ListGroup className="task-group">
                    <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={animations[animationType]}
                    transition={{ ease: "easeOut", duration: 0.6 }}>
                        <ListGroup.Item
                            as="li"
                            className="d-flex task-item"
                            id={task.id}
                        >
                        
                        <div className='me-1 checkbox-holder align-items-center justify-content-center text-center'>
                        <Form.Check 
                        className="checkbox" 
                        type={"checkbox"} 
                        checked={task.info.completed} 
                        onChange={handleChange}/>
                        </div>
                        {
                            task.info.completed ? 
                            <div className='ms-2 me-auto task-sub task-name'> 
                                {task.info.subject} 
                            </div> 
                            : 
                            <div className='ms-2 me-auto task-sub'> 
                                {task.info.subject} 
                            </div>
                        }
                        <motion.div whileHover={{ scale: 1.3 }} onHoverStart={e => {}} onHoverEnd={e => {}} whileTap={{ scale: 0.8 }}>
                        <Button className="btn-style" id="trash-icon" onClick={() => handleDelete(task.id) }><FaTrashCan className="gen-icon" style={{color: "#FFD43B"}}/></Button>
                        </motion.div>
                        </ListGroup.Item> 
                    </motion.div>  
                </ListGroup>
            </Col>
            
            <Col sm={4}></Col>
            </Row>
        </Container>

        </>
    )

    
}

export default ToDoItem;