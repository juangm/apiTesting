module.exports = async () => {
  const dotenv = require('dotenv');

  // Load env variables from .env file
  if (process.env.DOT_FILE !== undefined) {
    console.log(`Using custom DOT_FILE -> ${process.env.DOT_FILE}`);
    dotenv.config({ path: process.env.DOT_FILE });
  } else {
    dotenv.config({ path: '.env' });
  }
};
