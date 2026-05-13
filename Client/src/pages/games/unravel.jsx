import React, { useEffect, useState , useRef} from 'react'
import Navbar from '../../components/Navbar'
import InputCode from '../../components/inputcode'


const unravel = () => {


  return (
    <div className="mx-25 my-5">
        <div><Navbar/></div>
        <div>
            <div><InputCode/></div>
            <div><InputCode/></div>
        </div>
    </div>
  )
}

export default unravel