import axios from "axios";

const instance = axios.create({
    baseURL: "https://smooth-comfort-405104.uc.r.appspot.com",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjdjMzkzODNmNzMxNzY0OTkwZWZmYSIsInVzZXJuYW1lIjoiMDAyNjUxNjQwUyIsImlhdCI6MTcwMTI5OTEyNSwiZXhwIjoxNzAyNTk1MTI1fQ.hWyE9wVhLamdL4cN10uidO_uW6ZuWUCLChHUJQQTUXc"
    },
});

export default instance;
