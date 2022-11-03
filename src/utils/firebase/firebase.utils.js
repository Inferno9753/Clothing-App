import {initializeApp} from 'firebase/app'
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth'; 
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDgZlq2M8JP8IAkZBvrBFaDECTtg7GCMlo",
    authDomain: "crwn-clothing-db-70ff8.firebaseapp.com",
    projectId: "crwn-clothing-db-70ff8",
    storageBucket: "crwn-clothing-db-70ff8.appspot.com",
    messagingSenderId: "527455167270",
    appId: "1:527455167270:web:5ccbad7e320b94d8b9d7e7"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider =new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt:"select_account"
  })

  export const auth=getAuth();
  export const SignInWithGooglePopup=()=>signInWithPopup(auth,provider);
  export const signInWithGoogleRedirect=()=>signInWithRedirect(auth,provider);

  export const db=getFirestore();

  export const createUserDocumentFromAuth=async (userAuth,additionalInformation={displayName:''})=>{
    if(!userAuth) return;
    const userDocRef=doc(db,'users',userAuth.uid);
    console.log(userDocRef);

    const userSnapShot=await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    if(!userSnapShot.exists())
    {
        const {displayName,email} =userAuth;
        const createdAt=new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error){
            console.log('error creating the user',error.message);
        }
    }
    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword=async (email,password)=>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password)
  }
  export const signInAuthUserWithEmailAndPassword=async (email,password)=>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth,email,password)
  }

  export const signOutUser=()=>signOut(auth);

  export const onAuthStateChangedListener=(callback)=>onAuthStateChanged(auth,callback);