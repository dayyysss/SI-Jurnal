import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email !== null && password !== null) {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setUser(email)
                    setAuthState('home')
                })
                .catch((err) => alert(err));
        }
    }

    return (
        <div className="relative flex items-center justify-center w-full h-screen bg-gray-100">
            <div className="w-full max-w-md px-6 py-8 mx-4 bg-white border-2 border-gray-100 rounded-3xl shadow-lg sm:mx-6 lg:mx-8">
                <h1 className="text-3xl font-semibold text-center">Login SI Jurnal</h1>
                <p className="mt-4 text-lg font-medium text-center text-gray-500">Welcome back! Please enter your details.</p>
                <div className="mt-8">
                    <div className="flex flex-col">
                        <label className="text-lg font-medium">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 mt-1 border-2 border-gray-100 rounded-xl bg-transparent"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label className="text-lg font-medium">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 mt-1 border-2 border-gray-100 rounded-xl bg-transparent"
                            placeholder="Enter your password"
                            type="password"
                        />
                    </div>
                    <div className="flex items-center justify-between mt-8">
                        <div>
                            <input type="checkbox" id="remember" />
                            <label className="ml-2 text-base font-medium" htmlFor="remember">Remember for 30 days</label>
                        </div>
                        <button className="text-base font-medium text-violet-500">Forgot password</button>
                    </div>
                    <div className="flex flex-col gap-4 mt-8">
                        <button
                            onClick={handleLogin}
                            className="py-4 text-lg font-bold text-white transition-all transform bg-violet-500 rounded-xl active:scale-95 hover:scale-105"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
