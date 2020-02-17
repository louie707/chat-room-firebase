// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
// add new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();

    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
})

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();

    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    
    updateMssg.innerText = `Your Name is updated to ${newName}`;
    setTimeout(() => updateMssg.innerText = '', 3000);
});

// update chat rooms
rooms.addEventListener('click', e => {
    e.preventDefault();

    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'))
        chatroom.getChat(chat => chatUI.render(chat))
    }
})

// check localstorage for  a name
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username)

// get chat and render
chatroom.getChat(data => {
    chatUI.render(data)
})