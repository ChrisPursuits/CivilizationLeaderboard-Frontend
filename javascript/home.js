import {getDecodedToken} from "./util.js";

export function initHomeScript() {

    const decodedToken = getDecodedToken();
    const username = decodedToken.sub;

    const homePage = document.getElementById("home");
    const welcomeMessage = document.getElementById("home-welcome-message");

    welcomeMessage.innerText = `Welcome back, ${username}!`

    const navbar = document.getElementById("navbar");
}