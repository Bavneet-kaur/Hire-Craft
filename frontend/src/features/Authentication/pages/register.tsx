import { useState } from "react";
import "../auth.form.scss"
import { FcGoogle } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../useAuth";
import Loader from "../../../components/loader";
function Register() {
    const { loading, handleRegister } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await handleRegister({ name, email, password });
        navigate('/');
    }
    if (loading) {
        return (
            <main>
                <Loader />
            </main>
        )
    }
    return (
        <>
            <main>
                <div className="form-container">
                    <div className="hero">
                        <div className="logo">
                            <img src="/images/hireCraft.png" alt="HC Logo" />
                            <div className="logo-glow"></div>
                        </div>

                        <h1>Create an account</h1>
                        <p>Start your 30-day free trial.</p>
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" placeholder="John Doe" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="password-rules">
                            <div className="rule">
                                <FaCheckCircle className="icon" />
                                <span>Must be at least 6 characters</span>
                            </div>

                            <div className="rule">
                                <FaCheckCircle className="icon" />
                                <span>Must contain one special character</span>
                            </div>
                        </div>
                        <button className="primary-btn">Get Started</button>
                        <button type="button" className="google-btn">
                            <FcGoogle style={{ width: "20px", height: "20px" }} />  Sign in with Google
                        </button>
                    </form>
                    <p className="bottom-text">
                        Already have an account ?<Link to="/login" style={{ textDecoration: "none", color: "#813599" }}> Log in</Link>
                    </p>
                </div>
            </main>
        </>
    )
}

export default Register;