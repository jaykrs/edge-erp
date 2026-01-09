module.exports = ({ env }) => ({
   P_KEY_ID: env('P_KEY_ID', ''),
    P_SECRECT: env('P_SECRECT', ''),
    api_key: env('api_key', ''),
    url: "http://api.edoctry.com/",
    brevoUrl: "https://api.brevo.com/v3/smtp/email",
    email: "noreply@edoctry.com",
    name: "Noreply Support",
    publicKey: env('publicKey', ''),
    privateKey: env('privateKey', ''),
    urlEndpoint: "https://ik.imagekit.io/jaykrs",
    host: env('DATABASE_HOST', 'localhost'),
    user: env('DATABASE_USERNAME', ''),
    password: env('DATABASE_PASSWORD', ''),
    database: env('DATABASE_NAME', ''),
    port: 3306
});
