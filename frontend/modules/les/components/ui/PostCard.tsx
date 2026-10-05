import { useState } from "react";
import { 
    Heart, MessageCircle, MoreHorizontal, Bookmark, 
    ShieldCheck, Edit2, Trash2, Send 
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikePost, updatePost, deletePost, addComment } from "@/modules/les/api/community.api";
import { useUser } from "@/providers/userProvider";
import { toast } from "sonner";

export default function PostCard({ post }: { post: any }) {
    const user = useUser();
    const queryClient = useQueryClient();
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(post.content);
    
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState("");

    const timeAgo = new Date(post.created_at).toLocaleDateString();
    const authorName = post.les_user?.full_name || "Usuario Desconocido";
    const authorRole = post.les_user?.role === "doctor" ? "Doctor" : "Paciente";
    const isVerified = post.les_user?.role === "doctor";
    const avatar = post.les_user?.avatar_url || `https://ui-avatars.com/api/?name=${authorName}&background=random`;
    const isOwner = user?.id === post.author_id;

    const toggleLikeMutation = useMutation({
        mutationFn: toggleLikePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["community_posts"] });
        },
    });

    const updatePostMutation = useMutation({
        mutationFn: (data: { content: string }) => updatePost(post.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["community_posts"] });
            setIsEditing(false);
            toast.success("Publicación actualizada");
        },
        onError: () => toast.error("Error al actualizar la publicación")
    });

    const deletePostMutation = useMutation({
        mutationFn: () => deletePost(post.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["community_posts"] });
            toast.success("Publicación eliminada");
        },
        onError: () => toast.error("Error al eliminar la publicación")
    });

    const addCommentMutation = useMutation({
        mutationFn: (data: { content: string, mentions?: string[] }) => addComment(post.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["community_posts"] });
            setCommentText("");
            toast.success("Comentario añadido");
        },
        onError: () => toast.error("Error al publicar el comentario")
    });

    const handleSaveEdit = () => {
        if (!editContent.trim()) return;
        updatePostMutation.mutate({ content: editContent });
    };

    const handleDelete = () => {
        if (confirm("¿Estás seguro de eliminar esta publicación?")) {
            deletePostMutation.mutate();
        }
    };

    const handleAddComment = () => {
        if (!commentText.trim()) return;
        
        // Extraer menciones (ej: @juan)
        const mentionRegex = /@(\w+)/g;
        const matches = [...commentText.matchAll(mentionRegex)];
        const mentions = matches.map(m => m[1]);
        
        addCommentMutation.mutate({ content: commentText, mentions });
    };

    return (
        <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm relative">
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <img
                        src={avatar}
                        alt={authorName}
                        className="h-11 w-11 shrink-0 rounded-full object-cover ring-4 ring-purple-50"
                    />

                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="truncate text-sm font-bold text-gray-900">
                                {authorName}
                            </h3>

                            {isVerified && (
                                <ShieldCheck
                                    size={15}
                                    className="shrink-0 text-[#69409A]"
                                />
                            )}
                        </div>

                        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-gray-400">
                            <span className="capitalize">{authorRole}</span>
                            <span>•</span>
                            <span>{timeAgo}</span>
                        </div>
                    </div>
                </div>

                {isOwner && (
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50"
                        >
                            <MoreHorizontal size={18} />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-10 py-1">
                                <button 
                                    onClick={() => { setIsEditing(true); setIsMenuOpen(false); }}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    <Edit2 size={14} /> Editar
                                </button>
                                <button 
                                    onClick={() => { handleDelete(); setIsMenuOpen(false); }}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 size={14} /> Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {isEditing ? (
                <div className="mt-4">
                    <textarea 
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-[#69409A] focus:outline-none"
                        rows={3}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <button 
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 rounded-md"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={handleSaveEdit}
                            disabled={updatePostMutation.isPending}
                            className="px-3 py-1.5 text-xs bg-[#69409A] text-white rounded-md hover:bg-[#5A3686]"
                        >
                            {updatePostMutation.isPending ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </div>
            ) : (
                <p className="mt-4 text-sm leading-6 text-gray-600">
                    {post.content}
                </p>
            )}

            {post.image_url && !isEditing && (
                <div className="mt-4 overflow-hidden rounded-xl">
                    <img
                        src={post.image_url}
                        alt="Contenido de la publicación"
                        className="max-h-[360px] w-full object-cover"
                    />
                </div>
            )}

            <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2">
                    {post.tags?.map((t: string) => (
                        <span key={t} className="rounded-full bg-[#F4EEFA] px-3 py-1 text-[10px] font-semibold text-[#69409A]">
                            #{t}
                        </span>
                    ))}
                </div>

                <button
                    type="button"
                    className="text-gray-400 hover:text-[#69409A]"
                >
                    <Bookmark size={17} />
                </button>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-5">
                    <button
                        type="button"
                        onClick={() => toggleLikeMutation.mutate(post.id)}
                        className={`flex items-center gap-1.5 text-xs font-medium transition ${
                            post.isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                        }`}
                    >
                        <Heart size={17} className={post.isLiked ? "fill-current" : ""} />
                        <span>{post._count?.les_post_like || 0}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-[#69409A]"
                    >
                        <MessageCircle size={17} />
                        <span>{post._count?.les_post_comment || 0}</span>
                    </button>
                </div>

                <span className="text-[10px] text-gray-400">
                    124 vistas
                </span>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-2 items-center mb-4">
                        <img
                            src={(user as any)?.avatar_url || `https://ui-avatars.com/api/?name=${user?.full_name}&background=random`}
                            alt="Tu perfil"
                            className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1 relative">
                            <input 
                                type="text"
                                placeholder="Escribe un comentario... usa @ para etiquetar"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-4 pr-10 text-xs focus:outline-none focus:border-[#69409A]"
                                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                            />
                            <button 
                                onClick={handleAddComment}
                                disabled={addCommentMutation.isPending || !commentText.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#69409A] hover:text-[#5A3686] disabled:opacity-50"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                    
                    {/* Lista de Comentarios */}
                    {post.les_post_comment && post.les_post_comment.length > 0 && (
                        <div className="mt-4 space-y-3">
                            {post.les_post_comment.map((comment: any) => (
                                <div key={comment.id} className="flex gap-2">
                                    <img
                                        src={comment.les_user?.avatar_url || `https://ui-avatars.com/api/?name=${comment.les_user?.full_name}&background=random`}
                                        alt={comment.les_user?.full_name}
                                        className="w-7 h-7 rounded-full object-cover"
                                    />
                                    <div className="bg-gray-50 rounded-2xl px-3 py-2 flex-1">
                                        <p className="text-xs font-semibold text-gray-900">{comment.les_user?.full_name}</p>
                                        <p className="text-xs text-gray-600 mt-0.5 whitespace-pre-wrap">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </article>
    );
}
