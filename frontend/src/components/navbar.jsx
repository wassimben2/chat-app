import { LogOut, MessageSquare, Settings, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.jsx";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
    const navigate = useNavigate();
    const {logout} = useAuthStore();
    const handleLogout = async () =>{
    try{
       const result = await logout();
       if(result){
        toast.success("You have been logged out successfully");
        navigate("/login");
       }
    }catch(error){
        console.log(error);
        toast.error("An error occurred while logging out");
    }
}
    

  return (
    <header className="border-b border-[#30202a] bg-[#1b101b]/95">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#30202a]">
            <MessageSquare className="h-5 w-5 text-[#e5a346]" />
          </span>
          <span className="text-lg font-bold text-[#e1b45f]">Chatty</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/settings"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#92747c] transition hover:bg-[#30202a] hover:text-[#e1b45f]"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>
          <Link
            to="/profile"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#92747c] transition hover:bg-[#30202a] hover:text-[#e1b45f] sm:flex"
          >
            <UserRound className="h-4 w-4" />
            Profile
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#92747c] transition hover:bg-[#30202a] hover:text-[#e1b45f] sm:flex"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
