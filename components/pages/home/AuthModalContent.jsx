import { loginUser, registerUser } from "@app/userSlice";
import BackendApi from "@components/common/Apis/Api";
import { useState } from "react"
import { useDispatch } from "react-redux";

export default function AuthModalContent() {

  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  })

  async function login() {
    dispatch(loginUser({ email: authForm.email, password: authForm.password }));
  }

  async function register() {
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
        {
          !isLogin && (
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username</label>
              <input type="username" name="username" id="username" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Joiny" required="true"
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
              />
            </div>
          )
        }
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
          <input type="email" name="email" id="email" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required=""
            value={authForm.email}
            onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
          <input type="password" name="password" id="password" placeholder="••••••••" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required=""
            value={authForm.password}
            onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
          />
        </div>
        {
          !isLogin && (
            <div>
              <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-white">Password Confirmation</label>
              <input type="password_confirmation" name="password_confirmation" id="password_confirmation" placeholder="••••••••" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required=""
                value={authForm.password_confirmation}
                onChange={(e) => setAuthForm({ ...authForm, password_confirmation: e.target.value })}
              />
            </div>
          )
        }
        {
          isLogin && (
            <>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                onClick={login}
              >Sign in</button>
              <p className="text-sm font-light text-gray-400">
                Dont have an account yet? <button
                  onClick={() => setIsLogin(false)}
                  className="font-medium text-primary-600 hover:underline text-primary-500">Register</button>
              </p>
            </>
          )
        }
        {
          !isLogin && (
            <>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                onClick={register}
              >Register</button>
              <p className="text-sm font-light text-gray-400">
                You have an account? <button
                  onClick={() => setIsLogin(true)}
                  className="font-medium text-primary-600 hover:underline text-primary-500">Login</button>
              </p>
            </>
          )
        }
      </div>
    </div>
  )
}