import React, {useState,useEffect} from 'react';
//import logo from './logo.svg';
import './App.css';
import Post from './Post';
import {db,auth} from './firebase';
import { Modal, Button,Input } from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import ImageUpload from './ImageUpload';

function getModalstyle(){
  const top=50;
  const left=50;
  return{
    top:`${top}%`,
    left:`${left}%`,
    transform:`translate(-${top}%,-${left}%`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes=useStyles();
  const [modalStyle]=useState(getModalstyle);
  const [posts, setPosts] = useState([]);
  const [open]= useState(false);
  const [setOpen]= useState(false);
  const [openSignIn,setOpenSignIn]= useState(false);
  const [username]= useState('');
  const [setUsername]= useState('');
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [user,setUser]=useState(null);
    
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //if user logged in
        console.log(authUser);
        setUser(authUser);

        if(authUser.displayName)
        {
          //dont update username
        }
        else{
          return authUser.updateProfile({
            displayName:username,
          });
        }
      }
      else{
        //user logged out
        setUser(null);
      }
    })
    return ()=>{
      //performing cleanup actions
      unsubscribe();
    }
  }, [user,username]);//user,username are dependencies
  

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id, //Pulling the id from firebase directly 
        post: doc.data() //pulling the data from the db.
      }))); 
    })
    
  },[]);
   
  /* user signing up and entering pswd and authentication of password*/
  
  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error)=>alert(error.message));

    setOpen(false);
  }
  const signIn =(event)=>{
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))

    setOpenSignIn(false);
  }
   
  return (
    <div className="app">
    {/*we need to have caption input,file picker,pot button    */}
     {user?.displayName ? (
       <ImageUpload username={user.displayName}/>
     ): (
       <h3>Sorry you need to login to upload</h3>
     )}

<Modal 
    open={open}
    onClose={()=>setOpen(false)}
    >
      <div style={modalStyle} className={classes.paper}>
      <form className="app_signup">
      <center>
      <img  
      className="app_headerImage" 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcpqO5eT49j9w_zOODysvV2jBdfzM8ZptUgA&usqp=CAU" 
      /* Instagram image */
      align="left" 
      alt="instagram "/>
      </center>
      <Input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />
      <Input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <br></br>
      <center> 
      <Button type="submit" onClick={signUp}>Sign Up</Button>
      </center>  
      </form>
  
      </div>
</Modal>


{/*pasted another modal*/}

<Modal 
    open={openSignIn}
    onClose={()=>setOpenSignIn(false)}
    >
      <div style={modalStyle} className={classes.paper}>
      <form className="app_signup">
      <center>
      <img  
      className="app_headerImage" 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcpqO5eT49j9w_zOODysvV2jBdfzM8ZptUgA&usqp=CAU" 
      /* Instagram image */
      align="left" 
      alt="instagram "/>
      </center>
      <Input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <br></br>
      <center> 
      <Button type="submit" onClick={signIn}>Sign In</Button>
      </center>  
      </form>
  
      </div>
</Modal>





{/* no need any input field*/}
              
<div className="app_header">
<img  
className="app_headerImage" 
src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcpqO5eT49j9w_zOODysvV2jBdfzM8ZptUgA&usqp=CAU" 
/* Instagram image */
align="left" 
alt="instagram "/>
</div>
{ user ? (
  <Button onClick={()=>auth.signOut()}>Log Out</Button>
):(
  <div className="app_loginContainer">
  <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
  <Button onClick={()=>setOpen(true)}>Sign Up</Button>
  </div>
)}
 
{/*<Button onClick={()=>setOpen(true)}>Sign Up</Button>*/}
<h1>Welcome to Instagram that was created by PVS</h1>

{
  posts.map(({id,post}) => (
    <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
  ))
  // each tym a post will be reflected on screen
}
</div> 
  );
}

export default App;
