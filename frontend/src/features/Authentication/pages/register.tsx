import "../auth.form.scss"
import { FcGoogle } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";
function Register() {
    const handleSubmit = (e: any) => {
        e.preventDefault();
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
                            <input type="text" id="name" name="name" placeholder="John Doe" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="john@example.com" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" />
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
                        Already have an account ?<Link to="/login" style={{textDecoration:"none" , color:"#813599"}}> Log in</Link>
                    </p>
                </div>
            </main>
        </>
    )
}

export default Register;