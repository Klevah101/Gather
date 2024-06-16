import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { thunkSignup } from "../../redux/session";




const LandingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");


    if (sessionUser) return <Navigate to="/main" replace={true} />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkLogin({
                email,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            const loadServers = async () => {
                // await dispatch(thunkGetServers())
                navigate("/main");
            }
            loadServers()
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setErrors({
                confirmPassword:
                    "Confirm Password field must be the same as the Password field",
            });
        }

        const serverResponse = await dispatch(
            thunkSignup({
                email,
                username,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            navigate("/main");
        }
    };

    const loginDemo = async () => {
        await dispatch(
            thunkLogin({
                email: "demo@aa.io",
                password: "password",
            })
        )
        navigate("/main")
    }

    return (
        <>
            <h1>Welcome to gather</h1>
            <h2>Log In</h2>
            {errors.length > 0 &&
                errors.map((message) => <p key={message}>{message}</p>)}
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p>{errors.email}</p>}
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p>{errors.password}</p>}
                <button type="submit">Log In</button>
            </form>
            <button onClick={loginDemo}>Demo login</button>
            <h2>or</h2>
            <h2>Sign Up</h2>
            {errors.server && <p>{errors.server}</p>}
            <form onSubmit={handleSignupSubmit}>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p>{errors.email}</p>}
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors.username && <p>{errors.username}</p>}
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p>{errors.password}</p>}
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <button type="submit">Sign Up</button>
            </form>

        </>
    );
}
export default LandingPage;
