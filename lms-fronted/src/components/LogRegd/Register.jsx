import React from 'react'


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#1f1f1f] flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-md rounded-3xl border border-zinc-700 bg-[#2a2a2a] shadow-2xl overflow-hidden">

        {/* Top Section */}
        <div className="flex flex-col items-center px-8 py-10 border-b border-zinc-700">

          {/* Logo */}
          <div className="h-16 w-16 rounded-2xl bg-[#dff0ea] flex items-center justify-center mb-6">
            <UserPlus className="text-[#0f8f72]" size={28} />
          </div>

          <h1 className="text-4xl font-bold text-white">
            Biblio<span className="text-[#0f8f72]">MS</span>
          </h1>

          <p className="mt-3 text-zinc-400 text-center text-lg">
            Create your account to get started
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-8">
          <form className="space-y-6">

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Full name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="text"
                  placeholder="eg. Amlan Das"
                  className="w-full rounded-xl border border-zinc-700 bg-transparent py-4 pl-12 pr-4 text-white outline-none placeholder:text-zinc-500 focus:border-[#0f8f72]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-zinc-700 bg-transparent py-4 pl-12 pr-4 text-white outline-none placeholder:text-zinc-500 focus:border-[#0f8f72]"
                />
              </div>

              <p className="mt-2 text-sm text-zinc-500">
                We’ll send a verification link to this address
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-zinc-700 bg-transparent py-4 pl-12 pr-16 text-white outline-none placeholder:text-zinc-500 focus:border-[#0f8f72]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* Password Strength */}
              <div className="mt-3 h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-2/3 bg-[#0f8f72]" />
              </div>

              <p className="mt-2 text-sm text-zinc-500">
                Use 8+ characters with a mix of letters,
                numbers & symbols
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 text-sm text-zinc-300">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-zinc-600 bg-transparent"
              />

              <p>
                I agree to the{" "}
                <span className="text-[#0f8f72] cursor-pointer">
                  terms of service
                </span>{" "}
                and{" "}
                <span className="text-[#0f8f72] cursor-pointer">
                  privacy policy
                </span>
              </p>
            </div>

            {/* Create Account */}
            <button className="w-full rounded-xl border border-zinc-700 py-4 text-xl font-semibold text-white transition hover:bg-zinc-800 flex items-center justify-center gap-2">
              <UserPlus size={20} />
              Create account
            </button>

          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-700" />

            <span className="text-zinc-400 text-sm">
              or sign up with
            </span>

            <div className="h-px flex-1 bg-zinc-700" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-4">

            <button className="flex items-center justify-center gap-3 rounded-xl border border-zinc-700 py-4 font-medium text-white hover:bg-zinc-800 transition">
              <FcGoogle size={20} />
              Google
            </button>

            <button className="flex items-center justify-center gap-3 rounded-xl border border-zinc-700 py-4 font-medium text-white hover:bg-zinc-800 transition">
              <FaGithub size={20} />
              GitHub
            </button>

          </div>

          {/* Login */}
          <p className="mt-8 text-center text-zinc-400">
            Already have an account?{" "}
            <a
              href="#"
              className="text-[#0f8f72] font-medium hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>

  )
}

export default Register