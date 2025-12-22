import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { FileText, ArrowRight } from "lucide-react";

const PrescriptionList = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await api.get(
          `/doctor/fethParticularPrecription/${patientId}`
        );

        setPrescriptions(res.data.data?.prescription || []);
      } catch {
        toast.error("Failed to load prescriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [patientId]);

  if (loading) {
    return (
      <div className="h-72 flex items-center justify-center text-gray-400">
        Loading prescriptions…
      </div>
    );
  }

  if (prescriptions.length === 0) {
    return (
      <div className="h-72 flex flex-col items-center justify-center text-gray-400">
        <p className="text-lg font-medium">No prescriptions found</p>
        <p className="text-sm mt-1">
          Complete a visit to generate prescription
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 px-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Prescriptions
        </h1>
        <p className="text-gray-400 mt-2">
          Visit-wise optical prescriptions
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {prescriptions.map((rx, index) => (
          <div
            key={rx._id}
            className="rounded-[26px] bg-white/[0.04] border border-white/10
            backdrop-blur-xl p-6 hover:bg-white/[0.07] transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20
              flex items-center justify-center ring-1 ring-emerald-500/30">
                <FileText className="text-emerald-400" />
              </div>

              <div>
                <p className="font-semibold">
                  Visit #{index + 1}
                </p>
                <p className="text-xs text-gray-400">
                  Prescription ID
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/doctor/prescription/${patientId}/${rx.subStep}`
                )
              }
              className="mt-4 w-full inline-flex items-center justify-center
              gap-2 px-5 py-3 rounded-xl bg-emerald-600/20
              text-emerald-400 hover:bg-emerald-600/30 transition text-sm"
            >
              Open Prescription
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionList;
