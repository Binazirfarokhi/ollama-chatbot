// let btn = document.getElementById("btn");
// let sumbitBtn = document.getElementById("sumbitBtn");
// let resultOutput = document.getElementById("resultOutput");


// sumbitBtn.addEventListener("click", async function(){
//     const userPrompt = btn.value;
//     if (userPrompt.trim() === ""){
//         resultOutput.textContent = "Please provide a question first";
//         return;
//     }
//     resultOutput.textContent = "Thinking....";
//     try {
//         const response = await fetch("http://localhost:11434/api/generate", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             model: "mistral",
//             prompt: userPrompt,
//             stream: false
//           })
//         });
//         const data = await response.json();
//         resultOutput.textContent = data.response;
//     }
//     catch(error){
//         resultOutput.textContent = "ERROR! CHECK IS OLLAMA IS RUNNING";
//         console.log(error)
//     }

// })
let questionInput = document.getElementById("questionInput");
let submitBtn = document.getElementById("submitBtn");
let chatBox = document.getElementById("chatBox");

submitBtn.addEventListener("click", sendMessage);

questionInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {
  const userPrompt = questionInput.value;

  if (userPrompt.trim() === "") {
    return;
  }

  addMessage(userPrompt, "user-message");

  questionInput.value = "";

  const thinkingMessage = addMessage("Thinking...", "bot-message");

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral",
        prompt: userPrompt,
        stream: false
      })
    });

    const data = await response.json();

    thinkingMessage.textContent = data.response;
  } catch (error) {
    thinkingMessage.textContent = "Error: Check if Ollama is running.";
    console.log(error);
  }
}

function addMessage(text, className) {
  const messageDiv = document.createElement("div");

  messageDiv.classList.add("message");
  messageDiv.classList.add(className);

  messageDiv.textContent = text;

  chatBox.appendChild(messageDiv);

  chatBox.scrollTop = chatBox.scrollHeight;

  return messageDiv;
}
