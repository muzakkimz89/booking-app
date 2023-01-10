import React from 'react'
import "./navbar.css"

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='col'>
          <a className='logo text-white text-decoration-none' href="/">Booking.com</a>
        </div>
        <div className='d-flex col justify-content-end align-text-center text-center'>
          <a href='/' className='text-decoration-none text-white m-auto mx-3'>IDR</a>
          <a href='/' className='text-decoration-none text-white m-auto mx-3'>Bendera</a>
          <a href='/' className='text-decoration-none text-white m-auto mx-3'>?</a>
          <button className='navButton2 text-white'>List of Property</button>
          <button className='navButton'>Register</button>
          <button className='navButton'>Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar