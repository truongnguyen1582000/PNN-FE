const STATIC_HOST = process.env.REACT_APP_API_URL;
const SOCKET_HOST = process.env.REACT_APP_SOCKET_URL;
// const STATIC_HOST = 'https://san-capstone.herokuapp.com/api';
const secretKey = process.env.REACT_APP_SECRET_KEY;

module.exports = {
  STATIC_HOST,
  secretKey,
  SOCKET_HOST,
};
