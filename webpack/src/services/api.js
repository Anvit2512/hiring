import axios from 'axios';

// Axios instance
const API = axios.create({ baseURL: 'http://127.0.0.1:8000' });

export const getSkillRecommendations = async (data) => {
    try {
        const response = await API.post('/recommend-skills/', data);
        return response.data.recommendations;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
};
