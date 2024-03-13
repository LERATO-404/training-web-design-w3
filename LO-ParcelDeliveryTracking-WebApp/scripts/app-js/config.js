let apiBaseUrl = "https://localhost:7200";

// get token from storage
let userToken = localStorage.getItem("token");

const authAxios = axios.create({
    baseURL: `${apiBaseUrl}`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Acess-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userToken}`,
    },
    credentials: true,
});