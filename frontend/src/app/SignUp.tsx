//import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/5 backdrop-blur">
        <h1 className="text-2xl font-bold mb-6 text-center text-text">
          Create an Account
        </h1>
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-muted bg-background/50 focus:border-accent focus:ring-2 focus:ring-accent outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-muted bg-background/50 focus:border-accent focus:ring-2 focus:ring-accent outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="confirm">
              Confirm Password
            </label>
            <input
              id="confirm"
              type="password"
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 rounded-lg border border-muted bg-background/50 focus:border-accent focus:ring-2 focus:ring-accent outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-button text-white font-medium hover:bg-button/90 transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
