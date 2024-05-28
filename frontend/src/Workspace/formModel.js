import React from 'react'
import "./Workspace.css";
import CloseIcon from '@mui/icons-material/Close';

const formModel = () => {
  return (
    <div className="ModelBox">
       <button> <CloseIcon /></button>
       <div>
        <div className="ModelBox2">
            <h3>Name your workspace</h3>
            <form>
                <input type='text' placeholder='Enter Workspace Name' />
                <button type='submit'>Submit</button>
            </form>
        </div>
       </div>
    
    </div>
  )
}

export default formModel