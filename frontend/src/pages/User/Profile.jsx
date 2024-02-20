import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify"
import {Link} from "react-router-dom";
import { useProfileMutation } from '../../redux/api/userApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';

import Loader from '../../components/Loader';




const Profile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {userInfo} = useSelector((state) => state.auth);

    const [updateProfile, {isLoading:loadingUpdateProfile}] = useProfileMutation();

    useEffect(() =>{
        setUsername(userInfo.username);
        setEmail(userInfo.email);
    },[userInfo.username,userInfo.email]);

    const dispatch=useDispatch();




    const submitHandler = async(e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("password does not match")
        }else{
            try{
                const res = await updateProfile({
                    _id:userInfo._id,
                    username,
                    email,
                    password,

                }).unwrap();
                dispatch(setCredentials({...res}));
                toast.success("profile updated successfully");

            }catch(err){
                toast.error(err?.data?.message || err.error);
            }

        }
       

    };

  return (
    <div className='container mx-auto p-4 mt-[10rem]'>
        <div className="flex justify-center align-center md:flex md:space-x-4">
            <div className='w-auto'>
                <h2 className='text-2xl font-semibold mb-4'>Update Profile</h2>

                <form onSubmit={submitHandler}>
                    <div className='mb-4'>
                        <label className='block text-white mb-2'>Name</label>
                        <input 
                        type="text"
                        placeholder='Enter name'
                        className='form-input p-4 rounded-sm w-auto md:w-[500px]'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-white mb-2'>Email</label>
                        <input 
                        type="email"
                        placeholder='Enter Email'
                        className='form-input p-4 rounded-sm  w-auto md:w-[500px]'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-white mb-2'>Password</label>
                        <input 
                        type="password"
                        placeholder='Enter password'
                        className='form-input p-4 rounded-sm w-auto md:w-[500px]'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-white mb-2'>confirm Password</label>
                        <input 
                        type="password"
                        placeholder='confirm password'
                        className='form-input p-4 rounded-sm  w-auto md:w-[500px]'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <button
                        type='submit'
                        className='bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600'
                        >
                            Update

                        </button>

                        <Link
                        to='/user-orders'
                        className='bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700'
                        >
                            My Orders
                        </Link>

                    </div>
                    {loadingUpdateProfile && <Loader />}
                </form>
            </div>
        </div>

    </div>
  )
}

export default Profile