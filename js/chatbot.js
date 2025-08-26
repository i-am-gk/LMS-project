const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbot = document.querySelector(".chatbot");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; 
const inputInitHeight = chatInput.scrollHeight;

// ✅ Create chat list items
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);

    let chatContent = "";
    if (className === "outgoing") {
        chatContent = `<p></p>`;
    } else {
        chatContent = `
            <img src="images/logo.png" alt="Bot" class="bot-avatar">
            <p></p>`;
    }

    chatLi.innerHTML = chatContent;

    // Handle HTML for bot messages, text only for user
    if (className === "outgoing") {
        chatLi.querySelector("p").textContent = message;
    } else {
        chatLi.querySelector("p").innerHTML = message;
    }

    return chatLi;
};

// ✅ Insert welcome message on page load
window.addEventListener("DOMContentLoaded", () => {
    const welcomeMessage = "👋 Hello! <br>I am your assistant from <b>Knowledge Vault</b>. <br>Ask me anything about our <b>services</b>, <b>blogs</b>, or <b>contact details</b>.";
    chatbox.appendChild(createChatLi(welcomeMessage, "incoming"));
});

// ✅ Generate bot response with page redirects
const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");
    let response = "";

    if (userMessage.match(/\b(hi|hello|hey|good morning|good afternoon|good evening)\b/)) {
        const greetings = [
            "👋 Hello! Welcome to <b>Knowledge Vault</b>. How can I assist you today?",
            "🤖 Hi there! I’m your <b>Knowledge Vault Assistant</b>. Do you have a question about our <b>services</b>, <b>blogs</b>, or <b>contact details</b>?",
            "🌟 Hello and welcome! Feel free to ask me about anything related to <b>Knowledge Vault</b>."
        ];
        response = greetings[Math.floor(Math.random() * greetings.length)];
    } 
    else if (userMessage.match(/who|your name|who are you/)) {
        response = "🤖 I’m the <b>Knowledge Vault Assistant</b>, here to guide you with details about our <b>services</b>, <b>blogs</b>, and <b>contact options</b>.";
    } 
    else if (userMessage.match(/service|offer|help/)) {
        response = "💡 You can learn more about what we offer on our <a href='service.html' target='_blank'><b>Services Page</b></a>.";
    } 
    else if (userMessage.match(/blog|articles|posts/)) {
        response = "📝 Our <b>Blogs</b> are filled with insights and updates. Check them out here: <a href='blog.html' target='_blank'><b>Blog Page</b></a>.";
    } 
    else if (userMessage.match(/contact|support|reach|connect/)) {
        response = "📩 You can easily get in touch with us through our <a href='connect.html' target='_blank'><b>Connect Page</b></a>.";
    } 
    else if (userMessage.match(/demo|guidance|trial/)) {
        response = "🎥 Interested in a demo? Visit our <a href='demo.html' target='_blank'><b>Demo Page</b></a>.";
    } 
    else if (userMessage.match(/about|company|details/)) {
        response = "ℹ️ You can read more about us on the <a href='about.html' target='_blank'><b>About Page</b></a>.";
    } 
    else if (userMessage.match(/thank|thanks/)) {
        response = "🙏 You’re most welcome! I’m always here to help. Is there anything else you’d like to know?";
    } 
    else if (userMessage.match(/bye|goodbye|see you/)) {
        response = "👋 Goodbye for now! Have a wonderful day, and don’t hesitate to return if you need assistance with <b>Knowledge Vault</b>.";
    } 
    else {
        response = "🤔 I didn’t quite understand that. You can ask me about our <b>services</b>, <b>blogs</b>, <b>contact</b>, <b>demo</b>, or <b>about</b> page.";
    }

    // Replace typing dots with real response
    setTimeout(() => {
        messageElement.innerHTML = response;
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 1000);
};



// ✅ Handle user chat
const handleChat = () => {
    userMessage = chatInput.value.trim().toLowerCase();
    if(!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append user chat
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    // Append typing dots placeholder
    setTimeout(() => {
        const typingDots = document.createElement("div");
        typingDots.classList.add("typing");
        typingDots.innerHTML = `<span></span><span></span><span></span>`;

        const incomingChatLi = createChatLi("", "incoming");
        incomingChatLi.querySelector("p").appendChild(typingDots);

        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        generateResponse(incomingChatLi);
    }, 600);
};

// ✅ Auto resize textarea
chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// ✅ Send message on Enter (desktop only)
chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);

// ✅ Toggle chatbot visibility
chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
    chatbot.classList.toggle("show");
});
