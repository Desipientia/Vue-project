export const debug = process.env.NODE_ENV !== 'production';
export const root = debug ? 'http://ciddev.tabularasa.host' : '';
export const wsRoot = 'ws://ciddev.tabularasa.host/api/user/';

export const projectName = 'cid';
