import React, { useState, useEffect } from 'react';
import '../styles/Post.css';


export default function Post({ handlePostDelete, handleEditFormSubmit, index, id, postTitle, postBody, postCreator, userId }) {

    const [showEditForm, setShowEditForm] = useState(false);
    const [editForm, setEditForm] = useState({
        title: postTitle,
        body: postBody,
    });
    const [title, setTitle] = useState(postTitle);
    const [body, setBody] = useState(postBody);

    function handleOnChange(event) {
        setEditForm({ ...editForm, [event.target.name]: event.target.value });
    }



    useEffect(() => {
        setTitle(postTitle);
        setBody(postBody);
    }, [postTitle, postBody]);

    return (
        <div className='Post' key={index}>
            <p className='postTitle'>Task: {title} <br></br>creator: <b>{postCreator}</b></p>
            <p className='postBody' >{body}</p>
            <button onClick={() => handlePostDelete(id, userId)}>Delete task</button>
            {showEditForm && (
                <form onSubmit={(event) => handleEditFormSubmit(event, id, userId, postCreator, editForm, setShowEditForm )}>
                    <label htmlFor="title">Title:</label> <br></br>
                    <input
                        required
                        type="text"
                        id="title"
                        name="title"
                        onChange={handleOnChange}
                        value={editForm.title}
                    />
                    <br></br>
                    <label htmlFor="body">Body:</label> <br></br>
                    <input
                        type="text"
                        required
                        id="body"
                        name="body"
                        onChange={handleOnChange}
                        value={editForm.body}
                    />{" "}
                    <br></br>
                    <button type="submit">Confirm</button>
                </form>
            )}
            <br></br>
            {showEditForm === false ? (
                <button onClick={() => setShowEditForm(true)}>Edit task</button>
            ) : (
                <button onClick={() => setShowEditForm(false)}>Cancel task editing</button>
            )}
        </div>
    )
}
