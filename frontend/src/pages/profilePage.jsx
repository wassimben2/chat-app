import { useState } from "react";
import { Atom, Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.jsx";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
const ProfilePage = () => {
    
 
  const { updateProfile, isUpdatingProfile , getUserInfo } = useAuthStore();
  const [profile, setProfile] = useState({
    fullname: "Jason Doe",
    email: "jason@gmail.com",
    profilePicture: "",
  });
  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const image = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      image.src = reader.result;
    };

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const maxSize = 800;
      const scale = Math.min(maxSize / image.width, maxSize / image.height, 1);

      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);

      setProfile((previous) => ({
        ...previous,
        profilePicture: canvas.toDataURL("image/jpeg", 0.8),
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!profile.profilePicture) {
      toast.error("Choose a profile picture first");
      return;
    }

    const result = await updateProfile({
      profilePicture: profile.profilePicture,
    });

    if (result.success) {
      toast.success("Profile updated successfully");
      setProfile((previous) => ({
        ...previous,
        profilePicture: result.profilePicture,
      }));
    } else {
      toast.error(result.error);
    }
  };
    const getUserInf = async ()=> {
        const result = await getUserInfo();
        if(result.success){
          setProfile((previous) => ({
            ...previous,
            fullname: result.fullname,
            email: result.email,
            profilePicture: result.profilePicture,
            createdAt: result.createdAt ? new Intl.DateTimeFormat('en-US' , {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }).format(new Date(result.createdAt)) : "N/A",
              
          }));
        }
        else{
          toast.error(result.error);
        }
      }

      useEffect(() => {
        getUserInf();
      }, []);
    
   
     
  return (
    <main className="min-h-screen bg-[#1b101b] px-5 py-10 text-[#d7b879]">
      <div className="mx-auto w-full" style={{ maxWidth: "560px" }}>
        <section className="rounded-sm bg-[#160d16] p-6 shadow-xl shadow-black/20 sm:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#e1b45f]">Profile</h1>
            <p className="mt-1 text-sm text-[#8d737d]">
              Your profile information
            </p>
          </div>

          <div className="mb-8 text-center">
            <label className="group relative mx-auto block w-fit cursor-pointer" aria-label="Update profile photo">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#6ce6ff] bg-[#111922] text-[#61ddfa] shadow-lg shadow-[#398dc1]/20">
                {profile.profilePicture ? (
                  <img src={profile.profilePicture} alt="Profile" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <Atom className="h-20 w-20 stroke-[1.5]" />
                )}
              </div>
              <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#160d16] bg-[#e5a346] text-[#25151a]">
                <Camera className="h-4 w-4" />
              </span>
            </label>
            <p className="mt-4 text-xs text-[#8d737d]">
              Click the camera icon to update your photo
            </p>
          </div>

          <div className="space-y-5">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#d7b879]">
                <User className="h-3.5 w-3.5" />
                Full Name
              </span>
              <input
                type="text"
                name="fullname"
                value={profile.fullname}
                onChange={handleChange}
                className="h-12 w-full rounded-md border border-[#5b4356] bg-transparent px-4 text-sm text-[#f4e9dc] outline-none transition focus:border-[#d99742] focus:ring-1 focus:ring-[#d99742]"
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#d7b879]">
                <Mail className="h-3.5 w-3.5" />
                Email Address
              </span>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="h-12 w-full rounded-md border border-[#5b4356] bg-transparent px-4 text-sm text-[#f4e9dc] outline-none transition focus:border-[#d99742] focus:ring-1 focus:ring-[#d99742]"
              />
            </label>
          </div>
        </section>
        
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isUpdatingProfile}
            className="mt-7 h-12 w-full rounded-md bg-[#e5a346] font-bold text-[#25151a] transition hover:bg-[#f0b45a] active:scale-[.99]"
          >
            {isUpdatingProfile ? "Saving..." : "Confirm Changes"}
          </button>

        <section className="mt-5 rounded-sm bg-[#160d16] p-6 shadow-xl shadow-black/20 sm:p-8">
          <h2 className="text-sm font-bold text-[#e1b45f]">Account Information</h2>
          <div className="mt-5 divide-y divide-[#30202a] text-sm">
            <div className="flex items-center justify-between py-4">
              <span className="text-[#92747c]">Member Since</span>
              <span className="text-[#d7b879]">{profile.createdAt}</span>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="text-[#92747c]">Account Status</span>
              <span className="font-semibold text-emerald-400">Active</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
