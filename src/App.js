import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Post from './Post'

function App() {
  return (
    <div className="App">
     
<div className="app_header">
<img  
className="app_headerImage" 
src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSe1mXowQOoDhnVexElVo_B017a1E__nKe8Yw&usqp=CAU" 
align="left" 
alt="instagram "/>
</div>
<h1>Welcome to Instagram</h1>
<Post />
</div> 
  );
}

export default App;
