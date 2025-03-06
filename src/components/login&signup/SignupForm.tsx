import { useState } from "react";
import React from 'react';
import { useForm } from "react-hook-form";
interface FormData {
  Firstname: string;
  Lastname: string;
  Email: string;
  Password: string;
  Confirmpassword: string;

}


function SignupForm() {
  const [Name, setName] = useState('form');
  const { register, handleSubmit,formState:{errors} } = useForm<FormData>();
  console.log(errors);
  const onSubmit = handleSubmit(({Firstname,Lastname,Email,Password,Confirmpassword}) =>
    console.log(Firstname,Lastname,Email,Password,Confirmpassword));
  return (

    <div className='w-full min-h-screen bg-secondary flex flex-col justify-center'>
      <div className="mx-w-md w-full mx-auto">
        <div className="text-xl text-center font-medium text-primary"> WELCOME REGISTER
        </div>
        <div className=" w-1/2 mx-auto mt-4 bg-white shadow-2xl  p-5  rounded ">
          <form action="" name="form" className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="" className="text-sm font-bold text-primary block mt-1"> Firstname</label>
              <input type="text" {...register("Firstname", {
                required: "Firstname is required",
              })} className="w-full p-2 border border-primary rounded mt-1" />
             <p className="text-red-500 text-sm">{errors.Firstname?.message}</p>
            </div>
            <div>
              <label htmlFor="" className="text-sm font-bold text-primary block mt-1"> Lastname</label>
              <input type="text" {...register("Lastname", {
                required: "Lastname is required"
              })} className="w-full p-2 border border-primary rounded mt-1" />
              <p className="text-red-500 text-sm">{errors.Lastname?.message}</p>
            </div>
            <div>
              <label htmlFor="" className="text-sm font-bold text-primary block"> Email Address</label>
              <input type="text" {...register("Email", {
                required: "email is required"
              })} className="w-full p-2 border border-primary rounded mt-1" />
              <p className="text-red-500 text-sm">{errors.Email?.message}</p>
            </div>
            <div>
              <label htmlFor="" className="text-sm font-bold text-primary block"> Create Password</label>
              <input type="password"  {...register("Password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })} className="w-full p-2 border border-primary rounded mt-1" />
              <p className="text-red-500 text-sm">{errors.Password?.message}</p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="" className="text-sm font-bold text-primary block"> Confirm password</label>
              <input type="password"   {...register("Confirmpassword", {
                required: "Please confirm your password",
              })} className="w-full p-2 border border-primary rounded mt-1 sm:col-span-2" />
              {errors.Confirmpassword&&<p className="text-red-500 text-sm">{errors.Confirmpassword.message}</p>}
            </div>

          </form>
            <button type='submit' className="w-full py-2 px-4 bg-primary shadow-md  hover:bg-hover hover:shadow-lg rounded-md text-white text-lg text-center mt-7"> Register</button>

        </div>
      </div>
    </div>
  )
}

export default SignupForm
