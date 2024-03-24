import axios from "axios";

const baseURL = "https://us-central1-challenge-8388d.cloudfunctions.net/api";

const instance = axios.create({
    baseURL: baseURL
});

export default instance;
