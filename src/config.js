export const debug = process.env.NODE_ENV !== 'production';
export const root = debug ? 'https://cid.legal' : '';
export const wsRoot = 'ws://cid.legal/api/user/';

export const projectName = 'cid';
