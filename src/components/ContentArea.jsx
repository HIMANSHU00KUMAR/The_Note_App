import React, { useState } from 'react'
import { IoMdAddCircle } from "react-icons/io";

const ContentArea = (props) => {

  const [isExpanded, setIsExpanded] = useState(false);

    const [noteData, setnoteData] = useState({
        title: '',
        content: ''
    });


    const handleTitleClick = () => {
      setIsExpanded(true);
    };
   

    const handleChange = (event) => {
        const { name, value } = event.target;
        setnoteData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleAdd=()=>{
        if (noteData.title.trim() !== '' && noteData.content.trim() !== ''){
            props.onAdd(noteData);
            setnoteData({
                title:'',
                content:''
            })
        }    
    }


  return (
    <div>
      <form className="create-note" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={noteData.title}
          onClick={handleTitleClick}
        />
        {isExpanded && (
          <>
        <textarea
          name="content"
          placeholder="Take a note..."
          onChange={handleChange}
          value={noteData.content}
          rows="3"
        />
        <button onClick={handleAdd}><IoMdAddCircle size={32}/></button>
        </>
        )}
      </form>
    </div>
  )
}

export default ContentArea;
