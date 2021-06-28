import { handleCloseChannel } from '../lib/styles/createSocketChannel';

const CONNECT = 'socket/CONNECT';
const DISCONNECT = 'socket/DISCONNECT';
const OPEN_CHANNEL = 'socket/OPEN_CHANNEL';
const CLOSE_CHANNEL = 'socket/CLOSE_CHANNEL';

export const connect = (socket) => ({
  type: CONNECT,
  payload: socket,
});
export const disconnect = () => ({
  type: DISCONNECT,
});
export const openChannel = (name, channel) => ({
  type: OPEN_CHANNEL,
  payload: { name, channel },
});
export const closeChannel = (name) => ({
  type: CLOSE_CHANNEL,
  payload: name,
});

const initialState = {
  socket: null,
  channels: {},
};

export default function socket(state = initialState, action) {
  switch (action.type) {
    case CONNECT: {
      return {
        ...state,
        socket: action.payload,
      };
    }
    case DISCONNECT: {
      state.socket.disconnect();
      return {
        ...state,
        socket: null,
      };
    }
    case OPEN_CHANNEL: {
      const { name, channel } = action.payload;
      return {
        ...state,
        channels: {
          ...state.channels,
          [name]: channel,
        },
      };
    }
    case CLOSE_CHANNEL: {
      const name = action.payload;
      const channel = state.channels[name];
      handleCloseChannel(channel);
      return {
        ...state,
        channels: {
          ...state.channels,
          [name]: null,
        },
      };
    }
    default:
      return state;
  }
}
