import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { ArrowRight, FileText } from "lucide-react";

const Prescription = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    // bifocal
    sphericalLB: 0, cylindricalLB: 0, axisLB: 0, pupilDistanceLB: 0, addPowerLB: 0,
    sphericalRB: 0, cylindricalRB: 0, axisRB: 0, pupilDistanceRB: 0, addPowerRB: 0,

    // near
    sphericalLN: 0, cylindricalLN: 0, axisLN: 0, pupilDistanceLN: 0, addPowerLN: 0,
    sphericalRN: 0, cylindricalRN: 0, axisRN: 0, pupilDistanceRN: 0, addPowerRN: 0,

    // far
    sphericalLF: 0, cylindricalLF: 0, axisLF: 0, pupilDistanceLF: 0, addPowerLF: 0,
    sphericalRF: 0, cylindricalRF: 0, axisRF: 0, pupilDistanceRF: 0, addPowerRF: 0,
  });

  const handleChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setForm({ ...form, [e.target.name]: "" });
      return;
    }

    const num = Number(value);

    if (num < -10 || num > 10) return;

    setForm({
      ...form,
      [e.target.name]: num,
    });
  };

  const submitPrescription = async () => {
    setLoading(true);
    try {
      await api.patch(`/doctor/updatePrescription/${patientId}`, form);
      toast.success("Prescription saved successfully");
      navigate("/doctor/patients");
    } catch {
      toast.error("Failed to save prescription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center ring-1 ring-emerald-500/30">
            <FileText className="text-emerald-400" />
          </div>
          <span className="text-xs tracking-[0.3em] uppercase text-emerald-400">
            Prescription
          </span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">
          Clinical Prescription
        </h1>
        <p className="text-gray-400 mt-2">
          Values allowed from <b>-10 to +10</b>. Fractions supported (0.25 / 0.5 / 1.5).
        </p>
      </div>

      <RxTable
        title="Bifocal / Progressive Power"
        prefix="B"
        form={form}
        onChange={handleChange}
      />

      <RxTable
        title="Near Vision Power"
        prefix="N"
        form={form}
        onChange={handleChange}
      />

      <RxTable
        title="Far Vision Power"
        prefix="F"
        form={form}
        onChange={handleChange}
      />

      <div className="pt-6">
        <button
          onClick={submitPrescription}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl
          bg-emerald-600 text-white font-semibold
          shadow-[0_25px_80px_rgba(16,185,129,0.45)]
          hover:bg-emerald-700 hover:shadow-[0_35px_120px_rgba(16,185,129,0.6)]
          transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Prescription"}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Prescription;

const RxTable = ({ title, prefix, form, onChange }) => {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>

      <table className="min-w-[720px] w-full text-sm">
        <thead className="text-gray-400">
          <tr>
            <th className="text-left py-3">Eye</th>
            <th>Spherical</th>
            <th>Cylindrical</th>
            <th>Axis</th>
            <th>PD</th>
            <th>Add</th>
          </tr>
        </thead>

        <tbody>
          {["L", "R"].map((eye) => (
            <tr key={eye} className="border-t border-white/10">
              <td className="py-3 font-medium">
                {eye === "L" ? "Left" : "Right"}
              </td>

              {["spherical", "cylindrical", "axis", "pupilDistance", "addPower"].map(
                (field) => (
                  <td key={field} className="px-1">
                    <input
                      type="number"
                      inputMode="decimal"
                      step="0.25"
                      min={-10}
                      max={10}
                      name={`${field}${eye}${prefix}`}
                      value={form[`${field}${eye}${prefix}`]}
                      onChange={onChange}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10
                      text-white focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                    />
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
