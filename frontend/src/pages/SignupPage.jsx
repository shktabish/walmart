import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: null
    })
    const [error, setError] = useState(null) 
    const { signupUser } = useUser()
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            avatar: e.target.files[0]
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null) 
        const success = await signupUser(formData)
        if (success) {
            navigate('/login') 
        } else {
            setError('Signup failed. Please try again.') 
        }
    }

    return (
        <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-black overflow-hidden">
            <div className="bg-[url('https://plus.unsplash.com/premium_photo-1682024745224-2edf92747598?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center hidden md:block relative">
                <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>
            <div className="bg-[url('/login-pattern.png')] bg-cover bg-center text-white p-4 flex flex-col items-center">
                <Link to="/" className='self-start'>
                <img src="/logo-walle.png" alt="spotify-logo" className="h-16  inline-block"/><span className='font-semibold text-3xl mt-8 ml-1'>Chatbot</span>
                </Link>
                <div className='flex flex-col justify-center gap-5 h-[calc(100vh-80px-32px)] min-w-[288px] w-4/5'>
                    <div className="font-semibold text-4xl lg:text-[3.35rem]">Create Account</div>
                    <p>Please fill in the details below</p>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full my-3 bg-transparent border-2 border-[#4C4D4E] rounded-full text-white px-6 py-3 focus:outline-none focus:border-white"
                        />
                        <input 
                            type="email" 
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
                            className="w-full my-3 mb-8 bg-transparent border-2 border-[#4C4D4E] rounded-full text-white px-6 py-3 focus:outline-none focus:border-white"
                        />
                        <label className="text-white cursor-pointer" >
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                            {formData.avatar ? (
                                <>
                                    <span className="bg-transparent border-2 border-[#4C4D4E] py-2 px-4 rounded-full w-max">Select avatar </span>
                                    <span className='ml-4'>{formData.avatar.name}</span> 
                                </>
                            ) : (
                                <span className="bg-transparent border-2 border-[#4C4D4E] py-2 px-4 rounded-full w-max">Select avatar</span>
                            )}
                        </label>
                        <button type="submit" className="w-full mt-10 bg-custom-gradient text-black p-2 rounded-full text-lg font-semibold">Sign Up</button>
                    </form>
                </div>
                <div className='self-start'>Already have an account?&#x2800;
                    <Link to="/login" className='font-bold hover:underline cursor-pointer'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
