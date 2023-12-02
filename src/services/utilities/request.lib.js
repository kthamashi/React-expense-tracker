import axios from "axios";


const instance = axios.create({
    // baseURL: import.meta.env.REACT_APP_API_BASE_URL,
    baseURL: "https://smooth-comfort-405104.uc.r.appspot.com",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjdjMzkzODNmNzMxNzY0OTkwZWZmYSIsInVzZXJuYW1lIjoiMDAyNjUxNjQwUyIsImlhdCI6MTcwMTI5OTEyNSwiZXhwIjoxNzAyNTk1MTI1fQ.hWyE9wVhLamdL4cN10uidO_uW6ZuWUCLChHUJQQTUXc"
    },
});

// instance.interceptors.request.use(
//     (config: any) => {
//         const user = getValue("user")
//         if (user) {
//             config.headers["Authorization"] = `Bearer ${user.stsTokenManager.accessToken}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default instance;
