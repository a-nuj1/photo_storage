import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../authContext/Context';

function Login() {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to={'/home'} replace={true} />}
      <main
        className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1603457893497-4de5ef1d8ab1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
      >
        <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
          <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 text-center">Welcome Back!</h3>
<p className="text-center text-gray-500 mt-2 mb-6">Sign in to continue</p>

          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-400 font-bold">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-700 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 font-bold">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-700 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>
            {errorMessage && <span className="text-red-600 font-bold">{errorMessage}</span>}
            <button
              type="submit"
              disabled={isSigningIn}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
            >
              {isSigningIn ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-sm mt-4">Don't have an account? <Link to={'/register'} className="hover:underline font-bold text-indigo-400">Sign Up</Link></p>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-400" />
            <span className="mx-4 text-sm font-bold text-gray-400">OR</span>
            <hr className="flex-grow border-gray-400" />
          </div>
          <button
            disabled={isSigningIn}
            onClick={onGoogleSignIn}
            className={`w-full flex items-center justify-center gap-x-3 py-2.5 border border-gray-500 rounded-lg text-sm font-medium ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-700 transition duration-300'}`}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_17_40)">
                <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24527C36.1952 2.20492 30.3958 -0.0483121 24.48 9.28e-05C15.4056 9.28e-05 7.10716 5.11501 3.03296 13.2296L11.0051 19.4115C12.9143 13.7253 18.2231 9.49932 24.48 9.49932Z" fill="#EA4335" />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Continue with Google
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
