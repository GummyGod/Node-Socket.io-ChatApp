const socket = io.connect('http://localhost:4000');

// values for the dom components

const message = document.getElementById('message'),
        handle = document.getElementById('handle'),
        button = document.getElementById('send'),
        output = document.getElementById('output'),
        feedback = document.getElementById('feedback');

// Event emitters (i'll just use vanilla js because no need for a framework for this kinda stuff)

button.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', () => {
    socket.emit('typing',handle.value);
})

// Listen for event

socket.on('chat', (data) => {
    if(data.handle.length) {
        feedback.innerHTML = '';
        output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>'; 
    } else {
        alert('You need to chose a name!')
    }
})

socket.on('typing', (data) => {
    if (data.length) {
        feedback.innerHTML = '<p><em>' + data + ' is typing a message </em></p>';
    };
})