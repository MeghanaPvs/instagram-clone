// const firebaseConfig = {
//     apiKey: "AIzaSyCN4YA6WjICewbHRMNA8-6Nk-luEq86pss",
//     authDomain: "instagram-cdb4b.firebaseapp.com",
//     databaseURL: "https://instagram-cdb4b.firebaseio.com",
//     projectId: "instagram-cdb4b",
//     storageBucket: "instagram-cdb4b.appspot.com",
//     messagingSenderId: "262264249194",
//     appId: "1:262264249194:web:e76540e2adeb6fc062a313",
//     measurementId: "G-GRJ5TM5NTT"
//   };

  import firebase from "firebase"
  const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyCN4YA6WjICewbHRMNA8-6Nk-luEq86pss",
    authDomain: "instagram-cdb4b.firebaseapp.com",
    databaseURL: "https://instagram-cdb4b.firebaseio.com",
    projectId: "instagram-cdb4b",
    storageBucket: "instagram-cdb4b.appspot.com",
    messagingSenderId: "262264249194",
    appId: "1:262264249194:web:e76540e2adeb6fc062a313",
    measurementId: "G-GRJ5TM5NTT"
  });
/* taking 3 services from firebase*/
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  /* authnetication: for login and logout & storing it in auth variable*/
  const storage=firebase.storage();
  /* Store all the photos,posts.....*/
  

  export{db,auth,storage};
