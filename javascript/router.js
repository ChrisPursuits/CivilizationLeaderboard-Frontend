import {initRegisterScript} from "./register.js";

function initializeViewNavigation() {
    window.addEventListener("hashchange", handleViewChange);
    handleViewChange(); // set initial view
}





async function handleViewChange() {
    let view = "login"; // default view

    if (location.hash) {
        view = location.hash.substring(1); // extract the hash from the URL
    }

    await initializeView(view)
    initializeCorrespondingScript(view);
}





async function initializeView(view) {
    const app = document.getElementById("app");

    try {
        const response = await fetch(`/views/${view}.html`);
        const selectedView = await response.text();

        app.innerHTML = selectedView
    }catch (error) {
        console.error(error)
        app.innerHTML = `<p> Could not load view: ${view}</p>`
    }
}





function initializeCorrespondingScript(view) {

    switch (view) {
        case "login": {
            initLoginScript();
            break;
        }

        case "register": {
            initRegisterScript();
            break;
        }

        default: throw new Error(`The view: ${view} does not exist/have a apparent script`)
    }

}
export {initializeViewNavigation};