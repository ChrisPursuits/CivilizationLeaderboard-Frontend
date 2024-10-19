import {getDecodedToken, NavbarComponent} from "./util.js";

export function initHomeScript() {

    const homeNavbar = document.getElementById("home-navbar");
    homeNavbar.innerHTML = NavbarComponent();

    const decodedToken = getDecodedToken();
    const username = decodedToken.sub;

    const welcomeMessage = document.getElementById("home-welcome-message");
    welcomeMessage.innerText = `Welcome back, ${username}!`

    //TODO
    //think of other content that could go onto the home page.
}