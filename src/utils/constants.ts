export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const APIHost = development ? 'http://api.training.div3.pgtest.co/api/v1' : 'https://google.com';

export const ACCESS_TOKEN_KEY = 'token';
