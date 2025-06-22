import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LogoutButton({ className }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        const isconfirm = window.confirm("proced for logout")
        if (!isconfirm) return;
        setLoading(true);
        try {
            await logout();
            alert("Logout successful!");
            navigate("/login");
        } catch (error) {
            alert("Logout failed. " + (error.response?.data?.message || ""));
            console.error("Logout error:", error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button className={className} onClick={handleLogout} disabled={loading}>
            <span className="material-symbols-outlined">logout</span>
            {loading ? "Logging out..." : "Logout"}
        </button>
    );
}

export default LogoutButton;
