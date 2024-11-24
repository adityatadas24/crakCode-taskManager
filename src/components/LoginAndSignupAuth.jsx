import React, { useState } from "react";
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";


const LoginAndSignupAuth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
    
    
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      toast.success('Welcome User')
      navigate("/tasks");
    } catch (err) {
      setError(err.message);
      toast.error(err.message)
    } finally {
      setLoading(false);
    }
  };

  if (user) navigate("/tasks");

  return (
    <div className="w-full flex justify-center items-center min-h-screen
     bg-[#242424] text-white ">
      <div className="w-2/5 flex justify-center items-center p-8
       bg-slate-600 rounded-xl flex-col gap-10 max-md:w-11/12 shadow-[0_0px_20px_0px]">

      
      <h2 className=" text-5xl font-bold">{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="w-full flex justify-center
       items-center flex-col gap-6">
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-black p-2 px-4 w-full rounded-md  "
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className=" text-black p-2 px-4 w-full rounded-md"

        />
        <button className="bg-white p-2 text-black px-8 text-xl
         font-semibold rounded-lg" type="submit">
          {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
        </button>
       
      </form>
      

      <p  onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? (<p>Don't Have An Account ? <span className="text-blue-400 cursor-pointer">Click Here</span></p>)
         : (<p>Have An Account Already ? <span className="text-blue-400 cursor-pointer">Click Here</span></p>)}
      </p>
      </div>
    </div>
  );
};

export default LoginAndSignupAuth;
