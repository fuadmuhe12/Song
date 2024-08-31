import { useForm } from 'react-hook-form';
import { SearchIcon } from './Icons';
import { useGetCateogriesQuery } from '../lib/redux/features/songs/apiSlice';
import { useEffect } from 'react';
import { setFilter } from '../lib/redux/features/filter/filterSlice';
import { useDispatch } from 'react-redux';
import { getSongs } from '../lib/redux/features/songs/songSlice';
type propsForm = {
    search: string
    category: number
}
export default function SearchFeature() {
    const { register, watch } = useForm<propsForm>();
    const watchSearch = watch("search");
    const wathcCategory = watch("category");
    const { data: categoryData } = useGetCateogriesQuery();
    const diptch = useDispatch();
    useEffect(() => {
        console.log(watchSearch, wathcCategory, "watchSearch, wathcCategory")
        diptch(setFilter({ search: watchSearch ?? "", categoryID: wathcCategory ?? "" }))
        diptch(getSongs({ search: watchSearch ?? "", categoryID: wathcCategory ?? "" }))
    }, [wathcCategory, watchSearch, diptch])
    return (
        <div className=' flex justify-between items-center w-full pr-1 md:pr-2 lg:pr-3'>
            <div className='flex gap-x-3 bg-white py-3 pl-2 md:pl-4 pr-12 lg:w-[364px] md:w-[250px] w-[150px] rounded-full'>
                <SearchIcon className='text-black' />
                <input type="text" {...register("search")} placeholder='What do you want to listen to?' className='outline-none w-full ' />
            </div>
            <div>
                <select id="categoryid" className='bg-white w-fit outline-none p-2' {...register("category")}>
                    <option value={""}>All</option>
                    {categoryData?.data?.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}