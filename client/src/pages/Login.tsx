import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log(loginData)
      const data = await login(loginData);
      console.log(data);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div className='container' style={{ 
      display:"flex", 
      flexDirection:"column", 
      justifyContent:"center", 
      alignItems:"center", 
      width:"90vw"}}
      >
      <form 
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4" 
        onSubmit={handleSubmit}
        style={{color:"white"}}
        >
        <h1>Login</h1>
        <label >Username</label>
        <input 
          type='text'
          name='username'
          className="input"
          value={loginData.username || ''}
          onChange={handleChange}
        />
      <label>Password</label>
        <input 
          type='password'
          name='password'
          className="input"
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button 
          className="btn btn-neutral mt-4" 
          type='submit'
        >
          Submit Form
        </button>
      </form>
    </div>
    
  )
};

export default Login;
