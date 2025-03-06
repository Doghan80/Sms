import { useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
interface FormData {
  email: string;
  password: string;
  remember: boolean;

}

const Login = () => {

  const [name, setName] = useState('form');

  const { register, handleSubmit, formState: { errors }, } = useForm<FormData>({ mode: "onChange" });

  const onSubmit = handleSubmit(({ email, password, remember }) => {
    console.log(email, password, remember);
  })
  return (
    <div className="w-full h-screen p-0 m-0 bg-secondary flex flex-col overflow-y-hidden justify-center ">
      <div className="mx-w-md w-full mx-auto" >
        <div className="text-xl text-center font-medium"> WELCOME BACK</div>
      </div>
      <div className="w-1/3 mx-auto mt-4 bg-white shadow-2xl  p-5  rounded shadow- ">
        <form action="" className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="" className="text-sm font-bold text-primary block"> Email</label>
            <input {...register("email", { required: "email is required" })} type="text" className="w-full p-2 border border-primary rounded mt-1 " />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="" className="text-sm font-bold text-primary block"> Password</label>
            <input {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })} type="password" className="w-full p-2 border border-primary rounded mt-1" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input {...register("remember")} type="checkbox" className="h-4 w-4 text-blue-300 rounded" />
              <label htmlFor="" className="ml-2 text-sm text-primary"> Remember me</label>
            </div>
            <div>
              <a href="" className="font-medium text-sm text-primary">Forgot password?</a>
            </div>
          </div>
          <button type='submit' className="w-full py-2 px-4 bg-primary shadow-md  hover:bg-hover hover:shadow-lg rounded-md text-white text-sm text-center"> Login</button>
        </form>

      </div>

    </div>

  );
}

export default Login;
