import axios from "axios";

const baseURL="http://localhost:2005";  // baseURL is case sensitive-dont change it

const publicAxios=axios.create({baseURL});

export {publicAxios,baseURL};