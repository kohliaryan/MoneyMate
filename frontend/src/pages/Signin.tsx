export function Signin() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center mb-4 font-poppins text-blue-600">
          Money Manager
        </h1>

        <h2 className="text-3xl font-bold text-center mb-6 font-poppins text-gray-800">
          Sign In
        </h2>

        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-full hover:bg-blue-700 transition duration-300">
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <button className="text-green-500 font-bold ml-1 hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
