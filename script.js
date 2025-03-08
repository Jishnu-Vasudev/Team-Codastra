document.getElementById('theme-toggle').addEventListener('change', function() {
    document.body.classList.toggle('light-theme');
    adjustMessageColors();
});

document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
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

    // Simulated bot response
    setTimeout(() => {
        let botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot');
        botMessage.innerText = "Processing...";
        chat.appendChild(botMessage);
        chat.scrollTop = chat.scrollHeight; // Auto-scroll
    }, 500);

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