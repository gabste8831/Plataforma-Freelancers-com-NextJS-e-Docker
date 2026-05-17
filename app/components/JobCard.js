"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobCard({ project }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Certeza que deseja excluir esta vaga?")) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  // Format budget to BRL
  const formattedBudget = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(project.budget);

  // Format date
  const date = new Date(project.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleReopen = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hiredProfessionalId: null }),
      });
      if (res.ok) router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleClosed = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isClosed: !project.isClosed }),
      });
      if (res.ok) router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const isFilled = project.hiredProfessionalId || project.isClosed;

  return (
    <div className={`bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-500 relative scroll-mt-32 ${isFilled ? "opacity-70 group" : "hover:border-zinc-700 hover:-translate-y-1 group"}`}>
      {isFilled && (
        <div className="absolute -top-2 -right-2 z-10 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-xl uppercase tracking-tighter">
          {project.isClosed ? "Indisponível (Externo)" : "Vaga Preenchida"}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="w-fit px-2.5 py-0.5 bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/5">
              {project.category}
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-violet-400 transition-colors">
              {project.title}
            </h3>
          </div>
          <p className="text-[10px] font-medium text-zinc-600 tabular-nums uppercase">{date}</p>
        </div>
        
        <p className={`text-zinc-400 text-sm leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
          {project.description}
        </p>

        {isExpanded && (
          <div className="mt-2 pt-6 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Orçamento Estimado</span>
              <span className="text-3xl font-bold text-emerald-400 tracking-tighter">{formattedBudget}</span>
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
              {project.hiredProfessionalId ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="font-bold">{project.hiredProfessionalName}</span> alocado para este projeto.
                  </div>
                  <button
                    onClick={handleReopen}
                    disabled={isDeleting}
                    className="w-full py-3 bg-zinc-100 hover:bg-white text-zinc-950 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isDeleting ? "Abrindo..." : "Reabrir Vaga / Desvincular"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleToggleClosed}
                  disabled={isDeleting}
                  className={`w-full py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 disabled:opacity-50 ${project.isClosed ? "bg-zinc-100 hover:bg-white text-zinc-950" : "bg-zinc-800 hover:bg-zinc-700 text-white border border-white/5"}`}
                >
                  {isDeleting ? "Processando..." : project.isClosed ? "Reabrir Vaga" : "Marcar como Preenchida (Fora da plataforma)"}
                </button>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-[10px] font-bold text-zinc-600 hover:text-red-400 transition-colors uppercase tracking-widest disabled:opacity-50"
          >
            {isDeleting ? "Removendo..." : "Remover Vaga"}
          </button>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-800 text-xs font-bold text-white rounded-full border border-white/5 transition-all active:scale-95"
          >
            {isExpanded ? "Ocultar" : "Detalhes"}
            <svg className={`w-3 h-3 transition-transform duration-500 ${isExpanded ? "rotate-180" : "group-hover:translate-y-0.5"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
