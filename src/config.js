export const debug = process.env.NODE_ENV !== 'production';
export const root = debug ? 'https://cid.legal' : '';
export const wsRoot = 'wss://cid.legal/api/user/';

export const projectName = 'cid';
