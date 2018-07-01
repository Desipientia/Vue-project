export const debug = process.env.NODE_ENV !== 'production';
export const root = debug ? 'http://tokensale.cid.legal' : '';
export const wsRoot = 'ws://tokensale.cid.legal/api/user/';

export const projectName = 'cid';
