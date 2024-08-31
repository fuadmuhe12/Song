import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebaseConfig";
interface responce {
    isSuccuss: boolean;
    errorMessge: string | null;
    url?: string;
}
async function UploadImage(file: File): Promise<responce> {
    try {
        const fileExtension = file.name.split('.').pop();
        const uniqueFileName = `cover_img_${uuidv4()}.${fileExtension}`;
        const storageRef = ref(storage, `song/cover_Img/${uniqueFileName}`);
        const result = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(result.ref);
        return {
            isSuccuss: true,
            errorMessge: null,
            url: url,
        };
    } catch {
        return {
            errorMessge: "Failed to upload image",
            isSuccuss: false,
        };
    }
}
async function UploadAudio(file: File): Promise<responce> {
    try {
        const fileExtension = file.name.split('.').pop();
        const uniqueFileName = `Audio_${uuidv4()}.${fileExtension}`;
        const storageRef = ref(storage, `song/song_audio/${uniqueFileName}`);
        const result = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(result.ref);
        return {
            isSuccuss: true,
            errorMessge: null,
            url: url,
        };
    } catch {
        return {
            errorMessge: "Failed to upload Audio",
            isSuccuss: false,
        };
    }
}

export { UploadImage, UploadAudio };