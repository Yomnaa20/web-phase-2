

function search() {
    const searchTerm = document.getElementById("Search").value;
    if (searchTerm === "cyber security") {
        window.location.href = "foundationsofcybersecurity.html";
    } else if (searchTerm === "operating system") {
        window.location.href = "Operatingsystem.html";
    } else if (searchTerm === "finance") {
        window.location.href = "finance.html";
    } else if (searchTerm === "design") {
        window.location.href = "design.html";
    } else {
        alert("No results found for '" + searchTerm + "'");
    }
}

window.search = search;

let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");

    if (n >= slides.length) {
        slideIndex = 0;
    }

    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex].style.display = "block";
}

window.plusSlides = plusSlides;
window.search = search;
// Example data that could be fetched from a server
// Example data that could be fetched from a server
const coursesInProgress = [
{ name: 'Web Development Basics', progress: 60 },
{ name: 'Advanced JavaScript', progress: 80 },
{ name: 'Introduction to Python', progress: 45 },
];

// Function to update the progress bars
function updateProgressBars() {
const courseElements = document.querySelectorAll('.course-card');
courseElements.forEach((courseElement, index) => {
    const progressBar = courseElement.querySelector('.progress-bar');
    const progressPercent = courseElement.querySelector('.progress-percent');
    const progress = coursesInProgress[index].progress;

    progressBar.style.width = `${progress}%`;
    progressPercent.textContent = `${progress}%`;
});
}

// Call the function to update the progress bars on page load
document.addEventListener('DOMContentLoaded', updateProgressBars);



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
