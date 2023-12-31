<script>

// CSS styles for the button and icon
const styles = `
.integratly-launcher {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: integratly-slide-in 0.5s;
    align-self: flex-end;
    background-color: rgb(76, 139, 247);
    border: 0;
    border-radius: 50%;
    box-shadow: 0px 2px 10px 1px #ccc;
    height: 60px;
    margin: 20px;
    cursor: pointer;
    width: 60px;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1000;
    transition: transform 0.3s;
}

.integratly-launcher img {
    width: 40px;
    height: 40px;
}

@keyframes integratly-slide-in {
    from {
        transform: translateY(100px);
    }
    to {
        transform: translateY(0);
    }
}

@keyframes integratly-rotation-lr {
    from {
        transform: rotate(-90deg);
    }
    to {
        transform: rotate(0);
    }
}

@keyframes integratly-rotation-rl {
    from {
        transform: rotate(90deg);
    }
    to {
        transform: rotate(0);
    }
}
`;

// Function to create a button on the page
function createChatLauncher() {
    console.log("Creating chat launcher...");

    // Add styles to the page
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Create the button
    const launcher = document.createElement('button');
    launcher.id = 'integratly-launcher';
    launcher.className = 'integratly-launcher';
    launcher.innerHTML = `<img src="https://raw.githubusercontent.com/vsmelov/chatwidget-assets/main/static/launcher_button.svg" alt="Open Chat" />`;

    launcher.onclick = handleLauncherClick;

    document.body.appendChild(launcher);

    console.log("Chat launcher created!");
}

function handleLauncherClick() {
    console.log("Launcher clicked...");
    const launcher = document.querySelector('#integratly-launcher');

    let iframe = document.querySelector('#integratly-iframe');
    let iframeCreated = false;

    if (!iframe) {
        console.log("No iframe found. Creating a new one...");
        iframeCreated = true;
        iframe = document.createElement('iframe');
        iframe.id = 'integratly-iframe';
        iframe.style.width = '600px';
        iframe.style.height = '600px';
        iframe.style.position = 'fixed';
        iframe.style.bottom = '20px';
        iframe.style.right = '20px';
        iframe.style.borderRadius = '10px';
        iframe.style.boxShadow = '0px 2px 10px 1px #ccc';
        iframe.style.zIndex = '999';
        iframe.src = 'https://polished-hill-7509.on.fleek.co/';

        iframe.onload = function() {
            if (iframeCreated) {
                console.log("Iframe loaded for the first time. Hiding the launcher...");
                launcher.style.display = 'none'; // Hide the button after iframe loads
            }
        };

        document.body.appendChild(iframe);
    } else if (iframe.style.display === 'none' || iframe.style.display === '') {
        console.log("Iframe was hidden. Showing it now...");
        iframe.style.display = 'block';

        if (!iframeCreated) {
            console.log("send toggle to child");
            iframe.contentWindow.postMessage({
                type: "TOGGLE_AI_CHAT"
            }, "*");
            launcher.style.display = 'none'; // If iframe already exists, hide the button
        } else {
            console.log("(iframe created) Don't send toggle to child...");
        }

    } else {
        iframe.style.display = 'none';
        launcher.style.display = 'block'; // Show the button
        launcher.style.animation = 'integratly-rotation-rl 0.5s';
        launcher.innerHTML = `<img src="https://raw.githubusercontent.com/vsmelov/chatwidget-assets/main/static/launcher_button.svg" alt="Open Chat" />`;
        console.log("close");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("All scripts executed. Waiting for 1 seconds...");

    setTimeout(function() {
        console.log("1 seconds passed. Initializing chat launcher...");
        createChatLauncher();
    }, 1000);
});

function closeIframeAndResetLauncher() {
    console.log("Closing iframe and resetting launcher...");
    const iframe = document.querySelector('#integratly-iframe');
    if (iframe) {
        iframe.style.display = 'none';
    }

    const launcher = document.querySelector('#integratly-launcher');
    launcher.style.display = 'block'; // Show the button
    launcher.style.animation = 'integratly-rotation-rl 0.5s';
    launcher.innerHTML = `<img src="https://raw.githubusercontent.com/vsmelov/chatwidget-assets/main/static/launcher_button.svg" alt="Open Chat" />`;
}

window.addEventListener("message", function(event) {
    if (event.data.type === "AI_CHAT_CLOSED") {
        console.log("AI chat closed. Handling event...");
        closeIframeAndResetLauncher();
    } else if (event.data.type === "AI_CHAT_OPENED") {
        console.log("AI chat opened. No additional actions for now.");
    }
});

</script>