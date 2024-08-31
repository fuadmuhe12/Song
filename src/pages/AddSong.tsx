import { useForm, SubmitHandler } from "react-hook-form";
import { isAudioType, isImageType } from "../lib/utils/EnsureExtension";
import { UploadAudio, UploadImage } from "../lib/utils/uploadImage";
import axios from "axios";
import { API_BASE_URL } from "../lib/constants";
import 'react-toastify/dist/ReactToastify.css';
import { notifyError, notifySuccess, ToastContainerDefault } from "../components/toast";
import { useGetCateogriesQuery } from "../lib/redux/features/songs/apiSlice";

type typeOfSong = {
    title: string;
    artist: string;
    duration: number;
    catagory: string;
    description: string;
    coverPhotoUrl: FileList;
    audioUrl: FileList;
};

export default function AddSong() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<typeOfSong>();
    const { data: catagoryData } = useGetCateogriesQuery();

    const onSubmit: SubmitHandler<typeOfSong> = async (data) => {
        const ImageResult = await UploadImage(data.coverPhotoUrl[0]);
        const AudioResult = await UploadAudio(data.audioUrl[0]);

        if (!ImageResult.isSuccuss) {
            setError("coverPhotoUrl", {
                type: "manual",
                message: ImageResult.errorMessge!,
            });
            notifyError(ImageResult.errorMessge!);
            return;
        }
        if (!AudioResult.isSuccuss) {
            setError("audioUrl", {
                type: "manual",
                message: AudioResult.errorMessge!,
            });
            notifyError(AudioResult.errorMessge!);
            return;
        }
        try {
            await axios.post(API_BASE_URL + "song", {
                title: data.title,
                artist: data.artist,
                duration: data.duration,
                catagory: data.catagory,
                description: data.description,
                coverPhotoUrl: ImageResult.url,
                audioUrl: AudioResult.url,
                categoryId: data.catagory,
            });
            reset();
            notifySuccess("Song uploaded successfully");
        } catch {
            notifyError("Failed to upload song");
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-md">
                <h2 className="text-center text-3xl font-extrabold text-white">Add New Song</h2>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300" htmlFor="title">
                                Title
                            </label>
                            <input
                                {...register("title", { required: true })}
                                type="text"
                                id="title"
                                disabled={isSubmitting}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300" htmlFor="artist">
                                Artist
                            </label>
                            <input
                                {...register("artist", { required: true })}
                                type="text"
                                id="artist"
                                disabled={isSubmitting}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300" htmlFor="duration">
                                Duration (in seconds)
                            </label>
                            <input
                                {...register("duration", { required: true })}
                                type="number"
                                id="duration"
                                required
                                disabled={isSubmitting}
                                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300" htmlFor="catagory">
                                Category
                            </label>
                            <select
                                {...register("catagory", { required: true })}
                                id="catagory"
                                disabled={isSubmitting}
                                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {catagoryData?.data?.map((catagory) => (
                                    <option value={catagory.id} key={catagory.id}>
                                        {catagory.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            {...register("description", { required: true, maxLength: 100 })}
                            id="description"
                            disabled={isSubmitting}
                            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.description && (
                            <span className="text-red-500 text-sm">{errors.description.message}</span>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300" htmlFor="coverPhotoUrl">
                                Cover Photo
                            </label>
                            <input
                                {...register("coverPhotoUrl", {
                                    required: true,
                                    validate: {
                                        isImage: (files) => isImageType(files[0]),
                                    },
                                })}
                                type="file"
                                id="coverPhotoUrl"
                                disabled={isSubmitting}
                                required
                                className="mt-1 block w-full text-gray-300 px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.coverPhotoUrl && (
                                <span className="text-red-500 text-sm">{errors.coverPhotoUrl.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300" htmlFor="audioUrl">
                                Audio File
                            </label>
                            <input
                                {...register("audioUrl", {
                                    required: true,
                                    validate: {
                                        isAudio: (files: FileList) => isAudioType(files[0]),
                                    },
                                })}
                                type="file"
                                id="audioUrl"
                                disabled={isSubmitting}
                                required
                                className="mt-1 block w-full text-gray-300 px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.audioUrl && (
                                <span className="text-red-500 text-sm">{errors.audioUrl.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            disabled={isSubmitting}
                            className="mt-6 w-full inline-flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                            type="submit"
                        >
                            {isSubmitting ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </form>
                <ToastContainerDefault />
            </div>
        </div>
    );
}
