import "../auth.form.scss"
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
function Login() {
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

                        <h1>Log in to your account</h1>
                        <p>Welcome back! Please enter your details</p>
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="john@example.com" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" />
                        </div>
                        <div className="row">
                            <label className="remember">
                                <input type="checkbox" /> Remember for 30 days
                            </label>
                            <span className="forgot">Forgot Password</span>
                        </div>
                        <button className="primary-btn">Login</button>
                        <button type="button" className="google-btn">
                            <FcGoogle style={{ width: "20px", height: "20px" }} />  Sign in with Google
                        </button>
                    </form>
                    <p className="bottom-text">
                        Don’t have an account? <Link to="/register" style={{textDecoration:"none" , color:"#813599"}}>Sign up</Link>
                    </p>
                </div>
            </main>
        </>
    )
}

export default Login;