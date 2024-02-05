import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({setLoggedUser}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });

    const login = async (e) => {
        e.preventDefault();
        console.log("Inside Login");
        try {
            const response = await axios.post('http://localhost:8000/api/login', user, { withCredentials: true });
            console.log('SERVER RESPONSE:', response.data);
            localStorage.setItem('token', response.data.token);
            setLoggedUser(response.data)
            navigate('/');
            // navigate (window.location.href='/')
        } catch (error) {
            console.log('Error:', error.response.data);
            let tempErrors = {};
            for (let key of Object.keys(error.response.data)) {
                console.log(key, '------', error.response.data[key].message);
                tempErrors[key] = error.response.data[key].message;
            }
            setErrors({ ...tempErrors });
        }
    };

    return (
        <main className="container mx-auto p-4 mt-12 flex flex-col items-center justify-center min-h-screen  ">
            <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
                <h1 className="text-4xl font-semibold">Welcome back.</h1>
            </div>
            <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
                <form onSubmit={login}>
                    <input
                        className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        value={user.email}
                    />
                    <span className="text-danger">{errors.email}</span>
                    <input
                        className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        value={user.password}
                    />
                    <span className="text-danger">{errors.password}</span>
                    <div className="flex items-center justify-center">
                        <button
                            className=" w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
                            type="submit"
                        >
                            Log In
                        </button>
                        
                    </div>
                </form>
                <p className="text-center text-lg mt-8">
                I don't have an Account? &nbsp;
                <Link to ={"/register"} className="font-medium text-indigo-500 underline-offset-4 hover:underline">
                    Sign Up
                </Link>
            </p>
            </div>
        </main>
    );
};

export default Login;
