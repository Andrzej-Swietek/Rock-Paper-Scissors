import { useEffect, useState } from 'react';
import {io, Socket} from 'socket.io-client';
import {DefaultEventsMap} from "@socket.io/component-emitter";

interface ServerToClientEvents extends DefaultEventsMap {

}

interface ClientToServerEvents extends DefaultEventsMap {

}

interface WebSocketOptions {
    url: string;
}

export const useWebSocket = ({ url }: WebSocketOptions) => {
    const [socket, setSocket] = useState< Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

    useEffect(() => {
        const newSocket = io(url);

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [url]);

    const joinRoom = (roomId: string, username: string) => {
        if (socket) {
            socket.emit('joinRoom', { roomId, username });
        }
    };

    return { socket, joinRoom };
};


/** @Example
 *  const { socket, joinRoom } = useWebSocket({ url: 'your-socket-server-url' });
 *   const [isGameStarted, setIsGameStarted] = useState(false);
 *
 *   useEffect(() => {
 *     if (socket) {
 *       joinRoom('lobby', username);
 *
 *       socket.on('gameStart', () => {
 *         setIsGameStarted(true);
 *       });
 *     }
 *   }, [socket, joinRoom, username]);
 */