import React from 'react';
              
//local
import "./Answer.css";

function Answer({name ,questionId ,answer ,email ,image ,timestamp}) {
    return (
        <div className="answers">
            <div className="answers_header">
                <h3>Answer for {name}'s question</h3>
            </div>

            <div className="answers_info">
                <h4>Answered by {name} at {(new Date(timestamp)).toDateString()}</h4>
                <h5>Answer :-</h5> 
                  <p>{answer}</p>
            </div>

            <div className="answers_image">
                <img 
                   className="answer_image"
                   src={image}></img>
            </div>
       </div>
    )
}

export default Answer
