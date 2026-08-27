// Mock Socket.io client implementation for offline/mock mode

const mockSocket = {
    connected: true,
    on: (event, callback) => {
        console.log(`MockSocket: listening on event '${event}'`);
        // Save callback for simulation if needed
    },
    off: (event) => {
        console.log(`MockSocket: stopped listening on event '${event}'`);
    },
    emit: (event, data) => {
        console.log(`MockSocket: emit event '${event}' with data:`, data);
    },
    disconnect: () => {
        console.log('MockSocket: disconnected');
    }
};

export const connectSocket = (token) => {
    console.log('MockSocket: connecting with token', token);
    return mockSocket;
};

export const disconnectSocket = () => {
    console.log('MockSocket: disconnecting');
};

export const getSocket = () => mockSocket;
export default mockSocket;
