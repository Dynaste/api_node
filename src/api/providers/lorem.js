const axios = require("axios");

exports.getLorem = async (url) => {
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
