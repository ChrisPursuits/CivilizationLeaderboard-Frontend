import {checkHttpErrors, makeOption} from "./util.js";

const URL_REGISTER = "http://localhost:8080/api/v1/register"; //TODO change this to the production url.



export function initRegisterScript() {
    const formRegister = document.getElementById("formRegister");
    formRegister.addEventListener("submit", registerUser);
}


async function registerUser(event) {
    event.preventDefault();
    const formRegister = document.getElementById("formRegister");
    const formData = new FormData(formRegister);

    const jsObject = {};
    formData.forEach((value, key) => {
        jsObject[key] = value;
    });

    try {
        const postOption = makeOption("POST", jsObject);

        const response = await fetch(URL_REGISTER, postOption);
        await checkHttpErrors(response);
        const jwtToken = await response.json();
        let token = jwtToken.token;//unwraps the token from the js object / json
        localStorage.setItem("jwtToken", token)

        const accountCreated = document.getElementById("register-account-created")
        accountCreated.innerText = "Account created redirecting to login in 6 seconds.\nIf something went wrong click 'Login' down below."
        setTimeout(redirectToLogin, 6000);

    } catch (error) {
        console.error(error);
        if (error.status === 400) {
            const usernameTaken = document.getElementById("register-username-taken");
            usernameTaken.innerText = "Username has already been taken.";

        } else {
            const otherError = document.getElementById("register-other-error");
            otherError.innerText = "Something went wrong... please contact Chris:)";
        }
    }
}


function redirectToLogin() {
    location.hash = "#login"
}