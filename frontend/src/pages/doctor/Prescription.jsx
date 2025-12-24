import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { ArrowRight, FileText } from "lucide-react";

const Prescription = () => {
  const { patientId, visitId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const emptyForm = {
    sphericalLB: 0, cylindricalLB: 0, axisLB: 0, pupilDistanceLB: 0, addPowerLB: 0,
    sphericalRB: 0, cylindricalRB: 0, axisRB: 0, pupilDistanceRB: 0, addPowerRB: 0,

    sphericalLN: 0, cylindricalLN: 0, axisLN: 0, pupilDistanceLN: 0, addPowerLN: 0,
    sphericalRN: 0, cylindricalRN: 0, axisRN: 0, pupilDistanceRN: 0, addPowerRN: 0,

    sphericalLF: 0, cylindricalLF: 0, axisLF: 0, pupilDistanceLF: 0, addPowerLF: 0,
    sphericalRF: 0, cylindricalRF: 0, axisRF: 0, pupilDistanceRF: 0, addPowerRF: 0,
  };

  const [form, setForm] = useState(emptyForm);


  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await api.get(
          `/doctor/fethParticularPrecription/${patientId}`
        );

        const list = res.data?.data?.prescription || [];
        const current = list.find(
          (p) => String(p.subStep) === String(visitId)
        );

        if (!current) return;

        const bifocal = current.bifocal?.[0] || {};
        const near = current.nearVisionPower?.[0] || {};
        const far = current.farVisionPower?.[0] || {};

        setForm({
          // BIFOCAL
          sphericalLB: bifocal?.leftEye?.spherical ?? 0,
          cylindricalLB: bifocal?.leftEye?.cylindrical ?? 0,
          axisLB: bifocal?.leftEye?.axis ?? 0,
          pupilDistanceLB: bifocal?.leftEye?.pupilDistance ?? 0,
          addPowerLB: bifocal?.leftEye?.addPower ?? 0,

          sphericalRB: bifocal?.rightEye?.spherical ?? 0,
          cylindricalRB: bifocal?.rightEye?.cylindrical ?? 0,
          axisRB: bifocal?.rightEye?.axis ?? 0,
          pupilDistanceRB: bifocal?.rightEye?.pupilDistance ?? 0,
          addPowerRB: bifocal?.rightEye?.addPower ?? 0,

          // NEAR
          sphericalLN: near?.leftEye?.spherical ?? 0,
          cylindricalLN: near?.leftEye?.cylindrical ?? 0,
          axisLN: near?.leftEye?.axis ?? 0,
          pupilDistanceLN: near?.leftEye?.pupilDistance ?? 0,
          addPowerLN: near?.leftEye?.addPower ?? 0,

          sphericalRN: near?.rightEye?.spherical ?? 0,
          cylindricalRN: near?.rightEye?.cylindrical ?? 0,
          axisRN: near?.rightEye?.axis ?? 0,
          pupilDistanceRN: near?.rightEye?.pupilDistance ?? 0,
          addPowerRN: near?.rightEye?.addPower ?? 0,

          // FAR
          sphericalLF: far?.leftEye?.spherical ?? 0,
          cylindricalLF: far?.leftEye?.cylindrical ?? 0,
          axisLF: far?.leftEye?.axis ?? 0,
          pupilDistanceLF: far?.leftEye?.pupilDistance ?? 0,
          addPowerLF: far?.leftEye?.addPower ?? 0,

          sphericalRF: far?.rightEye?.spherical ?? 0,
          cylindricalRF: far?.rightEye?.cylindrical ?? 0,
          axisRF: far?.rightEye?.axis ?? 0,
          pupilDistanceRF: far?.rightEye?.pupilDistance ?? 0,
          addPowerRF: far?.rightEye?.addPower ?? 0,
        });
      } catch {
        toast.error("Failed to load prescription");
      } finally {
        setFetching(false);
      }
    };

    fetchPrescription();
  }, [patientId, visitId]);


  const handleChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setForm({ ...form, [e.target.name]: "" });
      return;
    }

    const num = Number(value);
    if (num < -10 || num > 10) return;

    setForm({ ...form, [e.target.name]: num });
  };

  const submitPrescription = async () => {
    setLoading(true);
    try {
      await api.patch(`/doctor/updatePrescription/${patientId}`, {
        visitId,
        ...form,
      });

      toast.success("Prescription saved");
      navigate(`/doctor/patient/${patientId}/visits`);
    } catch {
      toast.error("Failed to save prescription");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="h-72 flex items-center justify-center text-gray-400">
        Loading prescription…
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-14">
      <Header />

      <RxTable title="Bifocal / Progressive Power" prefix="B" form={form} onChange={handleChange} />
      <RxTable title="Near Vision Power" prefix="N" form={form} onChange={handleChange} />
      <RxTable title="Far Vision Power" prefix="F" form={form} onChange={handleChange} />

      <button
        onClick={submitPrescription}
        disabled={loading}
        className="w-full sm:w-auto sm:px-16 px-8 py-4 rounded-2xl
        bg-emerald-600 text-white font-semibold
        flex items-center justify-center gap-3
        hover:bg-emerald-700 transition disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Prescription"}
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default Prescription;

const Header = () => (
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
      Allowed range: <b>-10 to +10</b> (fractions supported)
    </p>
  </div>
);


const RxTable = ({ title, prefix, form, onChange }) => (
  <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 sm:p-6 overflow-x-auto">
    <h2 className="text-xl font-semibold mb-6">{title}</h2>

    <table className="min-w-[720px] w-full text-sm">
      <thead className="text-gray-400">
        <tr>
          <th className="text-left">Eye</th>
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
                    step="0.25"
                    min={-10}
                    max={10}
                    name={`${field}${eye}${prefix}`}
                    value={form[`${field}${eye}${prefix}`]}
                    onChange={onChange}
                    className="w-full px-3 py-2 rounded-lg
                    bg-black/40 border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
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
