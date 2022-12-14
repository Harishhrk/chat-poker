$(document).ready(()=>{
    const socket = io.connect();
  
    //Keep track of the current user
    let currentUser;

    // Get the online users from the server
    socket.emit('get online users');
  
    $('#create-user-btn').click((e)=>{
      e.preventDefault();
      if($('#username-input').val().length > 0){
        socket.emit('new user', $('#username-input').val());
        // Save the current user when created
        currentUser = $('#username-input').val();
        $('.username-form').remove();
        $('.main-container').css('display', 'flex');
      }
    });
  
    $('#send-chat-btn').click((e) => {
      e.preventDefault();
      // Get the message text value
      let message = $('#chat-input').val();
      // Make sure it's not empty
      if(message.length > 0){
        // Emit the message with the current user to the server
        socket.emit('new message', {
          sender : currentUser,
          message : message,
        });
        $('#chat-input').val("");
      }
    });
  
    //socket listeners
    socket.on('new user', (username) => {
      console.log(`${username} has joined the chat`);
      $('.users-online').append(`<div class="user-online">${username}</div>`);
    })

    socket.on('new message', (data) => {
        $('.message-container').append(`
          <div class="message">
            <p class="message-user">${data.sender}: </p>
            <p class="message-text">${data.message}</p>
          </div>
        `);
      })
      socket.on('get online users', (onlineUsers) => {
        //You may have not have seen this for loop before. It's syntax is for(key in obj)
        //Our usernames are keys in the object of onlineUsers.
        for(username in onlineUsers){
          $('.users-online').append(`<div class="user-online">${username}</div>`);
        }
      })
      socket.on('user has left', (onlineUsers) => {
        $('.users-online').empty();
        for(username in onlineUsers){
          $('.users-online').append(`<p>${username}</p>`);
        }
      });
  
  })