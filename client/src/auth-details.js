import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
const[authUser, setAuthUser] = useState(null);
const AuthDetails =()=>{
    const [authUser, setAuthUser] = useState(null);

    useEffect(()=>{
        const listen = onAuthStateChanged(auth, (user)=>{
            if(user){
                setAuthUser(user);
            }
            else{
                setAuthUser(null);
            }
        })
        return()=>{
            listen();
        }
    },[]);


    return(
        <div>
            {authUser ? <p>{`signed in as ${authUser.email}`}</p>: <p>signed out </p>}
        </div>
    );
}