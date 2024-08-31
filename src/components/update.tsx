import { useForm, SubmitHandler } from "react-hook-form";
import { UploadAudio, UploadImage } from "../lib/utils/uploadImage";
import 'react-toastify/dist/ReactToastify.css';
import { notifyError, notifySuccess, ToastContainerDefault } from "../components/toast";
import { useGetCateogriesQuery, useGetSongByIdQuery, useUpdateSongMutation } from "../lib/redux/features/songs/apiSlice";
import { useParams } from "react-router-dom";


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

    if (IsgetDataError) {
        notifyError("An error occured while fetching song data")
    }
    else {
        if (isGetDataSuccuss) {
            const song = getData?.data;
            setValue("title", song?.title)
            setValue("artist", song?.artist)
            setValue("duration", song?.duration)
            setValue("description", song?.description)
        }
    }
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

        const responce = await updateSong({ id: parseFloat(id!) || 1, data: { coverPhotoUrl: imgUrl, audioUrl: audioUrl, artist: data.artist, catagory: data.catagory, description: data.description, duration: data.duration, title: data.title } }).unwrap();
        if (responce.error) {
            notifyError(responce.error)
        }
        if (!responce.error) {
            notifySuccess("Song updated successfully")
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
                            {...register("title", {})}
                            type="text"
                            name="title"
                            id="title"
                            disabled={isSubmitting}

                            className="outline-none rounded-sm text-gray-700"
                        />

                    </div>
                    <div className="flex flex-col">
                        <label className="pb-2" htmlFor="artist">
                            Artist
                        </label>
                        <input
                            {...register("artist", {})}
                            type="text"
                            name="artist"
                            id="artist"
                            disabled={isSubmitting}

                            className="outline-none rounded-sm text-gray-700"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="pb-2" htmlFor="duration">
                            Duration
                        </label>
                        <input
                            {...register("duration", {})}
                            type="number"
                            name="duration"
                            id="duration"

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
                            className="outline-none text-gray-700">
                            {catagoryData?.data?.map((catagory) => {
                                return <option value={catagory.id} key={catagory.id}>{catagory.name}</option>
                            })}
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
                        {...register("description", { max: 100 })}
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
                                required: false
                            })}
                            type="file"
                            name="coverPhotoUrl"
                            id="coverPhotoUrl"

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
                                required: false
                            })}
                            type="file"
                            name="audioUrl"
                            id="audioUrl"

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
                        {isSubmitting ? "Updating..." : "Update"}


                    </button>
                </div>
            </form>
            <ToastContainerDefault />
        </div>


    );
}
