import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'




const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null); // Define the error state
    const { loginUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        try {
            const success = await loginUser(formData.email, formData.password);
            if (success) {
                navigate('/chat'); 
            } else {
                setError('Invalid email or password'); 
            }
        } catch (err) {
            setError('An unexpected error occurred.'); 
        }
    };


  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-black overflow-hidden">
        <div className="bg-[url('/login-banner.jpg')] bg-cover bg-center hidden md:block relative">
            <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="bg-[url('/login-pattern.png')] bg-cover bg-center text-white p-4 flex flex-col items-center">
            <Link to="/" className='self-start'><img src="/spotify-logo.svg" alt="spotify-logo" className="h-10"/></Link>
            <div className='flex flex-col justify-center gap-5 h-[calc(100vh-80px-32px)] min-w-[288px] w-4/5'>
                <div className="font-semibold text-4xl md:text-[2.7rem] lg:text-[3.60rem]">Welcome Back</div>
                <p>Please enter your login details below</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full my-3 bg-transparent border-2 border-[#4C4D4E] rounded-full text-white px-6 py-3 focus:outline-none focus:border-white"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full my-3 bg-transparent border-2 border-[#4C4D4E] rounded-full text-white px-6 py-3 focus:outline-none focus:border-white"
                    />
                    <div className='text-[#b3b3b3] hover:underline cursor-pointer ml-3'>Forgot password?</div>
                    <button type="submit" className="w-full mt-10 bg-custom-gradient text-black p-2 rounded-full text-lg font-semibold">Login</button>
                </form>
            </div>
            <div className='self-start'>Don't have an account?&#x2800;
                <Link to="/signup" className='font-bold hover:underline cursor-pointer'>Sign Up</Link>
            </div>
        </div>
    </div>
  )
}

export default LoginPage