import React, {useState,useEffect} from 'react';
/*useEffect: Runs a piece of code based on a speific condition*/
//import logo from './logo.svg';
import './App.css';
import Post from './Post';
import {db} from './firebase';

function App() {
  const [posts, setPosts] = useState([
    // {/* Each posts we create has username,caption,imageUrl*/}
    // {
    //   username: "MeghanaPvs",
    //   caption : "It's time to code ",
    //   imageUrl: "https://mattermost.com/wp-content/uploads/2018/10/React_Native_Logo.png"
    // },
    // {
    //   username: "Chinni@P",
    //   caption:"Go Greenery", 
    //   imageUrl: "https://images.pexels.com/photos/339614/pexels-photo-339614.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    // },
    // {
    //   username: "Maggie" ,
    //   caption: "Enjoy the nature!!" ,
    //   imageUrl: "https://images.pexels.com/photos/258109/pexels-photo-258109.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    // }

  ]);

  useEffect(()=>{
    //here code runs
    //whenever post changes it runs
    //accessing collection from database
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id, //Pulling the id from firebase directly 
        post: doc.data() //pulling the data from the db.
      }))); 
      //if we have multiple docs in firebase it maps
    })
    //' posts ' is the collection name created at firebase
    //Snapshot : whenever a new post is added it takes a snapshot of it i.e. the post created at firebase
  },[]);

  return (
    <div className="App">
     
<div className="app_header">
<img  
className="app_headerImage" 
src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSe1mXowQOoDhnVexElVo_B017a1E__nKe8Yw&usqp=CAU" 
/* Instagram image */
align="left" 
alt="instagram "/>
</div>
<h1>Welcome to Instagram that was created by PVS</h1>

{
  posts.map(({id,post}) => (
    <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
  ))
  // each tym a post will be reflected on screen
}

{/* <Post username="MeghanaPvs" caption="It's time to code " imageUrl="https://mattermost.com/wp-content/uploads/2018/10/React_Native_Logo.png"/>
<Post username="Chinni@P" caption="Go Greenery" imageUrl="https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
<Post username="Maggie" caption="Enjoy the nature!!" imageUrl="https://images.pexels.com/photos/258109/pexels-photo-258109.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/> */}

</div> 
  );
}

export default App;
