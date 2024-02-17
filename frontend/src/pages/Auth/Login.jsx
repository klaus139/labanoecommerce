import {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { useLoginMutation } from '../../redux/api/userApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import Loader from '../../components/Loader';
import {toast} from 'react-toastify';



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();
    const {userInfo} = useSelector((state) => state.auth);

    const {search} = useLocation();
    const sp= new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/"


    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,redirect, userInfo])

    const submitHandler = async(e) => {
        e.preventDefault();
        
            try{
                const res = await login({email, password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate(redirect);
                

            }catch(err){
                console.log(err)
                toast.error(err.data.message)
            }
        
    }


  return (
    <section className='pl-[3rem] md:pl-[20rem] flex flex-wrap'>
        <div className='mr-[4rem] mt-[5rem]'>
            <h1 className='text-2xl font-semibold mb-4'>Login</h1>

            <form onSubmit={submitHandler} className='container w-auto md:w-[40rem]'>
                
                <div className='my-[2rem]'>
                    <label htmlFor='email' className='block text-sm font-medium text-white'>
                        Email Address
                    </label>
                    <input type='text' id='email' className='mt-1 p-2 border rounded w-full' value={email} placeholder='enter your email' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='my-[2rem]'>
                    <label htmlFor='password' className='block text-sm font-medium text-white'>
                        Password
                    </label>
                    <input type='password' id='password' className='mt-1 p-2 border rounded w-full' value={password} placeholder='enter your password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                

                <button disabled={isLoading} type="submit" className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'>
                    {isLoading ? "Signing in..." : "Sign In"}
                </button>
                {isLoading && <Loader />}
            </form>
            <div className='mt-4'>
                <p className='text-white'>
                    New Customer?{" "}
                    <Link to={redirect ? `/register=${redirect}`:"register"}
                    className='text-pink-500 hover:underline'
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>

    </section>
  )
}

export default Login