import api from "../../../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FinalSubmit = ({ patientId }) => {
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await api.patch(`/doctor/finalSubmit/${patientId}`);
      toast.success("Visit completed. Proceed to prescription");
      
      navigate(`/doctor/prescription/${patientId}`);
    } catch {
      toast.error("Final submit failed");
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10">
      <button
        onClick={submit}
        className="w-full py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
      >
        Final Submit & Write Prescription
      </button>
    </div>
  );
};

export default FinalSubmit;
