import React,{useState ,useEffect} from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

//icon
import PersonIcon from '@mui/icons-material/Person';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

//local
import './Post.css';
import { selectUser } from '../../features/userSlice';
import { selectQuestionId , selectQuestionName, setQuestionInfo } from '../../features/questionSlice';
import db from '../../firebase';
import Answer from '../Answer/Answer';

//mui-core
import { Avatar,Link ,Input } from '@mui/material';
import firebase from 'firebase';

Modal.setAppElement("#root")

function Post ( {Id, question,category, imageUrl, timestamp, appUser ,email  ,photo}) {

const user = useSelector(selectUser)
const questionId = useSelector(selectQuestionId);
const dispatch = useDispatch()

//state
const [openModal, setOpenModal] = useState(false);
const [openModal2, setOpenModal2] = useState(false);
const [answer, setAnswer]  = useState("");
const [answerUrl, setAnswerUrl] = useState("");
const [getAnswer ,setGetAnswer] = useState([]);

 useEffect(() => {
     if(questionId){
       db
         .collection("questions")
         .doc(questionId)
         .collection("answer")
         .orderBy("timestamp" , "desc")
         .onSnapshot((snapshot)=>{
           setGetAnswer(snapshot.docs.map((doc) => ({
               id:doc.id ,
               answers:doc.data(),
           })))
       })
     }    
 }, [questionId])

 const handleSubmit = () => {
     
    if(questionId){
        db.collection("questions").doc(questionId).collection("answer").add({
            user:appUser,
            answer:answer,
            questionId:questionId,
            ansImg:answerUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }

    setAnswer("");
    setOpenModal(false)
 }

    return (
        <div
          className="post"
          onClick={() => {
            dispatch(setQuestionInfo({
              questionId:Id,
              questionName: question
          }))
        }}
            
        >
           <div className="post_info">
               <Avatar src={photo}/>
               <h5>{appUser ? appUser : email}</h5>
               <small>{(new Date(timestamp)).toDateString()}</small>         
           </div>
           <div className="post_body">
              <div className="post_question">
                  <p>{question}</p>
                  <small className="post_cat"> Category : {category ? category : "category"}</small>
                  <button onClick={() => setOpenModal(true)} className="post_button">Answer</button>
                  
                <Modal
                      isOpen = {openModal}
                      onRequestClose = {() => setOpenModal(false)}
                      shouldCloseOnOverlayClick={false}
                      style={{
                          overlay:{ 
                           width:700,
                           height:600,
                           backgroundColor:"rgb(0,0,8)",
                           zIndex:"1000",
                           top:"50%",
                           left:"50%",
                           marginTop : "-300px",
                           marginLeft:"-350px",
                          }  
                      }}
                      >
                          <div className="modal_question">
                          <h1 className="modal_questionHeader">{question}</h1>
                            <p>
                                asked by{" "}
                                <span className="name">
                                {appUser ? appUser : email}
                                </span>{" "}
                                {""}
                                on{" "}
                                <span className="name">
                                   "time"
                                </span>
                            </p>    
                          </div>
                         
                          <div className="modal_answer">
                               <textarea
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder="Enter your Answer"
                                    type="text"
                               >
                               </textarea>
                          </div>
                          
                          <div className="modal_answerImg">
                             <input
                                value={answerUrl}
                                onChange={(e) => setAnswerUrl(e.target.value)}
                                type="text"
                                placeholder="Optional: add image link"
                              >
                             </input>
                          </div>
                         <div className="modal_button">
                             <button className="cancel" onClick={() => setOpenModal(false)}>Cancel</button>
                             <button type="submit" className="add" onClick={() => handleSubmit()}>Add Answer</button>
                        </div>   
                           
                  </Modal>  
              </div> 
         
           <div className="post_answer">
             <button  className="open_answer" onClick={() => setOpenModal2(true)}>Show answer</button>
             <Modal 
                  isOpen = {openModal2}
                  onRequestClose = {() => setOpenModal2(false)}
                  shouldCloseOnOverlayClick={false}
                  style={{
                      overlay:{ 
                       width:700,
                       height:600,
                       backgroundColor:"rgb(0,0,8)",
                       zIndex:"1000",
                       top:"50%",
                       left:"50%",
                       marginTop : "-300px",
                       marginLeft:"-350px",
                      }  
                  }}
             >
                {getAnswer.map(({id ,answers}) => ( 
               
                  <Answer
                      questionId={answers.questionId}
                      answer = {answers.answer}
                      name = {answers.user.displayName}
                      email = {answers.user.email}
                      image = {answers.ansImg}
                      timestamp = {answers.timestamp}
                   />))}    

                   <button onClick={() => setOpenModal2(false)}>Hide Answer</button>
             </Modal>
                    
           </div>
           <img 
             className="post_image"
              src={imageUrl}
           />
         </div>

           <div className="post_footer">
              <div className="post_footerActions">
                 <ArrowUpwardOutlinedIcon/>
                 <ArrowDownwardOutlinedIcon/>
              </div>
              <RepeatOutlinedIcon/>
              <ChatBubbleOutlineOutlinedIcon/>
               <div className="post_footerLeft">
                 <ShareOutlinedIcon/>
                 <MoreHorizOutlinedIcon/>
               </div>
               
           </div>
        </div>
    )
}

export default Post

// {getAnswer.map(({id ,answers}) => {
//   <p key={id} style={{ position: "relative", paddingBottom: "5px" }}>
//     {Id === answers.questionId ? (
//       <span>
//         {answers.answer}
//        <br />
//      <span
//          style={{
//             position: "absolute",
//             color: "gray",
//             fontSize: "small",
//             display: "flex",
//             right: "0px",
//          }}
//     >
//    <span style={{ color: "#b92b27" }}>
//         {answers.user.displayName
//          ? answers.user.displayName
//          : answers.user.email}{" "}
//                on{" "}
//                 monday
//   </span>
// </span>
// </span>
// ) : (
//        ""
// )}
// </p>
// })} 

//https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/brands/bmw_i/P90407446_Freisteller_2.png.grp-transform/large/P90407446_Freisteller_2.png