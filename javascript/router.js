function initializeViewNavigation() {
    window.addEventListener("hashchange", handleViewChange);
    handleViewChange(); // set initial view
}

function handleViewChange() {
    let view = "login"; // default view

    if (location.hash) {
        view = location.hash.substring(1); // extract the hash from the URL
    }

    initializeView(view)
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

export {initializeViewNavigation};