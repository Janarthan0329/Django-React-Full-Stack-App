import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/Form.css';
import Loadingindicator from "./Loadingindicator";

function Form ({ route, method }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        }
        catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container" autoComplete="off">
            <h1>{name}</h1> 
            <input className="form-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="new-username" />     
            <input className="form-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />     
            {loading && <Loadingindicator />}
            <button className="form-button" type="submit">{name}</button>      
        </form>
    )
}

export default Form