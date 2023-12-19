import React, {memo} from 'react'
import {Link} from 'react-router-dom'

function Card({ firstName, lastName, id }) {
  const fullName = `${firstName} ${lastName}`;
  return (
    <div
      className="card specialCard mx-auto"
      style={{
        width: '18rem',
        padding: '20px',
        backgroundColor: 'rgb(246,246,246)',
        border: 'none',
        margin: '15px',
      }}
    >
      <img
        src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}
        className="card-img-top"
        // alt={`${fullName} Profile`}
      />
      <div className="card-body text-center">
        <h5 className="card-title text-black-50">{fullName}</h5>


        <Link
          className="btn btn-primary text-white font-weight-bold"
          to={`/Profile/${id}`}
          id={id}
        >
          Click to view Profile
        </Link>
      </div>
    </div>
  )
}
export default memo(Card)
