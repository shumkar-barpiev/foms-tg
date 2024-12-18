const axios = require("axios");
const { BASE_URL, getAuthTokens } = require("@/utils/auth");

const createChatAppeal = async (msgObj) => {
  const { csrfToken, jSessionId } = await getAuthTokens();

  if (!!csrfToken && !!jSessionId) {
    const url = `${BASE_URL}/foms/ws/rest/com.axelor.apps.msg.db.Appeal`;
    const requestBody = {
      data: {
        name: msgObj.from.username,
        firstName: msgObj.from.first_name,
        status: "1", // 1 - Available, 2 -In Progress, 3- Сompleted
      },
    };

    const requestHeader = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: `${csrfToken}; ${jSessionId}`,
      },
    };

    const response = await axios.post(url, requestBody, requestHeader);

    if (response.status === 200 && response.data.status === 0) {
      return response.data.data[0];
    } else {
      return null;
    }
  }
};

module.exports = { createChatAppeal };
