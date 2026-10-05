import { apiClient } from "@/lib/api-client";

export const getPosts = async () => {
    const response = await apiClient.get('/community/posts');
    return response.data;
};

export const createPost = async (data: { content: string; image_url?: string; category?: string; tags?: string[] }) => {
    const response = await apiClient.post('/community/posts', data);
    return response.data;
};

export const toggleLikePost = async (postId: string) => {
    const response = await apiClient.post(`/community/posts/${postId}/like`);
    return response.data;
};

export const getGroups = async () => {
    const response = await apiClient.get('/community/groups');
    return response.data;
};

export const updatePost = async (postId: string, data: { content: string; image_url?: string }) => {
    const response = await apiClient.patch(`/community/posts/${postId}`, data);
    return response.data;
};

export const deletePost = async (postId: string) => {
    const response = await apiClient.delete(`/community/posts/${postId}`);
    return response.data;
};

export const addComment = async (postId: string, data: { content: string; mentions?: string[] }) => {
    const response = await apiClient.post(`/community/posts/${postId}/comments`, data);
    return response.data;
};

export const getComments = async (postId: string) => {
    const response = await apiClient.get(`/community/posts/${postId}/comments`);
    return response.data;
};

export const deleteComment = async (commentId: string) => {
    const response = await apiClient.delete(`/community/comments/${commentId}`);
    return response.data;
};
