export default () => ({
  mail: {
    host: process.env.MAIL_SMTP_DOMAIN,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
    url_confirm: process.env.MAIL_URL_CONFIRM,
  },
  redis: {
    host: process.env.QUEUE_HOST,
    port: parseInt(process.env.QUEUE_PORT)
  }
});