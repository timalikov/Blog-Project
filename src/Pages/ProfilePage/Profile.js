import React, {useState, useEffect, useCallback} from 'react'
import './profile.css'
import axios from 'axios';

import Footer from '../../components/Footer/Footer'
import NavigationBar from '../../components/NavBar/NavigationBar'
import db from '../../utils/db.json'
import AuthorCard from '../../components/AuthorCard/AuthorCard'
import FilterHeader from '../../components/FilterHeader/FilterHeader'
import UserPostList from '../../components/UserPostsList/UserPostList'

function Profile({match}) {
  const [posts, setPosts] = useState([]) // for Seting Post
  const [author, setAuthor] = useState({}) // for Setting Author
  const [activeButton, setActiveButton] = useState('') // for active Button
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

   // Fetching posts from server
   const fetchPost = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/posts/author/${id}/`);
      setPosts(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetching user from server
  const fetchUser = useCallback(async (authorId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/users/${authorId}/`);
      setAuthor(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, []);

  useEffect(() => {
    const authorId = match.params.authorId;
    fetchPost(authorId);
    fetchUser(authorId);
  }, [fetchPost, fetchUser, match.params.authorId]);


  // Sorting By Assending Date
  const ascDate = useCallback(() => {
    setActiveButton('ascDate')
    let data = posts

    // bubble sort for shorting time complexity = O(n * n)
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].datePublished > data[j + 1].datePublished) {
          let temp = data[j]
          data[j] = data[j + 1]
          data[j + 1] = temp
        }
      }
    }

    setPosts([...data])
  }, [posts])

  // Sorting By decending Date
  const dscDate = useCallback(() => {
    setActiveButton('dscDate')
    let data = posts

    // bubble sort for shorting time complexity = O(n * n)

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].datePublished > data[j + 1].datePublished) {
          let temp = data[j]
          data[j] = data[j + 1]
          data[j + 1] = temp
        }
      }
    }
    setPosts([...data.reverse()])
  }, [posts])

  // Sorting By Assending Like
  const ascLike = useCallback(() => {
    setActiveButton('ascLike')
    let data = posts

    // bubble sort for shorting time complexity = O(n * n)

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].numLikes > data[j + 1].numLikes) {
          let temp = data[j]
          data[j] = data[j + 1]
          data[j + 1] = temp
        }
      }
    }

    setPosts([...data])
  }, [posts])

  // Sorting By decending Like
  const dscLike = useCallback(() => {
    setActiveButton('dscLike')
    let data = posts

    // bubble sort for shorting time complexity = O(n * n)

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j].numLikes > data[j + 1].numLikes) {
          let temp = data[j]
          data[j] = data[j + 1]
          data[j + 1] = temp
        }
      }
    }

    setPosts([...data.reverse()])
  }, [posts])

  return (
    <div>
      <AuthorCard
       firstName={author.first_name}
       lastName={author.last_name}
        phone={author.phone}
        numPosts={author.num_posts}
        numLikes={author.num_ikes}
       />
      <div className="container">
        <h3 className="pt-4 pl-4 pb-3">Posts</h3>
        <FilterHeader
          activeButton={activeButton}
          ascDate={ascDate}
          dscDate={dscDate}
          ascLike={ascLike}
          dscLike={dscLike}
        />
        <UserPostList posts={posts} />
      </div>
    </div>
  );
}

export default Profile
