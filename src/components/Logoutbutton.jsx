import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useUIFeedback } from './UIFeedback/UIFeedbackProvider';
import { getErrorMessage } from '../services/api';

const Logoutbutton = ({ className }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { logout } = useContext(AuthContext);
    const { confirm, showToast } = useUIFeedback();

    const handleLogout = async () => {
        const confirmed = await confirm('Proceed with logout?');
        if (!confirmed) return;
        setLoading(true);
        try {
            await logout();
            showToast('Logout successful!', 'success');
            navigate("/login");
        } catch (error) {
            showToast(getErrorMessage(error, 'Logout failed.'), 'error');
            console.error("Logout error:", error);
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

export default Logoutbutton;
