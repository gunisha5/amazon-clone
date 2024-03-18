import axios from "axios";

const baseURL = "http://127.0.0.1:5001/challenge-8388d/us-central1/api";

const instance = axios.create({
    baseURL: baseURL
});

export default instance;
