import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Post from './Post';
import '../styles/PostHandler.css';



export default function PostHandler() {

  const [currentPosts, setCurrentPosts] = useState([]);
  const { currentUser, handlePostDelete, handleEditFormSubmit, handleCreateNewPost, getPostsFromDatabase } = useAuth();

  useEffect(() => {
    getPostsFromDatabase(currentUser.uid, setCurrentPosts)
  }, []);

  return (
    <div className='PostHandler' >
      <form className='userAuthenticationForm' onSubmit={(event) => handleCreateNewPost(event)} >
        <label htmlFor='postTitle'>Task Title:</label>
        <input required name='postTitle' id='postTitle' type='text' />
        <label htmlFor='postBody'>Task Description:</label>
        <textarea required name='postBody' id='postBody' type='text' />
        <button type='submit'>Create task</button>
      </form>
      {currentPosts.map((post, index) => (
        <Post
          userId={currentUser.uid}
          id={post.id}
          handleEditFormSubmit={handleEditFormSubmit} //used for updating posts, im sure i could get this a better implementation, this just overwrites instead of actually updating
          handlePostDelete={handlePostDelete}
          key={post.id}
          postTitle={post.postTitle}
          postBody={post.postBody}
          postCreator={post.postCreator}
          index={index}
        />
      ))}
    </div>
  )
}
