import React, {memo} from 'react'

function AuthorCard({firstName, lastName, phone, numPosts, numLikes}) {
  return (
    <div className="cardProfile">
      <img
        src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}
        alt={firstName+lastName}
        style={{width: '100%'}}
      />
      <h1>{firstName + ' ' + lastName}</h1>
      <p className="title text-secondary">mobile : {phone}</p>
      <p>POSTS : {numPosts}</p>
      <p>LIKES : {numLikes}</p>
    </div>
  )
}

export default memo(AuthorCard)