import { useState } from "react";
import api from "../../../api/axios";
import toast from "react-hot-toast";
import { Option } from "../../../components/StepUI";

const StepSix = ({ patientId, visit, onDone }) => {
  const step = visit.stepSix?.[0];

  const [fogging, setFogging] = useState(step?.fogging ?? false);
  const [jcc, setJcc] = useState(step?.jcc ?? false);
  const [duochrome, setDuochrome] = useState(step?.duochrome ?? "grey");
  const [loading, setLoading] = useState(false);

  if (step?.isSubmitted) {
    return (
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-gray-400">
        Step 6 completed
      </div>
    );
  }

  const submit = async () => {
    setLoading(true);
    try {
      await api.patch(`/doctor/sixthStep/${patientId}`, {
        fog: fogging,
        jcc,
        duochrome,
      });
      toast.success("Step 6 saved");
      onDone();
    } catch {
      toast.error("Failed to submit step");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
      <h2 className="font-semibold text-lg mb-6">
        Step 6: Subjective Refraction
      </h2>

      <div className="flex gap-4 mb-4">
        <Option label="Fogging" active={fogging} onClick={() => setFogging(!fogging)} />
        <Option label="JCC" active={jcc} onClick={() => setJcc(!jcc)} />
      </div>

      <div className="mb-6">
        <label className="text-sm text-gray-400 mb-2 block">
          Duochrome
        </label>
        <select
          value={duochrome}
          onChange={(e) => setDuochrome(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10"
        >
          <option value="red">Red</option>
          <option value="brown">Brown</option>
          <option value="grey">Grey</option>
        </select>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="px-6 py-2 rounded-xl bg-emerald-600 text-white"
      >
        {loading ? "Saving..." : "Save Step"}
      </button>
    </div>
  );
};

export default StepSix;
