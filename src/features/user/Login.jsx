import React, { useState } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import InputText from "../../components/Input/InputText";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
    document.title = "SI Jurnal - Login";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!email) {
            toast.error("Email harus diisi");
            setIsLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Email tidak valid");
            setIsLoading(false);
            return;
        }

        if (!password) {
            toast.error("Password harus diisi");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                email,
                password,
            });

            if (response.data.success) {
                const { roles, token, user } = response.data;
                localStorage.setItem("token", token);

                // Simpan data ke cookies
                Cookies.set("token", token);
                Cookies.set("name", JSON.stringify(user.name));
                Cookies.set("roles", roles[0]);

                let redirectPath = "";
                if (roles.includes("admin")) {
                    redirectPath = "/dashboard-admin";
                } else {
                    console.error("Invalid roles");
                    return;
                }

                toast.success("Login Berhasil!");

                setTimeout(() => {
                    window.location.href = redirectPath;
                }, 2000);

                if (rememberMe) {
                    Cookies.set("rememberedEmail", email);
                } else {
                    Cookies.remove("rememberedEmail");
                }
            } else {
                toast.error("Gagal masuk, email atau kata sandi salah");
            }
        } catch (error) {
            console.error(error);
            toast.error("Terjadi kesalahan saat masuk");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-300 flex items-center">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                    <div>
                        <LandingIntro />
                    </div>
                    <div className="py-24 px-10">
                        <h2 className="text-2xl font-semibold mb-2 text-center">Login SI Jurnal</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <InputText
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    updateType="email"
                                    containerStyle="mt-4"
                                    labelTitle="Email"
                                />
                                <InputText
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    updateType="password"
                                    containerStyle="mt-4"
                                    labelTitle="Password"
                                />
                            </div>
                            <div className="text-right text-primary">
                                <Link to="/forgot-password">
                                    <span className="text-sm inline-block hover:text-primary hover:underline cursor-pointer transition duration-200">
                                        Forgot Password?
                                    </span>
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className={`btn mt-2 w-full btn-primary ${isLoading ? "loading" : ""}`}
                                disabled={isLoading}
                            >
                                {isLoading ? "Loading..." : "Login"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
