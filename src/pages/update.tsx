import { useForm, SubmitHandler } from "react-hook-form";
import { UploadAudio, UploadImage } from "../lib/utils/uploadImage";
import 'react-toastify/dist/ReactToastify.css';
import { notifyError, notifySuccess, ToastContainerDefault } from "../components/toast";
import { useGetCateogriesQuery, useGetSongByIdQuery, useUpdateSongMutation } from "../lib/redux/features/songs/apiSlice";
import { redirect, useParams } from "react-router-dom";
import { useEffect } from "react";
import { isAudioType, isImageType } from "../lib/utils/EnsureExtension";


type typeOfSongUpdate = {
    title: string | undefined;
    artist: string | undefined;
    duration: number | undefined;
    catagory: string | undefined;
    description: string | undefined;
    coverPhotoUrl: FileList | undefined;
    audioUrl: FileList | undefined;
};

export default function UpdateSong() {
    const l = useParams();
    const id = l.id;
    const { data: getData, isError: IsgetDataError, isSuccess: isGetDataSuccuss } = useGetSongByIdQuery(parseFloat(id!));
    const { data: catagoryData } = useGetCateogriesQuery();


    const [updateSong,] = useUpdateSongMutation();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, },
        setError,
        setValue

    } = useForm<typeOfSongUpdate>();


    const onSubmit: SubmitHandler<typeOfSongUpdate> = async (data) => {
        console.log(data)
        let imgUrl;
        let audioUrl;
        const ImageResult = data.coverPhotoUrl?.length != 0 ? await UploadImage(data.coverPhotoUrl![0]) : undefined
        const AudioResult = data.audioUrl?.length != 0 ? await UploadAudio(data.audioUrl![0]) : undefined
        if (ImageResult != undefined) {
            if (!ImageResult.isSuccuss) {
                setError("coverPhotoUrl", {
                    type: "manual",
                    message: ImageResult?.errorMessge as string
                })
                notifyError(ImageResult?.errorMessge as string);
                return
            }
            imgUrl = ImageResult.url
        }



        if (AudioResult != undefined) {
            if (!AudioResult.isSuccuss) {
                setError("audioUrl", {
                    type: "manual",
                    message: AudioResult.errorMessge!
                })
                notifyError(AudioResult.errorMessge!)
                return
            }
            audioUrl = AudioResult.url
        }

        const responce = await updateSong({ id: parseFloat(id!), data: { coverPhotoUrl: imgUrl, audioUrl: audioUrl, artist: data.artist, catagory: data.catagory, description: data.description, duration: data.duration, title: data.title } }).unwrap();
        if (responce.error) {
            notifyError(responce.error)
        }
        if (!responce.error) {
            notifySuccess("Song updated successfully")
        }

        redirect('/')
    };
    useEffect(() => {
        if (isGetDataSuccuss) {
            const song = getData?.data;
            setValue("title", song?.title || "");
            setValue("artist", song?.artist || "");
            setValue("duration", song?.duration || 0);
            setValue("description", song?.description || "");
        }
        if (IsgetDataError) {
            notifyError("An error occurred while fetching song data");
        }
    }, [isGetDataSuccuss, IsgetDataError, getData, setValue]);
    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-md">
                <h2 className="text-center text-3xl font-extrabold text-white">Update Song</h2>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300" htmlFor="title">
                                Title
                            </label>
                            <input
                                {...register("title", {})}
                                type="text"
                                id="title"
                                disabled={isSubmitting}

                                className={`mt-1 block w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-600'
                                    } rounded-md shadow-sm text-gray-900 bg-white outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.title && (
                                <span className="text-red-500 text-sm">{errors.title.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300" htmlFor="artist">
                                Artist
                            </label>
                            <input
                                {...register("artist", {})}
                                type="text"
                                id="artist"
                                disabled={isSubmitting}

                                className={`mt-1 block w-full px-3 py-2 border ${errors.artist ? 'border-red-500' : 'border-gray-600'
                                    } rounded-md shadow-sm text-gray-900 bg-white outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.artist && (
                                <span className="text-red-500 text-sm">{errors.artist.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300" htmlFor="duration">
                                Duration (in seconds)
                            </label>
                            <input
                                {...register("duration", { required: "Duration is required" })}
                                type="number"
                                id="duration"
                                required

                                disabled={isSubmitting}
                                className={`mt-1 block w-full px-3 py-2 border ${errors.duration ? 'border-red-500' : 'border-gray-600'
                                    } rounded-md shadow-sm text-gray-900 bg-white outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.duration && (
                                <span className="text-red-500 text-sm">{errors.duration.message}</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300" htmlFor="catagory">
                                Category
                            </label>
                            <select
                                {...register("catagory", {})}
                                id="catagory"
                                disabled={isSubmitting}
                                className={`mt-1 block w-full px-3 py-2 border ${errors.catagory ? 'border-red-500' : 'border-gray-600'
                                    } rounded-md shadow-sm text-gray-900 bg-white outline-none focus:ring-blue-500 focus:border-blue-500`}
                            >
                                <option value="">Select Category</option>
                                {catagoryData?.data?.map((catagory) => (
                                    <option value={catagory.id} key={catagory.id}>
                                        {catagory.name}
                                    </option>
                                ))}
                            </select>
                            {errors.catagory && (
                                <span className="text-red-500 text-sm">{errors.catagory.message}</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            {...register("description", { maxLength: { value: 100, message: "Maximum 100 characters allowed" } })}
                            id="description"
                            disabled={isSubmitting}
                            className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-600'
                                } rounded-md shadow-sm text-gray-900 bg-white outline-none focus:ring-blue-500 focus:border-blue-500`}
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
                                    validate: {
                                        isImage: (files) => {
                                            if (files && files.length > 0) {
                                                return isImageType(files[0]) || "Invalid image type";
                                            }
                                            return true;
                                        }
                                    }
                                })}
                                type="file"
                                id="coverPhotoUrl"
                                disabled={isSubmitting}
                                className={`mt-1 block w-full text-gray-300 px-3 py-2 border ${errors.coverPhotoUrl ? 'border-red-500' : 'border-gray-600'
                                    } rounded-md shadow-sm bg-white outline-none focus:ring-blue-500 focus:border-blue-500`}
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
                                    validate: {
                                        isAudio: (files) => {
                                            if (files && files.length > 0) {
                                                return isAudioType(files[0]) || "Invalid audio type";
                                            }
                                            return true;
                                        }
                                    }
                                })}
                                type="file"
                                id="audioUrl"
                                disabled={isSubmitting}
                                className={`mt-1 block w-full text-gray-300 px-3 py-2 border ${errors.audioUrl ? 'border-red-500' : 'border-gray-600'
                                    } rounded-md shadow-sm bg-white outline-none focus:ring-blue-500 focus:border-blue-500`}
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
                            {isSubmitting ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
                <ToastContainerDefault />
            </div>
        </div>
    );
}
