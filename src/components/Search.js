import React, { useContext } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate()
  // const [sortUser, setSortUser] = useState([])
  const { currentUser } = useContext(AuthContext)
  const myPage = () => {
    navigate('/my')
  }
  // const handlerSubmit = () => {
  //   console.log(sortUser.sort())
  // }
  // const handleKey = (e) => {
  //   e.code === 'Enter' && handlerSubmit()
  // }
  const outUser = () => {
    signOut(auth).then(() => {
      navigate('/auth')
      console.log('you out')

    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div className='search'>
      <h1>Welcome My Chat</h1>
      {/* <hr /> */}
      <div className="search_container">

        <div>
          {/* <input type="text" placeholder='Search...' onKeyDown={handleKey} onChange={(e) => setSortUser(e.target.value)} value={sortUser} /> */}
          {currentUser ? <button style={{ background: 'red', color: 'white' }} onClick={outUser}>out</button> :
            <button style={{ background: 'green', color: 'white' }}><Link to={'/auth'}>sign in</Link></button>}
        </div>
        <div className="search_user">
          <img onClick={myPage} src={currentUser?.photoURL} alt="user" />
          <h4>{currentUser?.displayName}</h4>
        </div>
      </div>
    </div>
  )
}

export default Search;
