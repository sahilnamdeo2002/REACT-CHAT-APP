
import {Box,Button,Container,HStack,Input,VStack} from "@chakra-ui/react";
import Message from "./components/Message";
import { signOut,onAuthStateChanged, getAuth, GoogleAuthProvider ,signInWithPopup} from 'firebase/auth';
// import firebase from "firebase";
import { orderBy,query,onSnapshot,getFirestore ,addDoc, collection} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {app} from "./firebase";
const auth=getAuth(app);
const db=getFirestore(app);
const loginHandler=()=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider)
};







const logOutHandler=()=> signOut(auth)
  
// --------------------------------------------------------------------------------------
function App() {

const [user,setUser]=useState(false);
const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);





const divforscroll=useRef(null);

const submitHandler = async (e) => {
  e.preventDefault();

  try{
    setMessage("");
    await addDoc(collection(db,"Messages"),{
      text: message,
      uid: user.uid,
      uri: user.photoURL,
      createdAt: serverTimestamp(),
    });

    divforscroll.current.scrollIntoView({behavior:"smooth"});
  }catch (error){
    alert(error); 
  }
};


useEffect(() => {
  const q=query(collection(db,"Messages"),orderBy("createdAt","asc"));
  const  unsubscribe= onAuthStateChanged(auth,(data)=>{
   setUser(data) 
  });

  const unsubscribeForMessage = onSnapshot(q,(snap)=>{
  setMessages(
  
    snap.docs.map((item)=>{
      const id=item.id;
      return {id,...item.data()};
    })
  );
  });

  return ()=>{
    unsubscribe();
    unsubscribeForMessage();
  };
},[]);

  return (
     <Box bg={"red.50"}>
     {user?(
        <Container h={"100vh"}  bg={"white"}>
        <VStack h="100vh" paddingY={"4"}>
          <Button onClick={logOutHandler} colorScheme={ "purple"} w={"full"} style={{fontFamily:"serif" }} >LOGOUT</Button>

          <VStack h="full"  w={"full"} overflowY="auto" css={{"&::-webkit-scrollbar":{
          display: "none",
          },
          }}
          >
          {messages.map((item)=>(
                 <Message
                 key={item.id}
                 user={item.uid === user.uid ? "me" : "other"}
                 text={item.text}
                 uri={item.uri}
               />
          ))}

<div ref={divforscroll}></div>
          </VStack>
        
       


        <form onSubmit={submitHandler}>
          <HStack>
          <Input  style={{fontFamily:"serif" , color:"black"}} value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Enter a  message"/>
          <Button colorScheme={"purple"} type="submit"  style={{fontFamily:"serif" }}   >SEND</Button>
          </HStack>
        </form>
        
        </VStack>
      </Container>
     ):
      <VStack  bg="white" justifyContent={"center"} h="100vh">
        <Button onClick={loginHandler} colorScheme={"purple"}  style={{fontFamily:"serif" , color:"white"}}  >
          LOGIN WITH GOOGLE
         
          <p style={{color:"purple" , fontFamily:"serif"  }}  >  <br/> <br/> <br/>  by-sahil namdeo</p>
          </Button>
      </VStack>
      }
    </Box>
  );
}


export default App;
