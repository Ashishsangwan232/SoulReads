import axios from "axios";
import { Children, createContext, useContext, useEffect, useState } from "react";
import { useMyPosts } from "./MyPostsContext";
import { AuthContext } from "./AuthContext";

export const DeleteContext = createContext();

export const DeleteProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const { refreshMyPosts } = useMyPosts();
    const [myPostsDeleted, setMyPostsDeleted] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL;
    
    const softDelete = async (postId) => {
        try {
            setLoading(true);
            const res = await axios.patch(`${API_URL}/posts/${postId}/soft-delete`);
            console.log(res.data.message);
            refreshMyPosts();
            return res.data;
        } catch (err) {
            console.error("Error deleting post:", err?.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    const HardDelete = async (postId) => {
        try {
            setLoading(true);
            const res = await axios.patch(`${API_URL}/posthard/${postId}/parmanentDeleted`);
            console.log(res.data.message);
            refreshMyPosts();
            return res.data;
        } catch (err) {
            console.error("Error deleting post:", err?.response?.data?.message || err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    const fetchMyPostsDeleted = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/posts/me/Deleted`);
            setMyPostsDeleted(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch Deleted posts.')
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMyPostsDeleted();
    }, [user]);

    return (
        <DeleteContext.Provider value={{ myPostsDeleted, loading, HardDelete, softDelete, refreshMyPosts: fetchMyPostsDeleted }}>
            {children}
        </DeleteContext.Provider>
    );
};

export const useDelete = () => useContext(DeleteContext);