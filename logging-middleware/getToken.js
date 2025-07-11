// logging-middleware/getToken.js
const axios = require("axios");

async function getAuthToken() {
    const payload = {
        email: "pragyajha314@gmail.com",
        name: "pragya jha",
        mobileNo: "8700019478",
        githubusername: "Pragya3104",
        rollNo: "11022210053",
        accessCode: "FbGgFU",
        clientID: "3ad0e6f9-91a7-451f-96a3-d8931ebaf5ac",
        clientSecret: "vbCkrtykMyNDJEdY"
    };

    try {
        const res = await axios.post("http://20.244.56.144/evaluation-service/auth", payload);
        console.log("Your Auth Token:\n", res.data["access token"]);
    } catch (err) {
        console.error("Auth error:", err.message);
        if (err.response) {
            console.error("Details:", err.response.data);
        }
    }
}

getAuthToken();
