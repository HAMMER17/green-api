import React, { useState } from 'react'
import '../style/form.css'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/dataUser'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [instance, setInstance] = useState('')
  const [token, setToken] = useState('')

  const getData = (e) => {
    e.preventDefault()
    dispatch(getUser({ instance, token }))
    navigate('/home')
    setInstance('')
    setToken('')
  }

  return (
    <div className='form_container'>
      <form className='form' onSubmit={getData}>
        <h3>Введите данные</h3>
        <input type="text" placeholder='IdInstance' value={instance} onChange={(e) => setInstance(e.target.value)} />
        <input type="text" placeholder='ApiTokenInstance' value={token} onChange={(e) => setToken(e.target.value)} />

        <button>start</button>
      </form>
    </div>
  )
}

export default Register
