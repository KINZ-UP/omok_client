import client from './client';

export const getRooms = () => client.get('/api/rooms');

export const create = (roomInfo) => client.post('/api/rooms/create', roomInfo);

export const join = ({ roomId, username }) =>
  client.patch(`/api/rooms/join/${roomId}`, { username });
