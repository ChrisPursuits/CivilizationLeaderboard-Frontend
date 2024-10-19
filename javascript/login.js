import {checkHttpErrors, getDecodedToken, makeOption} from "./util.js";

const URL_LOGIN = "http://localhost:8080/api/v1/login";



export function initLoginScript() {
    const formLogin = document.getElementById("formLogin");
    formLogin.addEventListener("submit", login);
}





async function login(event) {
    event.preventDefault();
    const formLogin = document.getElementById("formLogin");

    const formData = new FormData(formLogin);
    const loginRequest = {};
    formData.forEach((value, key) => {
        loginRequest[key] = value;
    })

    try {
        const postOption = makeOption("POST", loginRequest);

        const response = await fetch(URL_LOGIN, postOption);
        checkHttpErrors(response);
        const jwtToken = await response.json();
        const token = jwtToken.token;
        localStorage.setItem("jwtToken", token);

        redirectToHome();

    }catch (error) {
        console.log(error.status)
        if (error.status === 400) {
            const wrongCredentials = document.getElementById("login-wrong-credentials");
            wrongCredentials.innerText = "Incorrect username or password."
        }
    }
}





function redirectToHome() {
    location.hash = "#home"
}