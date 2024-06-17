import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/NoteContext'

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const {note, updateNote} = props;

  // NEW-------------
  const [expanded, setExpanded] = useState(false);
  const handleDeleteClick = () => {
    deleteNote(note._id);
    props.showAlert("Deleted Successfully", "success");
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    // <div className='col-md-3'>
    //     <div className="card my-3">
    //         <div className="card-body">
    //             <h5 className="card-title">{note.title}</h5>
    //             <p className="card-text">{note.description}</p>
    //             <i className="fa-regular fa-trash-can" onClick={handleDeleteClick} ></i>
    //             <i className="fa-regular fa-pen-to-square" onClick={() => {updateNote(note)}} ></i>
    //         </div>
    //     </div>
    // </div>
    // NEW --------------------------

    <div className='col-md-4 mb-4'>
            <div className={`card ${expanded ? 'expanded-card' : ''}`} style={{ backgroundColor: '#fff9e6', border: '1px solid #ffc107', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}>
                <div className="card-header bg-transparent d-flex justify-content-end border-0">
                    <i className="fas fa-edit text-primary" style={{ cursor: 'pointer' }} onClick={() => updateNote(note)}></i>
                </div>
                <div className="card-body"
                    style={{ cursor: 'pointer', padding: '1.25rem', overflow: 'hidden', transition: 'padding 0.3s ease', maxHeight: expanded ? '100%' : '10rem' }}
                    onClick={toggleExpand}
                    onMouseEnter={() => setExpanded(true)}
                    onMouseLeave={() => setExpanded(false)}
                >
                    <h5 className="card-title" style={{ marginTop: '0', marginBottom: '1rem', whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'font-size 0.3s ease, max-height 0.3s ease', fontSize: expanded ? '1.5rem' : '1.2rem', maxHeight: expanded ? '100%' : '3.6rem', color: '#ffc107' }}>
                        {note.title}
                    </h5>
                    <p className="card-text" style={{ marginBottom: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: expanded ? 'unset' : '3', WebkitBoxOrient: 'vertical', transition: 'font-size 0.3s ease', fontSize: expanded ? '1.1rem' : '1rem', maxHeight: expanded ? '100%' : '6rem', color: 'black' }}>
                        {note.description}
                    </p>
                    <p className="card-text text-muted" style={{ marginTop: 'auto', marginBottom: '0', fontSize: '0.9rem', display: expanded ? 'block' : 'none', transition: 'opacity 0.3s ease', opacity: expanded ? '1' : '0' }}>
                        Tag: {note.tag}
                    </p>
                    <i className="fas fa-trash-alt text-danger" style={{ cursor: 'pointer', float: 'right' }} onClick={handleDeleteClick}></i>
                </div>
            </div>
        </div>


  )
}

export default Noteitem