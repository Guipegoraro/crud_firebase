import React, { useContext, useEffect, useState, createContext } from 'react';
import { auth, database } from '../../firebase';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set, onValue, remove } from 'firebase/database';

const AuthContext = createContext();


export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(false);

    function handleLogOut(setUserStatus) {
        handleSignOut().then(setUserStatus({ logged: false, createAccount: false }));
        alert('logged out');
    }

    async function handleLoginForm(event, setLoading, setErrorMessage, setUserStatus) {
        event.preventDefault();
        const form = event.target;
        setLoading(true);
        try {
            await handleSignIn(form.email.value, form.password.value);
            setUserStatus({ logged: true, createAccount: false });
        } catch (error) {
            setErrorMessage(`failed to login: ${error.message}`);

        } finally { setLoading(false) }

    }

    async function handleCreateAccountForm(event, setLoading, setErrorMessage, setUserStatus) {
        event.preventDefault();
        setLoading(true)
        const form = event.target;
        if ((form.password.value !== form.confirmPassword.value) || (form.email.value !== form.confirmEmail.value)) {
            setLoading(false)
            return setErrorMessage('Email and/or password confirmation do not match')
        }
        setErrorMessage('')
        try {
            await handleSignUp(form.email.value, form.password.value)
            setUserStatus({ logged: true, createAccount: false })
        } catch (error) {
            setErrorMessage(`failed to create an account: ${error.message}`)
        } finally { setLoading(false) }
    }

    function handleEditFormSubmit(event, id, userId, postCreator, editForm, setShowEditForm) {
        event.preventDefault();
        setShowEditForm(false);
        const post = {
            id,
            postCreator,
            postTitle: editForm.title,
            postBody: editForm.body
        };
        writeToDatabase(post, userId);
    }
    function handlePostDelete(id, userId) {
        const reference = ref(database, `users/${userId}/${id}`);
        remove(reference);
    }
    function writeToDatabase(post, userId) { //this also updates posts
        const reference = ref(database, `users/${userId}/${post.id}`);
        set(reference, post);
    }
    function handleCreateNewPost(event) {
        event.preventDefault();
        const form = event.target;
        const newPost = {
            id: Math.floor(Math.random() * 10000) + Math.floor(Math.random() * 1000) + 1,
            postCreator: currentUser.email,
            postTitle: form.postTitle.value,
            postBody: form.postBody.value
        };
        writeToDatabase(newPost, currentUser.uid);
    }
    function getPostsFromDatabase(userId, setCurrentPosts) {
        const reference = ref(database, `users/${userId}/`)
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            const postsArray = data ? Object.values(data) : [];
            setCurrentPosts(postsArray);
        })
    }

    function handleSignIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function handleSignOut() {
        return signOut(auth)
    }

    function handleSignUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return unsubscribe
    }, []);

    const value = {
        currentUser,
        handleSignUp,
        handleSignOut,
        handleSignIn,
        handlePostDelete,
        handleCreateNewPost,
        handleEditFormSubmit,
        writeToDatabase,
        getPostsFromDatabase,
        handleCreateAccountForm,
        handleLoginForm,
        handleLogOut

    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
