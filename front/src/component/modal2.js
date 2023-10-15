import React from "react";
import  ReactDOM  from "react-dom";
import '../css/loginPage.css';


export default function Modal2({isOpen, onClose,Message}){
    if(!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="modal-overlay">
        <div className="modalBox">
         <p>{Message}</p>
        </div>    
        </div>,
        document.body
        
    )
}