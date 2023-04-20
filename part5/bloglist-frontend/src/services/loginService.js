import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials) => {
    const { data } = await axios.post(baseUrl, credentials)
    return data
}

const sendToken = async (token) => {
    return await axios.post(`${baseUrl}/verify-token`, null, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}


export default {
    login,
    sendToken,
}