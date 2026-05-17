"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JobForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    budget: "",
    description: "",
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
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          budget: parseFloat(formData.budget),
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao salvar o projeto. Tente novamente.");
      }

      const newProject = await res.json();
      setSuccess("Vaga publicada com sucesso!");
      setFormData({ title: "", category: "", budget: "", description: "" });
      
      router.refresh(); // Atualiza a página com o novo projeto
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full bg-zinc-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
      {/* Luz ambiente de fundo */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl group-hover:bg-violet-600/20 transition-colors duration-700"></div>
      
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-white tracking-tight mb-1">Publicar Projeto</h2>
        <p className="text-xs text-zinc-500 mb-8">Defina os requisitos e o orçamento.</p>
        
        {error && <div className="mb-6 bg-red-500/10 text-red-400 p-3 rounded-xl text-[10px] font-bold border border-red-500/20 uppercase tracking-widest">{error}</div>}
        {success && <div className="mb-6 bg-emerald-500/10 text-emerald-400 p-3 rounded-xl text-[10px] font-bold border border-emerald-500/20 uppercase tracking-widest">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest" htmlFor="title">Título do Projeto</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Landing Page para SaaS"
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-white/5 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 outline-none transition-all placeholder:text-zinc-700 text-zinc-100 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest" htmlFor="category">Categoria</label>
              <input
                id="category"
                name="category"
                type="text"
                required
                value={formData.category}
                onChange={handleChange}
                placeholder="Software"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-white/5 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 outline-none transition-all placeholder:text-zinc-700 text-zinc-100 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest" htmlFor="budget">Budget (R$)</label>
              <input
                id="budget"
                name="budget"
                type="number"
                required
                value={formData.budget}
                onChange={handleChange}
                placeholder="2500"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-white/5 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 outline-none transition-all placeholder:text-zinc-700 text-zinc-100 text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest" htmlFor="description">Escopo do Trabalho</label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva os entregáveis..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 border border-white/5 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 outline-none transition-all resize-none placeholder:text-zinc-700 text-zinc-100 text-sm"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-widest shadow-xl shadow-white/5 transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {loading ? "Processando..." : "Publicar Projeto"}
          </button>
        </form>
      </div>
    </div>
  );
}
