
document.addEventListener("DOMContentLoaded", function() {
    const chatbox = document.getElementById('chatbox');
    const openChatButton = document.getElementById('open-chat');
    const closeChatButton = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendChatButton = document.getElementById('send-chat');
    const chatBody = document.getElementById('chat-body');

    openChatButton.addEventListener('click', function() {
        chatbox.style.display = 'flex';
        openChatButton.style.display = 'none';
    });

    closeChatButton.addEventListener('click', function() {
        chatbox.style.display = 'none';
        openChatButton.style.display = 'block';
    });

    sendChatButton.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message !== '') {
            displayMessage(message, 'user');
            chatInput.value = '';
            // Simulate a bot response
            setTimeout(function() {
                displayMessage('Thank you for reaching out. How can we help you?', 'bot');
            }, 1000);
        }
    }

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.innerHTML = `<span>${message}</span>`;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});
