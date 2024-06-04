import React, { useState } from 'react'
import './Dropdown.css'
import EditWorkspace from './EditWorkspace'

const DropdownWorkspace = () => {
  const [editForm, setEditForm]=useState(false);
  const onClose = () => {
    setEditForm(false);
  };
  return (
    <div>
        <ul className='workspace-list'>
            <li><button className='workspace-btn' 
            onClick={()=> setEditForm(true)}
            >Edit Workspace</button></li>
            <li><button className='workspace-btn'>Delete Workspace</button></li>
        </ul>
        { editForm && (
        <div className="popup-modal">
          <div className="popup-form-container">
            <EditWorkspace onClose={onClose} />
          </div>
          <div className="popup-backdrop" onClick={onClose} />
        </div>
      )}
    </div>
  )
}

export default DropdownWorkspace