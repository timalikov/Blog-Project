import React, {useState, useEffect, useCallback} from 'react'
import PostCard from '../../components/postCard/PostCard'
import NavigationBar from '../../components/NavBar/NavigationBar'
import './PostPage.css'
import Comment from '../../components/comments/Comment'
import db from '../../utils/db.json'
import axios from 'axios'

function PostPage({match}) {
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
      axios.post(`http://127.0.0.1:8000/posts/${post.id}/increment-likes/`)
          .then(response => {
              setLikes(response.data.likes);
          })
          .catch(error => {
              console.error('There was an error!', error);
          });
  };

  const fetchPost = useCallback(async id => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/posts/${id}/`);
      const postData = await response.json();
      console.log('post data', postData)
      setPost(postData[0]);
    }
    catch (error) {
      console.log(error);
    }
  }, [])

  const postAuthor = post.authorId
  console.log('post author', postAuthor)
  const fetchComments = useCallback(async id => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/comments/byPost/${id}/`);
      const commentData = await response.json();
      console.log('comment data', commentData)
      setComments([...commentData]);
    }
    catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [])

  useEffect(() => {
    fetchPost(match.params.postId)
  }, [fetchPost, match.params.postId])

  useEffect(() => {
    fetchComments(match.params.postId)
  }, [fetchComments, match.params.postId])

  return (
    <div>
      {post.title === undefined ? (
        <h1>Loading....</h1>
      ) : (
        <PostCard
          title={post.title}
          authorId={post.authorId}
          date={post.datePublished}
          numLikes={post.numLikes}
          description={post.description}
        />
      )}
       <button onClick={handleLike}>Like</button>

      <h4 className="mt-4 text-center">Comments</h4>
      <div className="comment-box d-flex justify-content-center">
        <br></br>
        <ul className="list-unstyled m-4 ">
          {loading ? (
            <h1>loading</h1>
          ) : comments.length === 0 ? (
            <h1>No comment </h1>
          ) : (
            comments.map(comment => <Comment key={comment.id} data={comment} />)
          )}
        </ul>
      </div>
    </div>
  )
}

export default PostPage