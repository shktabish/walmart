import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const loginUser = async (email, password) => {
        try {
            const response = await axios.post('/api/v1/user/login', { email, password }, { withCredentials: true })
            setUser(response.data.user)
            return true
        } catch (error) {
            console.error("Login failed", error)
            return false
        }
    }

   
    const signupUser = async (formData) => {
        try {
          
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'avatar' && formData[key]) {
                    data.append(key, formData[key]); 
                } else {
                    data.append(key, formData[key]); 
                }
            });
    
            const response = await axios.post('/api/v1/user/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
    
            
            setUser(response.data.user);
            return true;
        } catch (error) {
            console.error("Signup failed", error.response?.data || error.message);
            return false;
        }
    };
    

    const logoutUser = async () => {
        try {
            await axios.get('/api/v1/user/logout', { withCredentials: true })
            setUser(null)
        } catch (error) {
            console.error("Logout failed", error)
        }
    }

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get('/api/v1/user/me', { withCredentials: true })
            setUser(response.data.user)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <UserContext.Provider value={{ user, loading, loginUser, signupUser, logoutUser, fetchCurrentUser }}>
            {children}
        </UserContext.Provider>
    )
}
