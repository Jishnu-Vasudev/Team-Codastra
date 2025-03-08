document.getElementById('theme-toggle').addEventListener('change', function() {
    document.body.classList.toggle('light-theme');
    adjustMessageColors();
});

document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    let inputField = document.getElementById('user-input');
    let chat = document.getElementById('chat');
    let userText = inputField.value.trim();
    
    if (userText === "") return;

    // Append user message
    let userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.innerText = userText;
    chat.appendChild(userMessage);

    inputField.value = ""; // Clear input
    chat.scrollTop = chat.scrollHeight; // Auto-scroll

    adjustMessageColors();

    try {
        let botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot');

        const response = await fetch("http://localhost:5500/process-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ param: userText }) // Send the input as JSON
        });

        const data = await response.json();

        if (data.result) {
            botMessage.innerText = data.result;
        } else {
            botMessage.innerText = "Sorry, I couldn't process that.";
        }   
        
        chat.appendChild(botMessage);
        chat.scrollTop = chat.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        let botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot');
        botMessage.innerText = `Error processing request: ${error.message}`;
        chat.appendChild(botMessage);
        console.error(error);
    }
    adjustMessageColors();
}

function adjustMessageColors() {
    let userMessages = document.querySelectorAll('.message.user');
    let botMessages = document.querySelectorAll('.message.bot');
    
    if (document.body.classList.contains('light-theme')) {
        userMessages.forEach(msg => msg.style.color = "black");
        botMessages.forEach(msg => msg.style.color = "black");
    } else {
        userMessages.forEach(msg => msg.style.color = "magenta");
        botMessages.forEach(msg => msg.style.color = "cyan");
    }
}

// Initial call to adjust message colors on page load
adjustMessageColors();