"use client";

import { addComment, createPost, deleteComment, deletePost, getComments, getGroups, getPosts, toggleLikePost, updatePost } from "@/modules/les/api/community.api";
import { useUser } from "@/providers/userProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    ArrowRight,
    Bell,
    Bookmark,
    ChevronRight,
    Heart,
    Image as ImageIcon,
    MessageCircle,
    MoreHorizontal,
    Search,
    ShieldCheck,
    Users
} from "lucide-react";
import { useState } from "react";

const trendingTopics: [string, number][] = [
    ["Fatiga y cansancio", 38],
    ["AlimentaciÃ³n antiinflamatoria", 31],
    ["Ejercicio suave", 24],
    ["Salud mental", 19],
];

export default function Page() {
    const currentUser = useUser();
    const queryClient = useQueryClient();
    const [composerText, setComposerText] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const { data: postsData, isLoading: loadingPosts } = useQuery({
        queryKey: ["community_posts"],
        queryFn: getPosts,
    });

    const { data: groupsData, isLoading: loadingGroups } = useQuery({
        queryKey: ["community_groups"],
        queryFn: getGroups,
    });

    const createPostMutation = useMutation({
        mutationFn: (data: { content: string, image_url?: string }) => createPost({ ...data, tags: ["General"] }),
        onSuccess: () => {
            setComposerText("");
            setSelectedImage(null);
            queryClient.invalidateQueries({ queryKey: ["community_posts"] });
        },
    });

    const toggleLikeMutation = useMutation({
        mutationFn: (postId: string) => toggleLikePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["community_posts"] });
        },
    });

    const handleCreatePost = async () => {
        if (!composerText.trim() && !selectedImage) return;
        
        try {
            setIsUploading(true);
            let uploadedUrl = undefined;
            
            if (selectedImage) {
                // Dynamically import to avoid breaking SSR if it relies on browser globals
                const { uploadImageToR2 } = await import("@/lib/upload-image");
                uploadedUrl = await uploadImageToR2(selectedImage, 'community-posts');
            }
            
            await createPostMutation.mutateAsync({ content: composerText, image_url: uploadedUrl });
        } catch (error) {
            console.error("Error al publicar:", error);
            import("sonner").then(({toast}) => toast.error(error?.response?.data?.message || "Hubo un error al publicar"));
        } finally {
            setIsUploading(false);
        }
    };

    const deletePostMutation = useMutation({
        mutationFn: (postId: string) => deletePost(postId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["community_posts"] }),
    });

    const deleteCommentMutation = useMutation({
        mutationFn: (commentId: string) => deleteComment(commentId),
        onSuccess: (_, variables) => queryClient.invalidateQueries({ queryKey: ["comments"] }), // would need postId for exact invalidation, let's just invalidate all comments or rely on specific query
    });

    const updatePostMutation = useMutation({
        mutationFn: ({ postId, content }: { postId: string, content: string }) => updatePost(postId, { content }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["community_posts"] });
        },
    });

    function PostCard({ post }: { post: any }) {
        const [showMenu, setShowMenu] = useState(false);
        const [showComments, setShowComments] = useState(false);
        const [commentText, setCommentText] = useState("");
        const [isEditing, setIsEditing] = useState(false);
        const [editContent, setEditContent] = useState(post.content);

        const { data: comments, isLoading: loadingComments } = useQuery({
            queryKey: ["comments", post.id],
            queryFn: () => getComments(post.id),
            enabled: showComments,
        });

        const addCommentMutation = useMutation({
            mutationFn: (content: string) => addComment(post.id, { content }),
            onSuccess: () => {
                setCommentText("");
                queryClient.invalidateQueries({ queryKey: ["comments", post.id] });
                queryClient.invalidateQueries({ queryKey: ["community_posts"] }); // update count
            },
        });

        const timeAgo = new Date(post.created_at).toLocaleDateString();
        const authorName = post.les_user?.full_name || "Usuario Desconocido";
        const authorRole = post.les_user?.role === "doctor" ? "Doctor" : "Paciente";
        const isVerified = post.les_user?.role === "doctor";
        const avatar = post.les_user?.avatar_url || `https://ui-avatars.com/api/?name=${authorName}&background=random`;
        
        const isMyPost = currentUser?.id === post.author_id;

        return (
            <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
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
                                <span>â€¢</span>
                                <span>{timeAgo}</span>
                            </div>
                        </div>
                    </div>
    
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowMenu(!showMenu)}
                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-50"
                        >
                            <MoreHorizontal size={18} />
                        </button>
                        
                        {showMenu && isMyPost && (
                            <div className="absolute right-0 top-full mt-1 w-32 rounded-lg bg-white p-1 shadow-lg border border-gray-100 z-10">
                                <button 
                                    onClick={() => {
                                        setIsEditing(true);
                                        setShowMenu(false);
                                    }}
                                    className="w-full rounded-md px-3 py-2 text-left text-xs font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => {
                                        if (confirm("Â¿Seguro que quieres eliminar este post?")) {
                                            deletePostMutation.mutate(post.id);
                                        }
                                        setShowMenu(false);
                                    }}
                                    className="w-full rounded-md px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50"
                                >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
    
                {isEditing ? (
                    <div className="mt-4">
                        <textarea
                            className="w-full p-3 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-[#69409A] resize-none"
                            rows={3}
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                        <div className="flex gap-2 justify-end mt-2">
                            <button 
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditContent(post.content);
                                }}
                                className="text-xs font-medium text-gray-500 hover:text-gray-700"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={() => {
                                    updatePostMutation.mutate({ postId: post.id, content: editContent });
                                    setIsEditing(false);
                                }}
                                className="text-xs font-bold text-[#69409A] hover:text-[#583383]"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                        {post.content}
                    </p>
                )}
    
                {post.image_url && (
                    <div className="mt-4 overflow-hidden rounded-xl">
                        <img
                            src={post.image_url}
                            alt="Contenido de la publicaciÃ³n"
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
                            {post._count?.les_post_like || 0}
                        </button>
    
                        <button
                            type="button"
                            onClick={() => setShowComments(!showComments)}
                            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-[#69409A]"
                        >
                            <MessageCircle size={17} />
                            {post._count?.les_post_comment || 0}
                        </button>
                    </div>
    
                    <button
                        type="button"
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#69409A]"
                    >
                        Comentar
                        <ArrowRight size={13} />
                    </button>
                </div>

                {showComments && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                            {loadingComments ? (
                                <p className="text-xs text-gray-400">Cargando comentarios...</p>
                            ) : comments?.length === 0 ? (
                                <p className="text-xs text-gray-400">SÃ© el primero en comentar.</p>
                            ) : (
                                comments?.map((c: any) => (
                                    <div key={c.id} className="flex items-start gap-2 text-sm group">
                                        <img src={c.les_user?.avatar_url || `https://ui-avatars.com/api/?name=${c.les_user?.full_name}&background=random`} className="w-8 h-8 rounded-full" />
                                        <div className="bg-gray-50 rounded-xl p-3 flex-1">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-gray-800 text-xs">{c.les_user?.full_name}</span>
                                                {currentUser?.id === c.author_id && (
                                                    <button 
                                                        onClick={() => {
                                                            if (confirm("Â¿Eliminar comentario?")) deleteCommentMutation.mutate(c.id);
                                                        }}
                                                        className="text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        Eliminar
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-xs mt-1">{c.content}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-3 flex gap-2">
                            <input 
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Escribe un comentario... Usa @ para etiquetar."
                                className="flex-1 rounded-full bg-gray-50 px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-[#69409A]/20"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && commentText.trim()) {
                                        addCommentMutation.mutate(commentText);
                                    }
                                }}
                            />
                            <button 
                                onClick={() => {
                                    if (commentText.trim()) addCommentMutation.mutate(commentText);
                                }}
                                disabled={!commentText.trim() || addCommentMutation.isPending}
                                className="rounded-full bg-[#69409A] px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                )}
            </article>
        );
    }
    return (
        <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-4 lg:p-8">
            <div className="mx-auto max-w-[1600px]">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Comunidad
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Comparte, aprende y conecta con personas que
                            entienden lo que estÃ¡s viviendo.
                        </p>
                    </div>

            
                </div>

                {/* Search */}
                <div className="mt-6 flex h-11 w-full max-w-[700px] items-center rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition focus-within:border-[#69409A] focus-within:ring-2 focus-within:ring-[#69409A]/10">
                    <Search
                        size={18}
                        className="shrink-0 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Buscar publicaciones, temas o grupos..."
                        className="ml-3 h-full w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                    />
                </div>

                <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                    {/* MAIN */}
                    <section className="min-w-0">
                        {/* Composer */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-[#EDE1F5]" />

                                <input
                                    type="text"
                                    value={composerText}
                                    onChange={(e) => setComposerText(e.target.value)}
                                    placeholder="Comparte algo con la comunidad..."
                                    className="flex h-10 flex-1 items-center rounded-full bg-[#F7F7FA] px-4 text-left text-xs text-gray-700 outline-none transition focus:bg-[#F1EDF5]"
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                                <div className="flex gap-2">
                                    <label className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setSelectedImage(e.target.files[0]);
                                                }
                                            }}
                                        />
                                        <ImageIcon
                                            size={16}
                                            className={selectedImage ? "text-green-500" : "text-[#69409A]"}
                                        />
                                        {selectedImage ? "Imagen Lista" : "Imagen"}
                                    </label>

                                    <button
                                        type="button"
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <Users
                                            size={16}
                                            className="text-[#69409A]"
                                        />
                                        Grupo
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    disabled={(!composerText.trim() && !selectedImage) || isUploading}
                                    onClick={handleCreatePost}
                                    className="rounded-lg bg-[#69409A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#583383] disabled:opacity-50"
                                >
                                    {isUploading ? "Publicando..." : "Publicar"}
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="mt-6 flex gap-6 overflow-x-auto border-b border-gray-200">
                            {[
                                "Para ti",
                                "Siguiendo",
                                "MÃ¡s populares",
                                "Preguntas",
                            ].map((tab, index) => (
                                <button
                                    key={tab}
                                    type="button"
                                    className={`relative whitespace-nowrap pb-3 text-sm font-medium ${
                                        index === 0
                                            ? "text-[#69409A]"
                                            : "text-gray-500 hover:text-gray-900"
                                    }`}
                                >
                                    {tab}

                                    {index === 0 && (
                                        <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#69409A]" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Posts */}
                        <div className="mt-5 space-y-4">
                            {loadingPosts ? (
                                <p className="text-sm text-gray-500">Cargando publicaciones...</p>
                            ) : postsData?.length > 0 ? (
                                postsData.map((post: any) => (
                                    <PostCard key={post.id} post={post} />
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No hay publicaciones aÃºn.</p>
                            )}
                        </div>

                        {/* Community CTA */}
                        <div className="mt-6 rounded-2xl bg-[#EDE1F5] p-6">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Users
                                            size={20}
                                            className="text-[#69409A]"
                                        />

                                        <h2 className="text-sm font-bold text-[#69409A]">
                                            Tu comunidad puede ayudarte
                                        </h2>
                                    </div>

                                    <p className="mt-2 max-w-xl text-xs leading-5 text-gray-500">
                                        Pregunta, comparte tu experiencia o
                                        encuentra personas con intereses y
                                        experiencias similares a las tuyas.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#69409A] px-5 py-2.5 text-xs font-semibold text-white"
                                >
                                    Explorar grupos
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* SIDEBAR */}
                    <aside className="space-y-5">
                        {/* Groups */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#69409A]">
                                    Grupos recomendados
                                </h2>

                                <button
                                    type="button"
                                    className="text-xs font-semibold text-[#69409A]"
                                >
                                    Ver todos
                                </button>
                            </div>

                            <div className="mt-4 space-y-4">
                                {loadingGroups ? (
                                    <p className="text-xs text-gray-400">Cargando grupos...</p>
                                ) : groupsData?.length > 0 ? (
                                    groupsData.map((group: any) => (
                                        <div
                                            key={group.id}
                                            className="flex items-center gap-3"
                                        >
                                            {group.image_url ? (
                                                <img
                                                    src={group.image_url}
                                                    alt={group.name}
                                                    className="h-11 w-11 rounded-xl object-cover"
                                                />
                                            ) : (
                                                <div className="h-11 w-11 rounded-xl bg-purple-100 flex items-center justify-center text-[#69409A] font-bold">
                                                    {group.name.charAt(0)}
                                                </div>
                                            )}

                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-xs font-semibold text-gray-900">
                                                    {group.name}
                                                </h3>

                                                <p className="mt-1 text-[10px] text-gray-400">
                                                    {group._count?.les_community_group_member || 0} miembros
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className="rounded-lg border border-[#69409A] px-2.5 py-1.5 text-[10px] font-semibold text-[#69409A] hover:bg-[#F4EEFA]"
                                            >
                                                Unirme
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-400">No hay grupos disponibles.</p>
                                )}
                            </div>
                        </div>

                        {/* Trending */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-bold text-[#69409A]">
                                    Temas populares
                                </h2>

                                <span className="text-[10px] font-medium text-gray-400">
                                    Esta semana
                                </span>
                            </div>

                            <div className="mt-4 space-y-3">
                                {trendingTopics.map(([topic, count], index) => (
                                    <button
                                        key={topic}
                                        type="button"
                                        className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-[#F8F5FC]"
                                    >
                                        <span className="text-xs font-bold text-gray-300">
                                            0{index + 1}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs font-medium text-gray-700">
                                                #{topic}
                                            </p>

                                            <p className="mt-1 text-[10px] text-gray-400">
                                                {count} publicaciones
                                            </p>
                                        </div>

                                        <ChevronRight
                                            size={15}
                                            className="text-gray-300"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* My activity */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <h2 className="text-sm font-bold text-[#69409A]">
                                Mi actividad
                            </h2>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="rounded-xl bg-[#F8F5FC] p-3">
                                    <p className="text-lg font-bold text-gray-900">
                                        12
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-500">
                                        Publicaciones
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#F8F5FC] p-3">
                                    <p className="text-lg font-bold text-gray-900">
                                        47
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-500">
                                        Comentarios
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#F8F5FC] p-3">
                                    <p className="text-lg font-bold text-gray-900">
                                        8
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-500">
                                        Grupos
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#F8F5FC] p-3">
                                    <p className="text-lg font-bold text-gray-900">
                                        126
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-500">
                                        Reacciones
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Safety */}
                        <div className="rounded-2xl bg-[#F3EBFA] p-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#69409A]">
                                    <ShieldCheck size={19} />
                                </div>

                                <div>
                                    <h2 className="text-sm font-bold text-[#69409A]">
                                        Comunidad segura
                                    </h2>

                                    <p className="mt-2 text-[11px] leading-5 text-gray-500">
                                        Recuerda que las experiencias de otros
                                        usuarios no sustituyen la valoraciÃ³n
                                        de un profesional de la salud.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#69409A]"
                            >
                                Normas de la comunidad
                                <ArrowRight size={13} />
                            </button>
                        </div>

                        {/* Notifications */}
                        <button
                            type="button"
                            className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#69409A]">
                                    <Bell size={18} />
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-gray-900">
                                        Notificaciones
                                    </p>

                                    <p className="mt-1 text-[10px] text-gray-400">
                                        3 nuevas interacciones
                                    </p>
                                </div>
                            </div>

                            <ChevronRight
                                size={16}
                                className="text-gray-400"
                            />
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    );
}

