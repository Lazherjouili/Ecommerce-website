import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const RegisterAdmin = ({setLoggedUser}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', email: '', password: '', confirmPW: '',role:"admin" })
    const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPW: '' })
    const register = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register', user, { withCredentials: true });
            if (response && response.data) {
                console.log('SERVER RESPONSE:', response.data);
                localStorage.setItem('token', response.data.token);
                setLoggedUser(response.data)
                navigate('/');
                // navigate (window.location.href='/')
            } else {
                console.log('Error: No data in the response');
            }
        } catch (error) {
            console.log("Error:", error.response.data);
            // console.log(error);
            let tempErrors = {};
            for (let key of Object.keys(error.response.data)) {
                console.log(key, '------', error.response.data[key].message);
                tempErrors[key] = error.response.data[key].message;
            }
            setErrors({ ...tempErrors });
        }
    };

    return (
        <main className="container mx-auto p-4 mt-12  flex flex-col items-center justify-center min-h-screen ">
            <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
                <h1 className="text-4xl font-semibold">Register</h1>
            </div>

            <form onSubmit={register} className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
                <div className="mb-3">
                    <input
                        type="text"
                        className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                        placeholder="Username"
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        value={user.username}
                    />
                    <span className="text-danger">{errors.username}</span>
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                        placeholder="Email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        value={user.email}
                    />
                    <span className="text-danger">{errors.email}</span>
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                        placeholder="Password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        value={user.password}
                    />
                    <span className="text-danger">{errors.password}</span>
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                        placeholder="Confirm Password"
                        onChange={(e) => setUser({ ...user, confirmPW: e.target.value })}
                        value={user.confirmPW}
                    />
                    <span className="text-danger">{errors.confirmPW}</span>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        className=" w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </form>

            <p className="text-center text-lg">
                Already have an account? &nbsp;
                <Link to={"/login"} className="font-medium text-indigo-500 underline-offset-4 hover:underline">
                    Log In
                </Link>
            </p>
        </main>
    );
};

export default RegisterAdmin;
