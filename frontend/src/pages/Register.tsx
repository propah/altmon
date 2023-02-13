import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;

  const onChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      console.log(formData);
    }
  };

  return (
    <>
      <div className="container mx-auto fs-regular text-white">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full 2xl:w-4/12 xl:w-5/12 lg:w-6/12 md:w-8/12 sm:w-12/12 bg-black p-5 rounded-lg">
            <h3 className="pt-4 text-2xl text-center bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-color">
              Register
            </h3>
            <form className="px-8 pt-6 pb-8 mb-4 rounded" onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-300">
                  username
                </label>
                <input
                  className="bg-black w-full px-3 py-2 text-sm leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="username"
                  name="username"
                  value={username}
                  type="text"
                  onChange={onChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-300">
                  email
                </label>
                <input
                  className="bg-black w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  value={email}
                  type="email"
                  onChange={onChange}
                />
              </div>
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-300">
                    password
                  </label>
                  <input
                    className="bg-black w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-200 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    value={password}
                    type="password"
                    onChange={onChange}
                  />
                  <p className="text-xs italic text-red-500">
                    Please choose a password.
                  </p>
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-300">
                    confirm password
                  </label>
                  <input
                    className="bg-black w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-200 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password2"
                    name="password2"
                    value={password2}
                    type="password"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="mb-6 text-center text-lg fs-regular">
                <button
                  className="w-full px-4 py-2 font-bold text-black hover:text-zinc-300 bg-gradient-to-r from-red-500 via-amber-500 to-orange-500 hover:bg-gradient-to-r hover:from-red-500 hover:via-amber-400 hover:to-orange-500 animate-color rounded-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
              <Link to='/login' className=''>
                <div className="text-center fs-regular">
                    <a
                    className="inline-block text-base text-white align-baselinefocus:outline-none hover:bg-gray-200 hover:text-black p-3 rounded"
                    href="./login"
                    >
                    Login
                    </a>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
