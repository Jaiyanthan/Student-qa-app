import React,{useState,useEffect} from 'react';

//local
import QuestionBox from "../QuestionBox/QuestionBox";
import Post from '../Post/Post';
import './Feed.css';
import db from "../../firebase";
import firebase from "firebase";

function Feed() {

 const [posts, setPosts] = useState([]);

  useEffect(() => {
     db.collection("questions").orderBy("timestamp","desc").onSnapshot((snapshot) =>{
         setPosts(
             snapshot.docs.map((doc) => ({
                 id:doc.id,
                 questions:doc.data(),
             }))
         )
     })
  }, [])

     return (
        <div className="feed">
            <QuestionBox/>
            {posts.map(({ id, questions }) => (
                <Post
                    key={id}
                    Id={id}
                    question={questions.question}
                    imageUrl={questions.imageUrl}
                    timestamp={questions.timestamp}
                    appUser={questions.user.displayName}
                    category={questions.category}
                    email = {questions.user.email}
                    photo = {questions.user.photo}
                />
           ))}     
            
        </div>
    )
}

export default Feed
