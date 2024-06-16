const  socket= io('http://localhost:8000');

const form = document.querySelector('.form');
const msginput = document.querySelector('.msginp');
const msgcontainer = document.querySelector('.container');
var insound=new Audio('msg-recive.mp3');
var outsound=new Audio('msg-sent.mp3');

const name=prompt("Enter your name to join chat");

    socket.emit('new-user-joined',name);


 
const append =(msg,position)=>{
    let messageElement  = document.createElement('div');
    messageElement.innerHTML=msg;
    messageElement.classList.add('message',position);
    msgcontainer.append(messageElement);
    
};

socket.on('user-joined',(name)=>{
    append(`${name} joined the chat`,'right');
});


form.addEventListener('submit',(e) => {
    e.preventDefault();
    const message=msginput.value;
    append(`you: ${message}`,'right');
    outsound.play();
    socket.emit('send',message);
    msginput.value='';

});

socket.on('receive',(data)=>{
    append(`${data.name}: ${data.message}`,'left');
    insound.play();
});

socket.on('leave',(name)=>{
    append(`${name} left the chat`,'right');
    
});
