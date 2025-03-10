import { io } from 'socket.io-client';

// Use wss:// if the server is using HTTPS
const socket = io('wss://chat-app-5-fhsa.onrender.com');

export default socket;
