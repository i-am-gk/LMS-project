const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbot = document.querySelector(".chatbot");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; 
const inputInitHeight = chatInput.scrollHeight;

// Create chat list items
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" 
        ? `<p></p>` 
        : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

// Generate bot response
const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");
    let response = "🤖 I didn’t quite catch that. You can ask me about Services, Blogs, or Contact details!";

    if (userMessage.match(/\b(hi|hello|hey)\b/)) {
        response = "👋 Hello! Great to see you here at Knowledge Vault. How can I assist you today?";
    } else if (userMessage.match(/who|your name|who are you/)) {
        response = "🤖 I’m the Knowledge Vault Assistant, here to guide you with Services, Blogs, Contact info, and more.";
    } else if (userMessage.match(/service|offer|help/)) {
        response = "💡 We provide a range of services designed to help you grow and succeed. Please check the Services page for details.";
    } else if (userMessage.match(/blog|articles|posts/)) {
        response = "📝 Our Blogs are full of insights, knowledge, and updates. Head over to the Blogs page to explore!";
    } else if (userMessage.match(/contact|support|reach/)) {
        response = "📩 You can get in touch with us via the Contact form. We’d love to hear from you!";
    } else if (userMessage.match(/thank|thanks/)) {
        response = "🙏 You’re most welcome! Always happy to help. Anything else you’d like to know?";
    } else if (userMessage.match(/bye|goodbye|see you/)) {
        response = "👋 Goodbye! Have a wonderful day and don’t forget to explore Knowledge Vault.";
    }

    // Replace "Typing..." with real response
    setTimeout(() => {
        messageElement.textContent = response;
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 1000); // simulate typing delay
}

// Handle user chat
const handleChat = () => {
    userMessage = chatInput.value.trim().toLowerCase();
    if(!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    // Add "Typing..." placeholder
    setTimeout(() => {
        const incomingChatLi = createChatLi("Typing...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

// Auto resize textarea
chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// Send message on Enter (desktop only)
chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);

// Toggle chatbot visibility
chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
    chatbot.classList.toggle("show");
});
