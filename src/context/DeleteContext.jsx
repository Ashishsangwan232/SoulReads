import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import api, { getErrorMessage } from "../services/api";
import { useMyPosts } from "./MyPostsContext";
import { AuthContext } from "./AuthContext";

export const DeleteContext = createContext();

export const DeleteProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const { refreshMyPosts } = useMyPosts();
    const [myPostsDeleted, setMyPostsDeleted] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const softDelete = useCallback(async (postId) => {
        try {
            setLoading(true);
            const res = await api.patch(`/posts/${postId}/soft-delete`);
            refreshMyPosts();
            return res.data;
        } catch (err) {
            console.error("Error deleting post:", getErrorMessage(err));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [refreshMyPosts]);

    const hardDelete = useCallback(async (postId) => {
        try {
            setLoading(true);
            const res = await api.patch(`/posthard/${postId}/parmanentDeleted`);
            refreshMyPosts();
            return res.data;
        } catch (err) {
            console.error("Error deleting post:", getErrorMessage(err));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [refreshMyPosts]);

    const fetchMyPostsDeleted = useCallback(async () => {
        if (!user) return;
        try {
            setLoading(true);
            const res = await api.get('/posts/me/Deleted');
            // API returns { posts: [...], pagination: {...} }, not a bare array.
            setMyPostsDeleted(Array.isArray(res.data?.posts) ? res.data.posts : []);
        } catch (err) {
            setError(getErrorMessage(err, 'Failed to fetch Deleted posts.'));
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchMyPostsDeleted();
    }, [fetchMyPostsDeleted]);

    const value = useMemo(
        () => ({ myPostsDeleted, loading, error, hardDelete, softDelete, refreshMyPosts: fetchMyPostsDeleted }),
        [myPostsDeleted, loading, error, hardDelete, softDelete, fetchMyPostsDeleted]
    );

    return <DeleteContext.Provider value={value}>{children}</DeleteContext.Provider>;
};

export const useDelete = () => useContext(DeleteContext);
