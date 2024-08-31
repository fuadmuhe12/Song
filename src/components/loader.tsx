import { useSelector } from 'react-redux'
import { RooTstate } from '../lib/redux/store/store'
import { useDeleteSongMutation, useGetCateogriesQuery, useUpdateSongMutation } from '../lib/redux/features/songs/apiSlice'

export default function Loader() {
    const loadingSong = useSelector((state: RooTstate) => state.songs.isLoading)
    const [, { isLoading }] = useDeleteSongMutation();
    const [, { isLoading: isUpdating }] = useUpdateSongMutation();
    const { isLoading: isFetching } = useGetCateogriesQuery();
    return (
        isLoading || isUpdating || isFetching || loadingSong ? (<div className='fixed left-1/2 z-50 top-1/2'><img src="./icons/spinner.gif" alt="loader" /></div>) : <></>
    )
}
