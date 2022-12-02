module.exports = (io, socket, onlineUsers) => {

    socket.on('new user', (username) => {
        //Save the username as key for the user socket id
        onlineUsers[username] = socket.id;
        //Save the username to socket .
        socket["username"] = username;
        console.log(` ${username} has joined the chat! `);
        io.emit("new user", username);
      })
  
    //Listen for new messages
    socket.on('new message', (data) => {
      // Send that data back to ALL clients
      console.log(` ${data.sender}: ${data.message} `)
      io.emit('new message', data);
    })

    socket.on('get online users', () => {
        //Send over the onlineUsers
        socket.emit('get online users', onlineUsers);
      })
    
    socket.on('disconnect', () => {
        //This deletes the user by using the username from 
        delete onlineUsers[socket.username]
        io.emit('user has left', onlineUsers);
      });
  
  }