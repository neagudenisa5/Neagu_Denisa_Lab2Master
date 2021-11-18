"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;
connection.on("ReceiveMessage", function (user,prenume, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g,
        "&gt;");
    var today = new Date();
    var date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
    var timp = today.getHours() + ':' + today.getMinutes();
    var encodedMsg = user +" " + prenume + " says " + msg +" in data de "+ date + " la ora " + timp;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});
document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var prenume = document.getElementById("prenumeInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, prenume, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});