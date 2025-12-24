// import { Navigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../api/axios.js"

// const ProtectedRoute = ({ children, role }) => {
//   const location = useLocation();
//   const [loading, setLoading] = useState(true);
//   const [allowed, setAllowed] = useState(false);

//   useEffect(() => {
//     const verify = async () => {
//       try {
//         if (role === "admin") {
//           await api.get("/admin/verify"); 
//         }

//         if (role === "doctor") {
//           await api.get("/doctor/verify"); 
//         }

//         setAllowed(true);
//       } catch {
//         setAllowed(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     verify();
//   }, [role]);

//   if (loading) return null;

//   if (!allowed) {
//     return (
//       <Navigate
//         to={role === "admin" ? "/admin/login" : "/doctor/login"}
//         state={{ from: location }}
//         replace
//       />
//     );
//   }

//   return children;
// };

// export default ProtectedRoute;


import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const url =
          role === "admin" ? "/admin/verify" : "/doctor/verify";

        await api.get(url);
        setAllowed(true);
      } catch {
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [role]);

  if (loading) return null;

  if (!allowed) {
    return (
      <Navigate
        to={role === "admin" ? "/admin/login" : "/doctor/login"}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
