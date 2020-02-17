// adding new chat document
// setting up a realtime listener to get new chat
// updating the username
// updating the room

class Chatroom{
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chat = db.collection('chat');
        this.unsub;
    };
    
    async addChat(message) {
        const date = new Date();
        const chat = {
            message,
            room: this.room,
            username: this.username,
            created_at: firebase.firestore.Timestamp.fromDate(date)
        }

        // save chat in fire base
        const response = await this.chat.add(chat);
        return response;
    }

    getChat(callback) {
    this.unsub = this.chat
    .where('room', '==', this.room)
    .orderBy('created_at')
    .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(changes => {
            if(changes.type === 'added'){
                callback(changes.doc.data());
            }
        })
    })
    }

    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }

    updateRoom(room){
        this.room = room;
        console.log('room updated')
        if(this.unsub){
            this.unsub();
        }
    }
};

// setTimeout(() => {
//     chatroom.updateRoom('gaming');
//     chatroom.updateName('yoshi');
//     chatroom.getChat(data => {
//         console.log(data);
//     });
//     chatroom.addChat('hello its louie');
// }, 3000);