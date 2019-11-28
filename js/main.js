document.addEventListener("DOMContentLoaded", run);

const db = firebase.firestore();

document.getElementById('submit').addEventListener("click", function(){
    messageInput();
})

function run(){
    console.log("run function");
    // db.collection("messages").add({
    //     username: "Aurimas",
    //     message: "This is a message",
    // })    

    // db.collection("messages").add({
    //     username: "User 1",
    //     message: "This is a message 2",
    // })
    
    getChatList();
}

function getChatList() {
    var docRef = db
    .collection("messages")
    .get()
    .then(r => {
        let list = [];
        r.forEach(m => {
            list.push(m.data());
            document.querySelector(".chat-area").innerHTML = render(list);
            
        });

    });
}

function render(list) {
    output = list.map(m => `<p><strong> ${m.username}: </strong> ${m.message}</p>`).join("");
    return output;
}

function messageInput(){
    let usernameValue, messageValue;

    usernameValue = document.querySelector("#username").value;
    messageValue = document.querySelector("#message").value;


    if(!usernameValue || !messageValue){
        return;
    }
    else {
        db.collection("messages").add({
            username: usernameValue,
            message: messageValue,
        })

        getChatList();
    }
}