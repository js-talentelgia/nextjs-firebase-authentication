import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged as _onAuthStateChanged,
  } from "firebase/auth";
  
  import { auth } from "@/lib/firebase/firebase";
  
  // export function onAuthStateChanged(cb) {
  //   return () => {};
  // }
  
  // export async function signInWithGoogle() {
  //   return;
  // }
  
  // export async function signOut() {
  //   return;
  // }
  
  export function onAuthStateChanged(cb) {
    return _onAuthStateChanged(auth, cb);
  }
  
  export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
  
    try {
            await signInWithPopup(auth, provider);
    } catch (error) {
            console.error("Error signing in with Google", error);
    }
  }
  export async function GetUserWithEmailAndPassword(email, password) {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            // console.log("================================================Email and password================================", response);
            return response;
        } catch (error) {
        //     console.log("--error in catch ===", error.message);
            if (error.message === "Firebase: Error (auth/invalid-credential).") {
                throw new Error("Invalid login credentials");
            } else {
                throw new Error("An error occurred while attempting to sign in");
            }
        }
    }


    export async function StoreUserWithEmailAndPassword(email, password) {
      try {
          const response = await createUserWithEmailAndPassword(auth, email, password);
          // console.log("================================================Email and password================================", response);
          await signOut();
          return response;
      } catch (error) {
          console.log("--error in catch register user ===", error.message);
          if (error.message === "Firebase: Error (auth/invalid-credential).") {
              throw new Error("Invalid login credentials");
          }else if(error.message === "Firebase: Error (auth/email-already-in-use)."){
              throw new Error("Email already Exist");
          } else {
              throw new Error("An error occurred while attempting to sign in");
          }
      }
  }
    

  export async function signOut() {
    try {
            return auth.signOut();
    } catch (error) {
            console.error("Error signing out with Google", error);
    }
  }
  export async function currentUser() {
    try {
            return auth;
    } catch (error) {
            console.error("Error signing out with Google", error);
    }
  }