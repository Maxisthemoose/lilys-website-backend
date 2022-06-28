const axios = require("axios").default;

module.exports = async function (emailData) {
  const template_params = {};
  for (const key of Object.keys(emailData)) {
    if (key === "") continue;
    else template_params[key] = emailData[key];
  }
  const data = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    accessToken: process.env.EMAIL_JS_ACCESS_TOKEN,
    template_params,
  }

  await axios.post("https://api.emailjs.com/api/v1.0/email/send", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}