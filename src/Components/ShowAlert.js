import {React} from 'react';
import { Alert } from 'react-bootstrap';
import { motion } from "framer-motion"

 // alert animation
 const variants = {
    open: { opacity: 1, y: 0},
    closed: { opacity: 0, y:"-100%"},
  }
  
function ShowAlert({alertState}){
    console.log(`Alert triggered ${alertState}`);
    <>
    
    <motion.div animate={alertState ? "open" : "closed"} variants={variants}>
        <Alert key={'warning'} variant={'warning'}>
            Please add a subject for your task 
        </Alert>
    </motion.div>
    </>
}

export default ShowAlert;