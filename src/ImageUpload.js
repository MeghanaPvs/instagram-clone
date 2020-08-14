import React,{useState} from 'react';
import { Button } from "@material-ui/core";
import firebase from "firebase";
import {storage,db} from "./firebase";
import './ImageUpload.css'

function ImageUpload({username}) {
    const[image,setImage]=useState(null);
    //const[url,setUrl]=useState("");
    const[progress,setProgress]=useState(0);// progress bar
    const[caption,setCaption]=useState('');
    
    
    const handleChange = (e) => {
        if(e.target.files[0]){     // Selecting a file
            setImage(e.target.files[0]);  // When selected a file a image of the file should be visible
        }
    };
    
    const handleUpload = () => {
        const uploadTask=storage.ref(`images/${image.name}`).put(image);
        //image.name => if a file is uploaded that name of the file should be displayed after the file is choosen
        uploadTask.on(
            "state changed",
            (snapshot)=>
            {
                //progress function
                const progress=Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                //a progress bar to indicate how much amount of file is been uploaded.
                setProgress(progress);
            },
            (error)=>{
                //error function
                console.log(error);
                alert(error.message);
            },
            ()=>{
                //complete function i.e.when upload of a file  is completed
                storage
                  .ref("images")
                  .child(image.name)
                  .getDownloadURL()
                  .then(url =>{
                        //posts image into the db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption:caption,
                            imageUrl:url,
                            username:username
                            //when a new post is uploaded shown first
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
            }
        );
    };   
    
    return (
        <div className="imageupload">
            {/*we need to have caption input,file picker,pot button    */}
            <progress value={progress} max="100"/>  
            <input type="text" placeholder='Enter a Caption'onChange={event=>setCaption(event.target.value)} value={caption}/>
            {/* whenever we click "choose a file" a window should be popped up*/}
            <input type="file" onChange={handleChange}/>
            <Button onClick= {handleUpload}>
              Upload
            </Button>
        </div>
    )
}

export default ImageUpload

