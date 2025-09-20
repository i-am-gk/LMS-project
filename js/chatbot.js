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
    else if (userMessage.match(/how are you|how's it going|how do you do/)) {
        response = "😊 I’m doing great, thanks for asking! How about you?";
    }
    else if (userMessage.match(/good|fine|well/)) {
        response = "🌟 Awesome to hear that! Let me know if you’d like details about <b>services</b>, <b>blogs</b>, or <b>contact</b>.";
    }
    else if (userMessage.match(/what's up|sup/)) {
        response = "🤖 Just here helping people explore <b>Knowledge Vault</b>. What can I do for you?";
    }
    else if (userMessage.match(/who|your name|who are you/)) {
        response = "🤖 I’m the <b>Knowledge Vault Assistant</b>, here to guide you with details about our <b>services</b>, <b>blogs</b>, and <b>contact options</b>.";
    } 
    else if (userMessage.match(/service|offer|help/)) {
        response = "💡 At <b>Knowledge Vault</b>, we provide:<br>✔ Web Development Resources<br>✔ Programming Notes<br>✔ Learning Blogs<br>✔ Tech Guides<br><br>See more on our <a href='services.html' target='_blank'><b>Services Page</b></a>.";
    }
    
    else if (userMessage.match(/course|training|learn|study/)) {
        response = "📘 We offer structured learning resources! Visit our <a href='service.html' target='_blank'><b>Services Page</b></a> to see what suits you.";
    }
    else if (userMessage.match(/solution|product/)) {
        response = "💼 We provide tailored solutions. Take a look at our <a href='service.html' target='_blank'><b>Services</b></a>.";
    }
    else if (userMessage.match(/blog|articles|posts/)) {
        response = "📝 Our <b>Blogs</b> are filled with insights and updates. Check them out here: <a href='blog.html' target='_blank'><b>Blog Page</b></a>.";
    } 
    else if (userMessage.match(/guide|resource|tutorial/)) {
        response = "📚 You’ll love our blogs! They’re packed with tutorials and insights. Visit: <a href='blog.html' target='_blank'><b>Blog Page</b></a>.";
    }
    else if (userMessage.match(/latest news|update/)) {
        response = "📰 Our latest updates are always posted in the <b>Blog Section</b>. Check it out here: <a href='blog.html' target='_blank'><b>Blogs</b></a>.";
    }
    else if (userMessage.match(/contact|support|reach|connect/)) {
        response = "You can reach us at:<br>📧 <b>support@knowledgevault.com</b><br>📞 +92 300 1234567<br><br>Or visit our <a href='connect.html' target='_blank'><b>Connect Page</b></a>.";
    }
    
    else if (userMessage.match(/help me|assist me|need help/)) {
        response = "🙌 Of course! You can reach out anytime on our <a href='connect.html' target='_blank'><b>Connect Page</b></a>.";
    }
    else if (userMessage.match(/phone|email|address/)) {
        response = "📩 You’ll find all our contact details on the <a href='connect.html' target='_blank'><b>Connect Page</b></a>.";
    }
    else if (userMessage.match(/demo|guidance|trial/)) {
        response = "🎥 Interested in a demo? Visit our <a href='demo.html' target='_blank'><b>Demo Page</b></a>.";
    } 
    else if (userMessage.match(/how it works|explain|show me/)) {
        response = "🎬 You can explore a step-by-step demo on our <a href='demo.html' target='_blank'><b>Demo Page</b></a>.";
    }
    else if (userMessage.match(/trial|sample/)) {
        response = "✅ Sure! Our <a href='demo.html' target='_blank'><b>Demo Page</b></a> is the best place to start.";
    }
    else if (userMessage.match(/about|company|details/)) {
        response = "ℹ️ <b>Knowledge Vault</b> is a platform built by passionate software engineers to share knowledge, tutorials, and resources with students and learners. 🚀<br><br>Learn more on our <a href='about.html' target='_blank'><b>About Page</b></a>.";
    }
    
    else if (userMessage.match(/team|who works here|people behind/)) {
        response = "👨‍💻 Our passionate team powers <b>Knowledge Vault</b>. Learn more on the <a href='about.html' target='_blank'><b>About Page</b></a>.";
    }
    else if (userMessage.match(/mission|vision|goal/)) {
        response = "🌍 Our mission is to make knowledge accessible to everyone. More details here: <a href='about.html' target='_blank'><b>About Us</b></a>.";
    }
    else if (userMessage.match(/joke|funny/)) {
        response = "😂 Here’s one: Why don’t programmers like nature? <br>Because it has too many bugs!";
    }
    else if (userMessage.match(/who made you|creator/)) {
        response = "🛠️ I was built by the <b>Knowledge Vault Team</b> to help you explore our platform easily.";
    }
    else if (userMessage.match(/thank|thanks/)) {
        response = "🙏 You’re most welcome! I’m always here to help. Is there anything else you’d like to know?";
    } 
    else if (userMessage.match(/bye|goodbye|see you/)) {
        response = "👋 Goodbye for now! Have a wonderful day, and don’t hesitate to return if you need assistance with <b>Knowledge Vault</b>.";
    } 
    else if (userMessage.match(/ok|alright|fine/)) {
        response = "👌 Great! Let me know if you want details about <b>services</b>, <b>blogs</b>, <b>contact</b>, or <b>demo</b>.";
    }
    else if (userMessage.match(/good night|gn/)) {
        response = "🌙 Good night! Sleep well, and come back anytime for <b>Knowledge Vault</b> assistance.";
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
