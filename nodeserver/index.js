//Node server which handele socket io connections
const io =require('socket.io')(8000, {
    cors: {
      origin: 'http://127.0.0.1:5500', // Replace with your client-side origin
      methods: ['GET', 'POST'],
     credentials: true // Allow cookies (optional)
    }
  });

const user={};

io.on('connection',(socket)=>{
    socket.on('new-user-joined',(name)=>{
        console.log("new user",name);
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',(message)=>{
        socket.broadcast.emit('receive',{message: message , name: user[socket.id]} )
    });
    socket.on('disconnect',(message)=>{
        socket.broadcast.emit('leave',user[socket.id]);
        delete user[socket.id];
    });
    

});


