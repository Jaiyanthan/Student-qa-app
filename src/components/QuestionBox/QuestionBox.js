import React from 'react';

//icons
import Avatar from '@mui/material/Avatar';

//local
import './QuestionBox.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function QuestionBox() {

 const user = useSelector(selectUser); 
    
    return (
        <div className="question_box">
            <div className="questionBox_info">
                <Avatar src={user.photo}/>
                <h5>{user.displayName}</h5>
            </div>
            <div className="questionBox_input">
                <p>What's your question or link?</p>
            </div>
        </div>
    )
}

export default QuestionBox
