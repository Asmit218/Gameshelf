import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'

const profilepage = (textTheme) => {
    return (
        <div>
            <img className='h-64 w-full object-cover' src='banner.jpg'></img>
            <img className=''></img>
            <div className="mx-25 my-5 absolute top-0 left-0">
                <Navbar textTheme={textTheme} />
            </div>
            
            
            
        </div>

    )
}

export default profilepage