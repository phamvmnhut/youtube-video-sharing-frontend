import { loginUser, registerUser } from "@app/userSlice";
import BackendApi from "@components/common/Apis/Api";
import Visibility from "@components/common/Visibility";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthModalContent() {

  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const [authForm, setAuthForm] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
    password_confirmation: undefined
  });
  const [authFormError, setAuthFormError] = useState({
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  });

  useEffect(() => {
    if (authForm.name == undefined) return;
    if (authForm.name.length < 4) {
      setAuthFormError(a => ({
        ...a,
        name: "Username must be more than 4 character"
      }))
    } else {
      setAuthFormError(a => ({
        ...a,
        name: null
      }))
    }
  }, [authForm.name])

  useEffect(() => {
    if (authForm.email == undefined) return;
    if (!emailRegex.test(authForm.email)) {
      setAuthFormError(a => ({
        ...a,
        email: "Email is invalid"
      }))
    } else {
      setAuthFormError(a => ({
        ...a,
        email: null
      }))
    }
  }, [authForm.email])

  useEffect(() => {
    if (authForm.password == undefined) return;
    if (authForm.password.length < 6) {
      setAuthFormError(a => ({
        ...a,
        password: "Password must be more than 6 character"
      }))
    } else {
      setAuthFormError(a => ({
        ...a,
        password: null
      }))
    }
  }, [authForm.password])

  useEffect(() => {
    if (authForm.password_confirmation == undefined) return;
    if (authForm.password_confirmation != authForm.password) {
      setAuthFormError(a => ({
        ...a,
        password_confirmation: "Password_confirmation must be correct with password"
      }))
    } else {
      setAuthFormError(a => ({
        ...a,
        password_confirmation: null
      }))
    }
  }, [authForm.password, authForm.password_confirmation])

  async function login() {
    if (authFormError.email || authFormError.password) {
      return toast.warn("Please complete all error before do");
    }
    dispatch(loginUser({ email: authForm.email, password: authForm.password }));
  }

  async function register() {
    if (authFormError.email || authFormError.password || authFormError.name || authFormError.password_confirmation) {
      return toast.warn("Please complete all error before do");
    }
    dispatch(registerUser({ ...authForm }));
  }

  return (
    <div className="">
      <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xltext-white mb-6">
        {
          isLogin ? "Sign in to your account" : "Register new account"
        }
      </h1>
      <div className="space-y-4 md:space-y-6">
        <Visibility
          visibility={!isLogin}>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username <span className="text-red-500">*</span></label>
            <input type="username" name="username" id="username" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Joiny" required={true}
              value={authForm.name}
              onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
            />
            <div className=" text-red-500 font-normal text-sm">{authFormError?.name}</div>
          </div>
        </Visibility>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email <span className="text-red-500">*</span></label>
          <input type="email" name="email" id="email" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required={true}
            value={authForm.email}
            onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
          />
          <div className=" text-red-500 font-normal text-sm">{authFormError?.email}</div>
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password <span className="text-red-500">*</span></label>
          <input type="password" name="password" id="password" placeholder="••••••••" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required={true}
            value={authForm.password}
            onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
          />
          <div className=" text-red-500 font-normal text-sm">{authFormError?.password}</div>
        </div>
        <Visibility
          visibility={!isLogin}>
          <div>
            <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-white">Password Confirmation <span className="text-red-500">*</span></label>
            <input type="password" name="password_confirmation" id="password_confirmation" placeholder="••••••••" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required={true}
              value={authForm.password_confirmation}
              onChange={(e) => setAuthForm({ ...authForm, password_confirmation: e.target.value })}
            />
            <div className=" text-red-500 font-normal text-sm">{authFormError?.password_confirmation}</div>
          </div>
        </Visibility>
        <Visibility
          visibility={isLogin}>
          <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
            onClick={login}
          >Sign in</button>
          <p className="text-sm font-light text-gray-400">
            Dont have an account yet? <button
              onClick={() => setIsLogin(false)}
              className="font-medium text-primary-600 hover:underline text-primary-500">Register</button>
          </p>
        </Visibility>
        <Visibility
          visibility={!isLogin}>
          <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
            onClick={register}
          >Register</button>
          <p className="text-sm font-light text-gray-400">
            You have an account? <button
              onClick={() => setIsLogin(true)}
              className="font-medium text-primary-600 hover:underline text-primary-500">Login</button>
          </p>
        </Visibility>
      </div>
    </div>
  )
}