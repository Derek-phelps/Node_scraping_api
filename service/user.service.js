const constants = require('../config/index');
const api = require('../api/api');

const getUserData = async () => {
  try {
    const response = await api.get(
      constants.USER_API_URL,
      constants.USER_COOKIE
    )
    return JSON.stringify(response)
  } catch (err) {
    return err.message
  }
} 

exports.getUserData = getUserData
