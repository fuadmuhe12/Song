import { useForm } from 'react-hook-form';
import { SearchIcon } from './Icons';

export default function SearchFeature() {
    const { register } = useForm();

    return (
        <div className='flex gap-x-3 bg-white py-3 pl-2 md:pl-4 pr-12 lg:w-[364px] md:w-[250px] rounded-full'>
            <SearchIcon className='text-black' />
            <input type="text" {...register} placeholder='What do you want to listen to?' className='outline-none w-full ' />
        </div>
    )
}