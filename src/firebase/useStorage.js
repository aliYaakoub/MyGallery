import { useState, useEffect } from 'react';
import { projectStorage, projectFireStore } from './config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, Timestamp } from '@firebase/firestore';

const useStorage = (file, username) =>{
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(()=>{
        // refrences
        const spaceRef = ref(projectStorage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(spaceRef, file);
        const collectionRef = collection(projectFireStore, `images`);
        console.log(uploadTask);

        uploadTask.on(
            'state_changed', 
            (snap)=>{
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, 
        (err)=>{
            setError(err);
        }, 
        async ()=>{
            const url = await getDownloadURL(uploadTask.snapshot.ref)
            addDoc(collectionRef, {
                timeStamp: Timestamp.now(), 
                fileName: file.name,
                file: url,
                username: username
            });
            setUrl(url);
        });
    },[file, username])

    return { progress, error, url };

}

export default useStorage;