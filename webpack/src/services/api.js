import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:2005' });  // fixed baseURL

export const getSkillRecommendations = async (data) => {
    try {
        const response = await API.post('/handle/recommend-skills', data);  // removed trailing slash
        return response.data.recommendations;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
};
