// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import {
//   ShieldCheck,
//   ArrowRight,
//   Lock,
//   Home,
// } from "lucide-react";

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!identifier || !password) {
//       toast.error("All fields are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       await api.post("/admin/login", {
//         email: identifier,
//         phoneNumber: identifier,
//         password,
//       });

//       toast.success("Administrative access granted");
//       navigate("/admin/dashboard");
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden px-4">

//       <button
//         onClick={() => navigate("/")}
//         className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-xl
//         bg-white/[0.05] backdrop-blur-md border border-white/10
//         text-gray-300 hover:text-white hover:bg-white/10
//         transition"
//       >
//         <Home size={16} />
//         <span className="text-sm font-medium hidden sm:inline">
//           Home
//         </span>
//       </button>

//       <div className="absolute inset-0 opacity-[0.035]
//         bg-[linear-gradient(to_right,white_1px,transparent_1px),
//         linear-gradient(to_bottom,white_1px,transparent_1px)]
//         bg-[size:48px_48px]" />

//       <div className="absolute -top-1/3 -left-1/3 w-[800px] h-[800px] bg-blue-600/25 blur-[180px]" />
//       <div className="absolute -bottom-1/3 -right-1/3 w-[800px] h-[800px] bg-indigo-600/25 blur-[180px]" />

//       <form
//         onSubmit={handleSubmit}
//         className="relative w-full max-w-md rounded-[38px]
//         border border-white/10 bg-white/[0.035]
//         backdrop-blur-2xl p-12
//         shadow-[0_90px_200px_rgba(0,0,0,0.9)]"
//       >
//         <div className="flex flex-col items-center text-center mb-12">
//           <div className="relative mb-7">
//             <div className="absolute inset-0 blur-2xl bg-blue-600/40 rounded-full" />
//             <div className="relative w-16 h-16 rounded-2xl
//               bg-gradient-to-br from-blue-600 to-indigo-600
//               flex items-center justify-center
//               shadow-[0_30px_90px_rgba(59,130,246,0.65)]"
//             >
//               <ShieldCheck className="text-white" size={28} />
//             </div>
//           </div>

//           <span className="text-[11px] tracking-[0.45em] text-blue-400 uppercase mb-3">
//             Restricted Access
//           </span>

//           <h1 className="text-2xl font-semibold tracking-tight text-white">
//             Admin Control Panel
//           </h1>

//           <p className="text-sm text-gray-400 mt-3 max-w-xs leading-relaxed">
//             System-level access for managing doctors, patients,
//             and operational integrity.
//           </p>
//         </div>

//         <div className="space-y-6">
//           <Input
//             label="Email or Phone"
//             value={identifier}
//             onChange={(e) => setIdentifier(e.target.value)}
//           />

//           <Input
//             type="password"
//             label="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <div className="mt-12">
//           <button
//             type="submit"
//             disabled={loading}
//             className="group relative w-full inline-flex items-center justify-center gap-3
//             px-6 py-4 rounded-2xl
//             bg-gradient-to-r from-blue-600 to-indigo-600
//             text-white font-medium
//             shadow-[0_35px_120px_rgba(59,130,246,0.55)]
//             hover:shadow-[0_45px_160px_rgba(59,130,246,0.8)]
//             transition-all disabled:opacity-60"
//           >
//             <span className="relative z-10 flex items-center gap-2">
//               <Lock size={18} />
//               {loading ? "Verifying..." : "Enter Admin Console"}
//             </span>

//             <ArrowRight
//               size={18}
//               className="relative z-10 opacity-70
//               group-hover:translate-x-1 transition"
//             />

//             <div className="absolute inset-0 opacity-0
//               group-hover:opacity-100 transition
//               bg-gradient-to-r from-white/20 to-transparent
//               rounded-2xl"
//             />
//           </button>
//         </div>

//         <div className="mt-8 text-center">
//           <p className="text-[11px] text-gray-500 tracking-wide">
//             Role-based access · Audit-ready · Zero-trust security
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;

// const Input = ({ label, type = "text", value, onChange }) => {
//   return (
//     <div className="space-y-2">
//       <label className="text-sm text-gray-400">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         required
//         className="w-full px-4 py-3 rounded-xl
//         bg-black/50 border border-white/10
//         text-white placeholder-gray-500
//         focus:outline-none focus:ring-2
//         focus:ring-blue-500/40
//         focus:border-blue-500/40
//         transition"
//       />
//     </div>
//   );
// };



// import { useState } from "react";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import { ShieldCheck, ArrowRight, Lock } from "lucide-react";

// const AdminLogin = () => {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!identifier || !password) {
//       toast.error("All fields are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await api.post("/admin/login", {
//         email: identifier,
//         phoneNumber: identifier,
//         password,
//       });

//       // 🔥 STORE TOKEN
//       localStorage.setItem("accessToken", res.data.data.accessToken);

//       toast.success("Admin access granted");

//       // 🔥 FORCE CLEAN AUTH BOOTSTRAP
//       window.location.href = "/admin/dashboard";
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#020617]">
//       <form onSubmit={handleSubmit} className="w-full max-w-md p-10 bg-black/40 rounded-2xl">
//         <h1 className="text-white text-2xl mb-6 flex items-center gap-2">
//           <ShieldCheck /> Admin Login
//         </h1>

//         <input
//           placeholder="Email or Phone"
//           value={identifier}
//           onChange={(e) => setIdentifier(e.target.value)}
//           className="w-full mb-4 p-3 rounded bg-black text-white border"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-6 p-3 rounded bg-black text-white border"
//         />

//         <button
//           disabled={loading}
//           className="w-full bg-blue-600 text-white p-3 rounded flex items-center justify-center gap-2"
//         >
//           <Lock />
//           {loading ? "Verifying..." : "Login"}
//           <ArrowRight />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;


import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  Home,
} from "lucide-react";

const AdminLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/admin/login", {
        email: identifier,
        phoneNumber: identifier,
        password,
      });

      localStorage.setItem("accessToken", res.data.data.accessToken);

      toast.success("Administrative access granted");
      window.location.href = "/admin/dashboard";
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden px-4">

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.035]
        bg-[linear-gradient(to_right,white_1px,transparent_1px),
        linear-gradient(to_bottom,white_1px,transparent_1px)]
        bg-[size:48px_48px]"
      />

      {/* Glow blobs */}
      <div className="absolute -top-1/3 -left-1/3 w-[800px] h-[800px] bg-blue-600/25 blur-[180px]" />
      <div className="absolute -bottom-1/3 -right-1/3 w-[800px] h-[800px] bg-indigo-600/25 blur-[180px]" />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-[38px]
        border border-white/10 bg-white/[0.035]
        backdrop-blur-2xl p-12
        shadow-[0_90px_200px_rgba(0,0,0,0.9)]"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="relative mb-7">
            <div className="absolute inset-0 blur-2xl bg-blue-600/40 rounded-full" />
            <div
              className="relative w-16 h-16 rounded-2xl
              bg-gradient-to-br from-blue-600 to-indigo-600
              flex items-center justify-center
              shadow-[0_30px_90px_rgba(59,130,246,0.65)]"
            >
              <ShieldCheck className="text-white" size={28} />
            </div>
          </div>

          <span className="text-[11px] tracking-[0.45em] text-blue-400 uppercase mb-3">
            Restricted Access
          </span>

          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Admin Control Panel
          </h1>

          <p className="text-sm text-gray-400 mt-3 max-w-xs leading-relaxed">
            System-level access for managing doctors, patients,
            and operational integrity.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-6">
          <Input
            label="Email or Phone"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <div className="mt-12">
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full inline-flex items-center justify-center gap-3
            px-6 py-4 rounded-2xl
            bg-gradient-to-r from-blue-600 to-indigo-600
            text-white font-medium
            shadow-[0_35px_120px_rgba(59,130,246,0.55)]
            hover:shadow-[0_45px_160px_rgba(59,130,246,0.8)]
            transition-all disabled:opacity-60"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Lock size={18} />
              {loading ? "Verifying..." : "Enter Admin Console"}
            </span>

            <ArrowRight
              size={18}
              className="relative z-10 opacity-70
              group-hover:translate-x-1 transition"
            />

            <div
              className="absolute inset-0 opacity-0
              group-hover:opacity-100 transition
              bg-gradient-to-r from-white/20 to-transparent
              rounded-2xl"
            />
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-gray-500 tracking-wide">
            Role-based access · Audit-ready · Zero-trust security
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;

const Input = ({ label, type = "text", value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-3 rounded-xl
        bg-black/50 border border-white/10
        text-white placeholder-gray-500
        focus:outline-none focus:ring-2
        focus:ring-blue-500/40
        focus:border-blue-500/40
        transition"
      />
    </div>
  );
};
