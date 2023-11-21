import  { io } from "socket.io-client"

describe('WS TEST', ()=> {
    test('Connection', ()=>{
        const socket = io("ws://localhost:3030/")
        socket.emit('chat', "test");
        socket.on('hello',()=>{

        })
    })
})