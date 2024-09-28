export function Signup() {
  return (
<div className="min-h-screen bg-gradient-to-r from-purple-700 via-indigo-600 to-indigo-500 flex justify-center items-center">
  <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
    
    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600 text-center mb-4 font-poppins">
      Money Manager
    </h1>

    <h2 className="text-3xl font-bold text-center mb-6 font-poppins">Sign Up</h2>

    <form>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
        <input type="text" id="name" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
        <input type="email" id="email" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
        <input type="password" id="password" className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
      </div>

      <button className="w-full bg-gradient-to-r from-purple-700 to-indigo-600 text-white font-bold py-3 rounded-full hover:shadow-lg transition duration-300">
        Sign Up
      </button>
    </form>

    <p className="text-center mt-6 text-gray-600">
      Already have an account? 
      <button className="text-indigo-600 font-bold ml-1 hover:underline">Sign In</button>
    </p>
  </div>
</div>

  );
}
