let socket = io("http://localhost:3000");

const btnSend = document.getElementById("btnSend");
const inputMessage = document.getElementById("inputMessage");
const listMessages = document.getElementById("listMessages");

const username = prompt("Ingrese tu usuario");
socket.emit("set-username", username);

const sendMessage = () => {
  const message = inputMessage.value.trim();
  if (message) {
    socket.emit("mensaje", message);
    inputMessage.value = "";
    inputMessage.focus();
  }
};

const createMessageElement = (senderUsername, text) => {
  const li = document.createElement('li');
  // Usa las clases de diseño
  li.classList.add('wa-message');
  if (senderUsername === username) {
    li.classList.add('sent');
  } else {
    li.classList.add('received');
  }

  li.innerHTML = `
    <div class="wa-message-user">${senderUsername}</div>
    <div class="wa-message-text">${text}</div>
  `;
  return li;
};

socket.on("respuesta", (data) => {
  const messageElement = createMessageElement(data.username, data.text);
  listMessages.appendChild(messageElement);
  // Scroll automático al último mensaje
  listMessages.scrollTop = listMessages.scrollHeight;
});

// Event listeners
btnSend.addEventListener("click", (e) => {
  e.preventDefault();
  sendMessage();
});

inputMessage.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});