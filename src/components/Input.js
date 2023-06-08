import React from 'react'
import '../style/input.css'

const Input = ({ text, isSubmit, item }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    isSubmit(text)
  }
  return (

    <form className='input' onSubmit={onSubmit}>
      <input type="text" placeholder='Text...' onChange={text} value={item} />
      <button>send</button>
    </form>

  )
}

export default Input
