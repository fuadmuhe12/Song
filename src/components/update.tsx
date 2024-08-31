import { useForm, SubmitHandler } from "react-hook-form";
import { isAudioType, isImageType } from "../lib/utils/EnsureExtension";
import { UploadAudio, UploadImage } from "../lib/utils/uploadImage";
import axios from "axios";
import { API_BASE_URL } from "../lib/constants";
import 'react-toastify/dist/ReactToastify.css';
import { notifyError, notifySuccess, ToastContainerDefault } from "../components/toast";

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
        formState: { errors, isSubmitting, },
        setError,
        reset
    } = useForm<typeOfSong>();


    const onSubmit: SubmitHandler<typeOfSong> = async (data) => {

        const ImageResult = await UploadImage(data.coverPhotoUrl[0])
        const AudioResult = await UploadAudio(data.audioUrl[0])

        if (!ImageResult.isSuccuss) {
            setError("coverPhotoUrl", {
                type: "manual",
                message: ImageResult.errorMessge!
            })
            notifyError(ImageResult.errorMessge!);
            return
        }
        if (!AudioResult.isSuccuss) {
            setError("audioUrl", {
                type: "manual",
                message: AudioResult.errorMessge!
            })
            notifyError(AudioResult.errorMessge!)
            return
        }
        try {
            axios.post(API_BASE_URL + "song", {
                title: data.title,
                artist: data.artist,
                duration: data.duration,
                catagory: data.catagory,
                description: data.description,
                coverPhotoUrl: ImageResult.url,
                audioUrl: AudioResult.url,
                categoryId: 1
            });
            reset();

            notifySuccess("Song uploaded successfully")
        } catch {
            notifyError("Failed to upload add song")
        }
    };
    return (
        <div>
            <form
                className="text-White max-w-[600px] px-4 py-3"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="grid  md:grid-cols-2  gap-x-3 gap-y-3">
                    <div className="flex flex-col">
                        <label className="pb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            name="title"
                            id="title"
                            disabled={isSubmitting}
                            required
                            className="outline-none rounded-sm text-gray-700"
                        />

                    </div>
                    <div className="flex flex-col">
                        <label className="pb-2" htmlFor="artist">
                            Artist
                        </label>
                        <input
                            {...register("artist", { required: true })}
                            type="text"
                            name="artist"
                            id="artist"
                            disabled={isSubmitting}
                            required
                            className="outline-none rounded-sm text-gray-700"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="pb-2" htmlFor="duration">
                            Duration
                        </label>
                        <input
                            {...register("duration", { required: true })}
                            type="number"
                            name="duration"
                            id="duration"
                            required
                            disabled={isSubmitting}
                            className="outline-none rounded-sm text-gray-700"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="pb-2" htmlFor="catagory">
                            Catagory
                        </label>
                        <select
                            disabled={isSubmitting}
                            name="catagory"
                            id="catagory"
                            className="outline-none text-gray-700"
                        >
                            <option value="catagory 1" selected>
                                catagory 1
                            </option>
                            <option value="catagory 2">catagory 2</option>
                            <option value="catagory 3">catagory 3</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="pb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        disabled={isSubmitting}
                        id="description"
                        {...register("description", { required: true, max: 100 })}
                        className="outline-none rounded-sm text-gray-700"
                    />
                    {errors.description && (
                        <span className="text-red-500">
                            {errors.description.message}
                        </span>
                    )}
                </div>
                <div className="pb-3 flex flex-col  md:flex-row gap-3 py-3">
                    <div className="flex flex-col">
                        <label className="pb-2" htmlFor="coverPhotoUrl">
                            Cover Photo
                        </label>
                        <input
                            disabled={isSubmitting}
                            {...register("coverPhotoUrl", {
                                required: true, validate: {
                                    isImage: (files) => {
                                        return isImageType(files[0])
                                    }
                                }
                            })}
                            type="file"
                            name="coverPhotoUrl"
                            id="coverPhotoUrl"
                            required
                            className="outline-none rounded-sm text-gray-700"
                        />
                        {errors.coverPhotoUrl && (
                            <span className="text-red-500">
                                {errors.coverPhotoUrl.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="pb-2" htmlFor="audioUrl">
                            Audio
                        </label>
                        <input
                            disabled={isSubmitting}
                            {...register("audioUrl", {
                                required: true,
                                validate: {
                                    isAudio: (files: FileList) => {
                                        const file = files[0];
                                        return isAudioType(file);
                                    },
                                },
                            })}
                            type="file"
                            name="audioUrl"
                            id="audioUrl"
                            required
                            className="outline-none rounded-sm text-gray-700"
                        />
                        {errors.audioUrl && (
                            <span className="text-red-500">
                                {errors.audioUrl.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className=" flex justify-center py-6 ">
                    <button
                        disabled={isSubmitting}
                        className="mt-4 mx-auto self-center px-10 py-3 rounded-lg bg-blue-500 transition-all hover:bg-blue-700"
                        type="submit"
                    >
                        {isSubmitting ? "Uploading..." : "Upload"}


                    </button>
                </div>
            </form>
            <ToastContainerDefault />
        </div>


    );
}
