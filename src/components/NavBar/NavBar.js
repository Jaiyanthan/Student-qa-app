import React,{useState} from 'react';
import Modal from 'react-modal';
import firebase from 'firebase';

//icons
import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

//mui-core
import { Input , Button , Link , Avatar} from '@mui/material';

//local
import './NavBar.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db, { auth } from "../../firebase";

function Navbar() {

const user  = useSelector(selectUser);
const [openModal ,setOpenModal] = useState(false);
const [input ,setInput]         = useState("");
const [inputUrl , setInputUrl]  = useState("");
const [category, setCategory] = useState("");

const question = input

const handleSubmit = (e) => {

 //.preventDefault();

 setOpenModal(false)

 if(question){
      db.collection("questions").add({
         user:user,
         question:input,
         imageUrl:inputUrl,
         category:category,
         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
 }

 setInputUrl("")
 setInput("")
}
    return (
        <div className="qHeader">
            <h1>Questingo??</h1>
            <div className="qHeader_logo">
                {/* <h1>Questingo</h1> */}
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/9/94/Sobsz_-_gender_question_mark.svg"
                  alt= ""
                />
            </div>
            <div className="qHeader_icons">
               <div className="qHeader_icon">
                     <HomeIcon/>
               </div>
               <div className="qHeader_icon">
                    <FeaturedPlayListIcon/>
               </div>
               <div className="qHeader_icon">
                    <AssignmentTurnedInIcon/>
               </div>
               <div className="qHeader_icon">
                    <PeopleAltIcon/>
               </div>
               <div className="qHeader_icon">
                     <NotificationsIcon/>
               </div>
            </div>

            <div className="qHeader_input">
                 <SearchIcon/>
                 <input placeholder="Search your questions" type="text"></input>
            </div>

            <div className="qHeader_rem">
                 <div className="qHeader_avatar">
                      <Avatar onClick={()=>{
                           auth.signOut()
                      }}src={user.photo}/>
                 </div>
                     <LanguageIcon/>
 
                  <Button onClick={() => setOpenModal(true)}>Add Questions</Button>   
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
                      
                    <div className="modal_title">
                         <h5>Add Questions</h5>
                         <h5>Share Link</h5>
                        <div className="modal_info">
                           <Avatar src={user.photo ? user.photo : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"}/>
                             <p>{user.displayName ? user.displayName : user.email}</p>
                        <div className="modal_scope">
                           <PeopleAltIcon/>
                           <p>Public</p>
                           <ExpandMoreOutlinedIcon/>
                         </div> 
                    </div>
                       <div className="modal_field">
                           <Input
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              type="text"
                              placeholder="Start your question with 'Why', 'What', 'How', etc"
                           ></Input>

                       <div className="modal_fieldUrl">
                          <Link/>
                             <input
                                value={inputUrl}
                                onChange={(e) => setInputUrl(e.target.value)}
                                type="text"
                                placeholder="Optional: add image link"
                              >
                             </input>
                        </div>

                        <div className="modal_category">
                             <Input
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                type="text"
                                placeholder="Category"
                             >
                             </Input>
                        </div>
                      </div>      
                        <div className="modal_buttons">
                          <button className="close" onClick={() => setOpenModal(false)}>Close</button>
                          <button type="submit" className="add" onClick={() =>{
                               handleSubmit();
                          }}>Add Question</button>  
                        </div>

                    </div>  
                  </Modal>
            </div>
        </div>
    )
}
export default Navbar
