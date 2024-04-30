import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {

  const [formData , setFormData] = useState({})
  const [error , setError] = useState(null)
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    // to keep the previously added data i.e while entering email , i want to keep the previously added username
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      });
    };

    const handleSubmit = async (e) =>{
      e.preventDefault();

      try{
        setLoading(true);
        const res = await fetch('/api/auth/signup',      //to avoid writing the whole destination like localhost:3000, i added the path in vite.config so that i can easily use that proxy with name /api instead which improves security
      {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),    //stringifying formdata to make it secured
      }
    ); 
      const data = await res.json();
      if(data.success===false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    }
    catch(error){
      setLoading(false);
      setError(error.message);
      }
    console.log(data);
    };

console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-r-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign-Up'}
          </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
