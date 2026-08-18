import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, MessageSquare } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();
    const { login, isLoggingIn } = useAuthStore();
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {success, error} = await login(formData);
    if(success){
      toast.success("Logged in successfully!");
      navigate("/");
    }
    else if(error){
      toast.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#1b101b] text-[#d7b879]">
      <div className="mx-auto grid min-h-screen max-w-[1500px] lg:grid-cols-2">
        <section className="flex items-center justify-center px-6 py-12 sm:px-12">
          <div className="w-full max-w-[480px]">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#30202a] shadow-lg shadow-black/20">
                <MessageSquare className="h-7 w-7 text-[#e5a346]" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-[#e1b45f]">
                Welcome Back
              </h1>
              <p className="text-sm text-[#8d737d]">
                Sign in to continue your conversations
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">Email</span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#796671]" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-14 w-full rounded-md border border-[#3a2935] bg-transparent pl-12 pr-4 text-[#f4e9dc] outline-none placeholder:text-[#715e69] transition focus:border-[#d99742] focus:ring-1 focus:ring-[#d99742]"
                  />
                </div>
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold">Password</span>
                  <a href="#" className="text-xs text-[#d99742] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#796671]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-14 w-full rounded-md border border-[#3a2935] bg-transparent px-12 text-[#f4e9dc] outline-none placeholder:text-[#715e69] transition focus:border-[#d99742] focus:ring-1 focus:ring-[#d99742]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#796671] transition hover:text-[#e1b45f]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </label>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-[#92747c]">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[#e5a346]"
                />
                Remember me
              </label>
              <button
                type="submit"
                disabled={isLoggingIn}
                className="h-14 w-full rounded-md bg-[#e5a346] font-bold text-[#25151a] transition hover:bg-[#f0b45a] active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoggingIn ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-[#8d737d]">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="font-semibold text-[#e1b45f] hover:underline">
                Create an account
              </a>
            </p>
          </div>
        </section>

        <section className="hidden items-center justify-center border-l border-[#261923] px-10 lg:flex">
          <div className="max-w-[500px] text-center">
            <div className="mx-auto mb-10 grid max-w-[390px] grid-cols-3 gap-3 opacity-80">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl bg-[#33212a] shadow-inner shadow-[#6b3f32]/20"
                />
              ))}
            </div>
            <h2 className="text-3xl font-bold text-[#e1b45f]">
              Stay connected
            </h2>
            <p className="mt-5 text-base leading-7 text-[#92747c]">
              Pick up where you left off and keep in touch with the people who matter.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
