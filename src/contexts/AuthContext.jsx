import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase/config';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail, 
    updatePassword,
} from '@firebase/auth';
import { deleteDoc, doc } from '@firebase/firestore';
import { projectFireStore, projectStorage } from '../firebase/config';
import { ref, deleteObject } from '@firebase/storage';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true);

    async function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    async function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(){
        return auth.signOut();
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)
    }

    function updatePasswordFunc(password){
        return updatePassword(currentUser, password)
    }

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
            setLoading(false);
        })

        return unsub;
    }, [])

    async function deletePost(id, fileName){
        try{
            const imageRef = ref(projectStorage, `images/${fileName}`);
            await deleteObject(imageRef)
            await deleteDoc(doc(projectFireStore,'images',id));
        }
        catch(err){
            return 'could not delete image';
        }
    }

    const value = {
        currentUser: loading ? null : currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updatePasswordFunc,
        deletePost
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}
