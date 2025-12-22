import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { Eye, Play } from "lucide-react";

const PatientVisits = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await api.get(`/doctor/fetchAllVisit/${id}`);
        const data = res.data.data;

        let visitsArray = [];

        if (Array.isArray(data)) {
          visitsArray = data;
        } else if (Array.isArray(data?.steps?.visits)) {
          visitsArray = data.steps.visits;
        }

        setVisits(visitsArray);
      } catch {
        toast.error("Failed to load visit history");
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, [id]);

  if (loading) {
    return (
      <div className="h-72 flex items-center justify-center text-gray-400">
        Loading visits...
      </div>
    );
  }

  if (visits.length === 0) {
    return (
      <div className="h-72 flex flex-col items-center justify-center text-gray-400">
        <p className="text-xl font-semibold">No visits yet</p>
        <p className="text-sm mt-1">Start a visit to begin checkup</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Patient Visits
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          View, resume or review previous checkups
        </p>
      </div>

      <div className="relative space-y-6 before:absolute before:top-0 before:left-5 before:bottom-0 before:w-px before:bg-white/10">
        {visits.map((v, index) => {
          const completed =
            v.stepFirst?.[0]?.isSubmitted &&
            v.stepSecond?.[0]?.isSubmitted &&
            v.stepThird?.[0]?.isSubmitted &&
            v.stepFourth?.[0]?.isSubmitted &&
            v.stepFive?.[0]?.isSubmitted;
            // will add the final submission for the final validation of submitted!

          return (
            <div key={v._id} className="relative pl-14">
              <div
                className={`absolute left-3 top-6 h-4 w-4 rounded-full ${
                  completed
                    ? "bg-emerald-500"
                    : "bg-yellow-500 animate-pulse"
                }`}
              />

              {/* Card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Info */}
                  <div>
                    <p className="text-lg font-semibold">
                      Visit #{index + 1}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Purpose: {v.purpose?.value || "—"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        completed
                          ? "bg-emerald-600/20 text-emerald-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {completed ? "Completed" : "In Progress"}
                    </span>


                    <button
                      onClick={() =>
                        navigate(`/doctor/visit/${v._id}`)
                      }
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 transition text-sm"
                    >
                      <Eye size={14} />
                      View
                    </button>
                      <button
  onClick={() =>
    navigate(`/doctor/prescription/${id}/${v._id}`)
  }
  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full
  bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 transition text-sm"
>
  Prescription
</button>





                    {!completed && (
                      <button
                        onClick={() =>
                          navigate(`/doctor/checkup/${id}`)
                        }
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition text-sm"
                      >
                        <Play size={14} />
                        Resume
                      </button>
                      
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientVisits;
