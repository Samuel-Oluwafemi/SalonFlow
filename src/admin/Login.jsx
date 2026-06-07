import { signInWithEmailAndPassword } from "firebase/auth";
import { Boxes, Loader, FileWarning } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation first
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Authenticate with Firebase
      console.log("Auth started");
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      // Navigate immediately without waiting for state updates
      navigate("/dashboard", { replace: true });
    } catch (error) {
      // Handle Firebase errors
      setLoading(false);
      if (error.code === "auth/user-not-found") {
        setError("Email address not found");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        setError(error.message || "Login failed. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-center mb-2">
          <div className="p-2 bg-purple-100 rounded-lg mr-2">
            <Boxes className="text-purple-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Salonflow</h2>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-center text-gray-600 font-medium mb-2">
          Sign In to view Admin Panel
        </p>
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-left">
          Admin Login
        </h3>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full px-4 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
              transition disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-4 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
              transition disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              autoComplete="current-password"
            />

            <a href="#">
              <h2 className="text-xs mt-1 underline text-blue-800">
                forgot password
              </h2>
            </a>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 
            text-white font-semibold py-2.5 px-4 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
            transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="flex text-center justify-center mt-4 gap-1">
          <FileWarning className="text-purple-600" size={15} />
          <p className="text-center text-gray-600 text-xs">
            Protected admin access only
          </p>
        </div>
      </div>
    </div>
  );
}
