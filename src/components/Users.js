import React from 'react'
import '../style/user.css'

const Users = ({ phone }) => {
  return (
    <div className='user_container'>
      <div className='user'>
        <img src="https://www.nme.com/wp-content/uploads/2017/03/2017Stephen-King-IT-new-picture.jpg" alt="ava" />
        <div className='user_text_font'>
          <p>{phone}</p>

        </div>
      </div>


    </div>
  )
}

export default Users
