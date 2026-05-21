import app from "./firebase.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
const auth = getAuth(app);

//header//
fetch("./header.html")
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        document.querySelector("#header").innerHTML = data;
       
        //モダールの表示//
        const authButton = document.querySelector(".auth-button");
        authButton.addEventListener("click", () => {
            document.querySelector(".login-modal").setAttribute("aria-hidden", "false");
        });
        onAuthStateChanged (auth, (user)=> {
            if (user){
                authButton.dataset.login ="true";
                authButton.textContent ="ログアウト";
            } else {
            authButton.dataset.login = "false";
            authButton.textContent = "ログイン";
        }
        })

        authButton.addEventListener("click", async () => {

        if (authButton.dataset.login === "true") {
            await signOut(auth);
        }
        });
    });


fetch("./modal.html")
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        document.querySelector(".login-modal").innerHTML = data;
        const loginModal = document.querySelector( ".login-modal");
        const loginOverlay =document.querySelector( ".login-modal__overlay");
        const closeButton =document.querySelector(".login-modal__close");
        
        const closeModal = () => {
            loginModal.setAttribute("aria-hidden", "true");
        }

        loginOverlay.addEventListener("click", closeModal);
        closeButton.addEventListener("click", closeModal);

        

        
        const loginButton = document.querySelector(".login-submit");
        const signupButton = document.querySelector(".signup-submit");
        const emailInput = document.querySelector(".email-input");
        const passwordInput = document.querySelector(".password-input");
        const authButton = document.querySelector(".auth-button");

        loginButton.addEventListener("click", async (e) => {

            e.preventDefault();

            try {
            await signInWithEmailAndPassword(
                auth, emailInput.value, passwordInput.value);

            alert("ログインしました");
            loginModal.setAttribute("aria-hidden", "true");
            emailInput.value = "";
            passwordInput.value = "";
        } catch (error) {
            alert("ログインに失敗しました。\n アカウントお持ちでない方は新規登録ボタンを押してください");
            console.log(error);
        }
        });

        signupButton.addEventListener("click", async (e) => {

            e.preventDefault();

            try {
            await createUserWithEmailAndPassword(
                auth, emailInput.value, passwordInput.value);

            alert("新規登録しました");
            loginModal.setAttribute("aria-hidden", "true");
            emailInput.value = "";
            passwordInput.value = "";
        } catch (error) {
            alert("新規登録に失敗しました。\n アカウントお持ちの方はログインボタンを押してください");
            console.log(error);
        }
        });

    });




