import React from 'react';

//local
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import Feed from '../Feed/Feed';

import './Questions.css';

function Questions() {
    return (
        <div className="questions">
             <NavBar/>
           <div className="questions_content">
               <SideBar/>
               <Feed/>
            </div> 
        </div>
    )
}

export default Questions
