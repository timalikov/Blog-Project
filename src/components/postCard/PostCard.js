import React, {useState, useEffect, useCallback} from 'react'
import './PostPage.css'
import db from '../../utils/db.json'

function PostCard(props) {
  const [authorName, setauthorName] = useState('')

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/${props.authorId}/`);
      const authorData = await response.json();
      setauthorName(authorData.first_name + ' ' + authorData.last_name);

      // test
      console.log('authordata', authorData)
      console.log('postcart users authorid', props.authorId)
    } catch (error) {
      console.error('Error fetching author:', error);
    }
  }, [props.authorId]);
  

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="card w-100">
      <h1>{props.title}</h1>
      <div className=" p-5 ">
        <div className="mainContent mx-auto">{props.description}</div>
      </div>
      <p className="title text-secondary">
        Date : {new Date(props.date).toLocaleDateString()}
      </p>
      <p>Author : {authorName}</p>
      <p>LIKES : {props.numLikes}</p>
    </div>
  )
}
export default PostCard
