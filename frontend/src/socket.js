import { io } from 'socket.io-client';

// Use wss:// for secure WebSocket connection
const socket = io('wss://chat-app-5-fhsa.onrender.com', {
    transports: ['websocket'],
    withCredentials: true
});

export default socket;
