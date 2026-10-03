import { apiClient } from "./api-client";

/**
 * Sube una imagen a Cloudflare R2 obteniendo primero una URL prefirmada
 * del backend, y luego haciendo un PUT directamente al bucket.
 */
export async function uploadImageToR2(file: File, folder: string = 'general'): Promise<string> {
    // 1. Pedir URL prefirmada al backend
    const { data } = await apiClient.post('/upload/presigned-url', {
        fileName: file.name,
        contentType: file.type,
        folder,
    });

    const { uploadUrl, fileUrl } = data;

    // 2. Subir directamente al Bucket R2
    const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type,
        },
    });

    if (!uploadResponse.ok) {
        throw new Error('Error al subir la imagen al bucket');
    }

    // 3. Retornar la URL pública para guardarla en la base de datos
    return fileUrl;
}

