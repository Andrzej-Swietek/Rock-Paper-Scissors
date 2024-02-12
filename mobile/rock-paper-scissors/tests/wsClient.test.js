import  { io } from "socket.io-client"
const WS_SERVER = "ws://localhost:3030/";

describe('WS TEST', ()=> {
    test('Connection', ()=>{
        const socket = io(WS_SERVER)
        socket.emit('chat', "test");
        socket.on('hello',(e)=>{
            console.log("HELLO: " + e)
        })
    })
})