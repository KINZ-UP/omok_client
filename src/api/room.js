import client from './client';

export const create = (roomInfo) => client.post('/api/rooms/create', roomInfo);
