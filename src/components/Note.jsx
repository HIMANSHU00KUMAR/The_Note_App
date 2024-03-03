import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Note = (props) => {


  const [uptitle, setupTitle] = useState(props.title);
  const [upcontent, setupContent] = useState(props.content);
  const [isEditing, setIsEditing] = useState(false);



  const handleDelete = () => {
    props.onDelete(props.id);
  }

  const handleSave = () => {
    props.onUpdate(props.id, uptitle, upcontent);
    setIsEditing(false);
  }



  return (
    <div className='note'>

      {isEditing ? (
        <form className='update-note'>
          <input
            type="text"
            value={uptitle}
            onChange={(e) => setupTitle(e.target.value)}
          />
          <textarea
            value={upcontent}
            onChange={(e) => setupContent(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </form>
      ) : (
        <div>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={handleDelete}><MdDelete size={18}/></button>
          <button onClick={() => setIsEditing(true)}><FaEdit size={18} /></button>
        </div>

      )}
    </div>
  )
}

export default Note;
