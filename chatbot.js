// SELECT ELEMENTS
let chatButton = document.getElementById("chatButton");
let chatContainer = document.getElementById("chatContainer");
let closeChat = document.getElementById("closeChat");
let sendBtn = document.getElementById("sendBtn");
let userInput = document.getElementById("userInput");
let chatMessages = document.getElementById("chatMessages");

// OPEN / CLOSE CHAT
chatButton.onclick = function () {
    chatContainer.style.display = "flex";
};

closeChat.onclick = function () {
    chatContainer.style.display = "none";
};

// EVENTS
sendBtn.onclick = sendMessage;

userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// SEND MESSAGE
async function sendMessage() {
    let message = userInput.value.toLowerCase().trim();
    if (message === "") return;

    addMessage(message, "user");

    // CHECK DATABASE FIRST
    let dbReply = await getDatabaseReply(message);
    let reply = dbReply ? dbReply : getBotReply(message);

    // TYPING EFFECT
    setTimeout(() => {
        showTyping();
        setTimeout(() => {
            removeTyping();
            typeMessage(reply);
        }, 800);
    }, 500);

    userInput.value = "";
}

// ADD MESSAGE TO CHAT
function addMessage(text, type) {
    let msg = document.createElement("div");
    msg.className = type;
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// TYPING EFFECT
function showTyping() {
    let typing = document.createElement("div");
    typing.className = "bot";
    typing.id = "typing";
    typing.innerText = "Typing...";
    chatMessages.appendChild(typing);
}

function removeTyping() {
    let typing = document.getElementById("typing");
    if (typing) typing.remove();
}

function typeMessage(text) {
    let msg = document.createElement("div");
    msg.className = "bot";
    chatMessages.appendChild(msg);

    let i = 0;
    let interval = setInterval(() => {
        msg.innerHTML += text.charAt(i);
        i++;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        if (i >= text.length) clearInterval(interval);
    }, 20);
}

// DATABASE (OPTIONAL JSON)
async function getDatabaseReply(msg) {
    try {
        const res = await fetch("data.json");
        const data = await res.json();

        for (let key in data) {
            if (msg.includes(key)) {
                return data[key];
            }
        }
    } catch (err) {
        return null;
    }
    return null;
}

// BOT REPLIES (CLEANING & RENTAL FULL)
function getBotReply(msg) {
    msg = msg.toLowerCase();

    // GREETINGS
    if (msg.includes("kuzuzangpo") || msg.includes("kuzu") || msg.includes("namaste")) {
        return "Kuzuzangpo la! 🙏 Welcome to Premium Clean & Rental. How may I assist you today?";
    } else if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
        return "Hello! 😊 Welcome to Premium Clean & Rental. How can I help you today?";
    } else if (msg.includes("how are you")) {
        return "I'm doing great! 😄 Thanks for asking. How are you today?";
    } else if (msg.includes("good morning")) {
        return "Good morning! ☀️ Ready for a fresh start? How can I assist you?";
    } else if (msg.includes("good afternoon")) {
        return "Good afternoon! 🌤 How can I help you today?";
    } else if (msg.includes("good evening")) {
        return "Good evening! 🌙 How may I assist you this evening?";

    // SMALL TALK
    } else if (msg.includes("what's up") || msg.includes("sup")) {
        return "All good here! 😎 How about you?";
    } else if (msg.includes("weather")) {
        return "I don't have live weather data, but I hope it's sunny and bright where you are! ☀️";
    } else if (msg.includes("joke")) {
        return "Why did the broom get promoted? Because it swept the competition! 😄";
    } else if (msg.includes("story")) {
        return "Once upon a time, a small cleaning company became the most trusted in town… and that's us! 😉";

    // ABOUT BUSINESS
    } else if (msg.includes("who are you") || msg.includes("about service") || msg.includes("what is this")) {
        return "We are Premium Clean & Rental, offering top-notch cleaning services and equipment rental in Bhutan.";
    } else if (msg.includes("location") || msg.includes("where are you")) {
        return "Our main office is in Bhutan 🇧🇹. Visit our website for the exact address.";
    } else if (msg.includes("experience") || msg.includes("expertise")) {
        return "We have years of experience and trained staff to ensure professional cleaning and rental services.";
    } else if (msg.includes("team") || msg.includes("staff")) {
        return "Our staff are friendly, trained, and professional to meet all your cleaning and rental needs.";

    // SERVICES
    } else if (msg.includes("services")) {
        return "We provide home cleaning, office cleaning, deep cleaning, carpet & sofa cleaning, kitchen & bathroom cleaning, and rental of cleaning equipment.";
    } else if (msg.includes("home cleaning") || msg.includes("house cleaning")) {
        return "Our home cleaning service includes dusting, sweeping, mopping, sanitizing, and general upkeep of your home.";
    } else if (msg.includes("office cleaning")) {
        return "We make your workplace spotless and professional with office cleaning services including desks, floors, and common areas.";
    } else if (msg.includes("deep cleaning")) {
        return "Deep cleaning targets hidden dirt and grime in all areas including corners, furniture, and appliances.";
    } else if (msg.includes("sofa cleaning")) {
        return "Sofa cleaning removes dust, stains, and odors, keeping your furniture fresh and clean.";
    } else if (msg.includes("carpet cleaning")) {
        return "Our carpet cleaning service removes dirt, allergens, and stains effectively using safe products.";
    } else if (msg.includes("kitchen cleaning")) {
        return "Kitchen cleaning includes degreasing surfaces, cleaning appliances, and sanitizing counters.";
    } else if (msg.includes("bathroom cleaning")) {
        return "Bathroom cleaning includes tile scrubbing, disinfecting surfaces, and odor removal.";

    // RENTAL
    } else if (msg.includes("rental") || msg.includes("rent")) {
        return "We offer vacuum cleaners, carpet cleaners, floor polishers, and other cleaning equipment for rent.";
    } else if (msg.includes("equipment") || msg.includes("machine")) {
        return "Yes, we provide a wide range of cleaning equipment for rent at affordable prices.";

    // BOOKING
    } else if (msg.includes("book") || msg.includes("appointment") || msg.includes("schedule")) {
        return "You can book our services online or contact us directly via phone or email.";
    } else if (msg.includes("cancel") || msg.includes("reschedule")) {
        return "To cancel or reschedule, please contact us as soon as possible for assistance.";
    } else if (msg.includes("available") || msg.includes("availability")) {
        return "We are available throughout the week. Contact us to check specific time slots.";

    // PRICING & OFFERS
    } else if (msg.includes("price") || msg.includes("cost") || msg.includes("charge")) {
        return "Prices depend on service type and size. Contact us for a detailed quote.";
    } else if (msg.includes("discount") || msg.includes("offer") || msg.includes("promotion")) {
        return "We occasionally run special discounts 🎉. Contact us to know current offers.";
    } else if (msg.includes("payment") || msg.includes("pay")) {
        return "We accept cash, digital wallets, and bank transfers for your convenience.";

    // TIME & PROCESS
    } else if (msg.includes("how long") || msg.includes("duration")) {
        return "Cleaning usually takes 1 to 3 hours depending on area size and service type.";
    } else if (msg.includes("process") || msg.includes("procedure")) {
        return "Our process includes inspection, cleaning, sanitizing, and a final quality check.";

    // SAFETY & TRUST
    } else if (msg.includes("safe") || msg.includes("eco") || msg.includes("environment")) {
        return "We use safe, eco-friendly products 🌱 that are gentle on surfaces and the environment.";
    } else if (msg.includes("trust") || msg.includes("reliable") || msg.includes("quality")) {
        return "We are trusted by many customers for our professional, reliable, and high-quality services.";

    // CONTACT
    } else if (msg.includes("contact") || msg.includes("phone") || msg.includes("call")) {
        return "You can contact us via phone, email, or our website for any inquiries.";
    } else if (msg.includes("email")) {
        return "Please visit our website to get our official email address.";

    // FEEDBACK & COMPLAINTS
    } else if (msg.includes("feedback") || msg.includes("review")) {
        return "We appreciate your feedback! Please share your experience so we can improve.";
    } else if (msg.includes("complaint") || msg.includes("problem") || msg.includes("issue")) {
        return "We’re sorry to hear that 😔. Please contact us directly so we can resolve it quickly.";

    // POLITE CONVERSATION
    } else if (msg.includes("thank") || msg.includes("thanks")) {
        return "You're welcome! 😊 Happy to help anytime.";
    } else if (msg.includes("bye") || msg.includes("goodbye") || msg.includes("see you")) {
        return "Goodbye! 👋 Have a wonderful day!";
    } else if (msg.includes("ok") || msg.includes("okay") || msg.includes("alright")) {
        return "Alright 👍 Let me know if you need any help.";

    // DEFAULT
    } else {
        return "Sorry, I didn’t understand that. You can ask about our services, rentals, bookings, pricing, or promotions.";
    }
}