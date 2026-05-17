"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfessionalForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    skills: "",
    hourlyRate: "",
    about: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/professionals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          hourlyRate: parseFloat(formData.hourlyRate),
        }),
      });

      if (!res.ok) throw new Error("Erro ao criar perfil.");

      setSuccess("Perfil criado com sucesso!");
      setFormData({ name: "", role: "", skills: "", hourlyRate: "", about: "" });
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-zinc-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
      {/* Luz ambiente de fundo (Violeta) */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors duration-700"></div>
      
      <div className="relative z-10 text-left">
        <h2 className="text-xl font-bold text-white tracking-tight mb-1">Perfil Freelancer</h2>
        <p className="text-xs text-zinc-500 mb-8 font-medium">Conectando os melhores talentos de tecnologia.</p>
        
        {error && <div className="mb-6 bg-red-500/10 text-red-400 p-3 rounded-xl text-[10px] font-bold border border-red-500/20 uppercase tracking-widest">{error}</div>}
        {success && <div className="mb-6 bg-emerald-500/10 text-emerald-400 p-3 rounded-xl text-[10px] font-bold border border-emerald-500/20 uppercase tracking-widest">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono" htmlFor="name">Nome Completo</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Alan Turing"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-white/5 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-zinc-700 text-zinc-100 text-sm font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono" htmlFor="role">Especialidade</label>
              <input
                id="role"
                name="role"
                type="text"
                required
                value={formData.role}
                onChange={handleChange}
                placeholder="Ex: Arquiteto Cloud"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-white/5 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-zinc-700 text-zinc-100 text-sm font-medium"
              />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono" htmlFor="hourlyRate">Taxa (R$)</label>
              <input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                required
                value={formData.hourlyRate}
                onChange={handleChange}
                placeholder="150"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-white/5 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-zinc-700 text-zinc-100 text-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono" htmlFor="skills">Hard Skills (tags separadas por vírgula)</label>
            <input
              id="skills"
              name="skills"
              type="text"
              required
              value={formData.skills}
              onChange={handleChange}
              placeholder="Next.js, Python, AWS"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-white/5 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-zinc-700 text-zinc-100 text-sm font-medium"
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono" htmlFor="about">Bio Executiva</label>
            <textarea
              id="about"
              name="about"
              required
              rows={3}
              value={formData.about}
              onChange={handleChange}
              placeholder="Conte sua trajetória em poucas linhas..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-white/5 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all resize-none placeholder:text-zinc-700 text-zinc-100 text-sm font-medium leading-relaxed"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-widest shadow-xl shadow-white/5 transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {loading ? "Processando..." : "Confirmar Cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
}
