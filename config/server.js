module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  P_KEY_ID: env('P_KEY_ID', ''),
  P_SECRECT: env('P_SECRECT', ''),
  api_key: env('api_key', ''), 
  url: env('url', ''),
  brevoUrl: env('brevoUrl', ''),
    email: env('email', ''),
    name: env('name', ''),
    publicKey: env('publicKey', ''),
    privateKey: env('privateKey', ''),
    urlEndpoint: env('urlEndpoint', ''),
    hostD: env('hostD', ''),
    user: env('user', ''),
    password:env('password', ''),
    database: env('database', ''),
    portD: env('portD', '')
});
