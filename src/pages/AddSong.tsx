import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

/* 
    _id: 1,
    title: "Song One",
    artist: "Artist A",
    description: "This is a great song by Artist A.",
    coverPhotoUrl: "public/images/image.png",
    audioUrl: "public/images/image.png",
    category: "Pop",
    duration: 210,
    createdAt: "2024-08-26T08:30:00Z",
    updatedAt: "2024-08-26T08:30:00Z",
*/
export default function AddSong() {
    const { register } = useForm();
    return (
        <div>
            <form action="" className="text-White max-w-[600px] px-4 py-3">
                <div className="grid  md:grid-cols-2  gap-x-3">
                    <div className="flex flex-col" >
                        <label className="pb-2" htmlFor="title">Title</label>
                        <input {...register('title', { required: true })} type="text" name="title" id="title" required className="outline-none rounded-sm text-gray-700" />
                    </div>
                    <div className="flex flex-col">
                        <label className="pb-2" htmlFor="artist">Artist</label>
                        <input {...register('artist', { required: true })} type="text" name="artist" id="artist" required className="outline-none rounded-sm text-gray-700" />
                    </div>

                    <div className="flex flex-col">
                        <label className="pb-2" htmlFor="duration">Duration</label>
                        <input {...register('duration', { required: true })} type="number" name="duration" id="duration" required className="outline-none rounded-sm text-gray-700" />
                    </div>

                </div>
                <div className="pb-3">
                    <div className="flex flex-col">
                        <label className="pb-2" htmlFor="description">Description</label>
                        <textarea name="description" id="description" required className="outline-none rounded-sm text-gray-700" />
                    </div>
                    <div className="flex flex-col">
                        <label className="pb-2" htmlFor="coverPhotoUrl">Cover Photo</label>
                        <input {...register('coverPhotoUrl', { required: true })} type="file" name="coverPhotoUrl" id="coverPhotoUrl" required className="outline-none rounded-sm text-gray-700" />
                    </div>
                    <div className="flex flex-col">
                        <label className="pb-2" htmlFor="audioUrl">Audio</label>
                        <input {...register('audioUrl', { required: true })} type="file" name="audioUrl" id="audioUrl" required className="outline-none rounded-sm text-gray-700" />
                    </div>
                </div>
                <Button variant="contained" className="mt-4" type="submit">Add</Button>
            </form>
        </div>
    )
}
