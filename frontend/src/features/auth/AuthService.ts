import axios from 'axios';

const API_URL = 'http://localhost:9090/api/users/';


const login = async (userData: any) => {
    const response = await axios.post(API_URL + "login", userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}


const register = async (userData: any) => {
    const response = await axios.post(API_URL + "register", userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const logout = async () => {
    localStorage.removeItem('user');
}

const authService = {
    login,
    register,
    logout
}

export default authService;