function chatbot(input){
    let output = "";
    input = input.toLowerCase();
    if(input.includes("hello") || input.includes("hi")){
        output = "Hello, nice to meet you !!";
    }
    else if(input.includes("how are you")){
        output = "I'm doing fine, thank you for asking.";
    }
    else if(input.includes("what is your name")){
        output = "My name is chatbot.";
    }
    else if(input.includes("what can you do")){
        output = "I can chat with you and answer some simple questions.";
    }
    else{
        output = "Sorry, I don't understand that. Please try something else.";
    }
    return output;
}

// Display user message
function displayUserMessage(message){
    let chat = document.getElementById("chat-box");
    let userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");

    let userAvatar = document.createElement("div");
    userAvatar.classList.add("avatar");

    let userText = document.createElement("div");
    userText.classList.add("text");
    userText.innerHTML = message;

    userMessage.appendChild(userText);
    userMessage.appendChild(userAvatar);
    chat.appendChild(userMessage);
    chat.scrollTop = chat.scrollHeight;
}

// Display bot message
function displayBotMessage(message){
    let chat = document.getElementById("chat-box");
    let botMessage = document.createElement("div");
    botMessage.classList.add("message", "bot");

    let botAvatar = document.createElement("div");
    botAvatar.classList.add("avatar");

    let botText = document.createElement("div");
    botText.classList.add("text");
    botText.innerHTML = message;

    botMessage.appendChild(botAvatar);
    botMessage.appendChild(botText);
    chat.appendChild(botMessage);
    chat.scrollTop = chat.scrollHeight;
}

// Send message function
function sendMessage(){
    let input = document.getElementById("input-box").value;
    if(input.trim() !== ""){
        displayUserMessage(input);
        let output = chatbot(input);
        setTimeout(function(){
            displayBotMessage(output);
        }, 1000);
        document.getElementById("input-box").value = "";
    }
}

// Click event for button
document.getElementById("button").addEventListener("click", sendMessage);

// Keypress event for Enter key
document.getElementById("input-box").addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        sendMessage();
    }
});
