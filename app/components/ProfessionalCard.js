"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfessionalCard({ professional, availableProjects = [] }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showHiringOptions, setShowHiringOptions] = useState(false);
  const [isHiring, setIsHiring] = useState(false);

  const formattedRate = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(professional.hourlyRate);

  const handleDelete = async () => {
    if (!window.confirm("Certeza que deseja excluir este perfil?")) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/professionals/${professional.id}`, { method: "DELETE" });
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  const handleHire = async (projectId, isReopening = false) => {
    if (isHiring) return;
    setIsHiring(true);
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hiredProfessionalId: isReopening ? null : professional.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details || "Erro desconhecido no servidor");
      }

      setShowHiringOptions(false);
      router.refresh();
      if (!isReopening) alert("Contratação realizada com sucesso!");
    } catch (error) {
      console.error("Erro no vínculo:", error);
      alert(`Erro: ${error.message}`);
    } finally {
      setIsHiring(false);
    }
  };

  return (
    <div className={`bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-500 relative flex flex-col gap-5 ${professional.isHired ? "opacity-50 grayscale" : "hover:border-violet-500/30 hover:-translate-y-1 group"}`}>
      {professional.isHired && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-violet-500/10 text-violet-400 text-[10px] font-black px-3 py-1 rounded-full border border-violet-500/20 uppercase tracking-tighter">
          <div className="w-1 h-1 rounded-full bg-violet-400 animate-pulse"></div>
          Alocado
        </div>
      )}

      <div className="flex flex-col gap-1 text-left">
        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-violet-400 transition-colors">
          {professional.name}
        </h3>
        <p className="text-xs text-zinc-500 font-medium tracking-tight italic">{professional.role}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {professional.skills.split(",").map((skill, index) => (
          <span 
            key={index}
            className="px-2 py-0.5 bg-zinc-800/50 text-zinc-400 text-[10px] font-bold uppercase tracking-widest rounded-md border border-white/5"
          >
            {skill.trim()}
          </span>
        ))}
      </div>

      <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 text-left italic">
        "{professional.about}"
      </p>

      {professional.isHired && (
        <div className="flex flex-col gap-3">
          <div className="py-3 px-4 bg-violet-500/5 rounded-xl border border-violet-500/10 text-left">
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-1 font-mono">Projeto Atual</p>
            <p className="text-xs text-zinc-300 font-bold truncate">{professional.hiredProjectTitle}</p>
          </div>
          <button
            onClick={() => handleHire(professional.hiredProjectId, true)}
            disabled={isHiring}
            className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all active:scale-95 border border-white/5"
          >
            {isHiring ? "Liberando..." : "Liberar Especialista"}
          </button>
        </div>
      )}

      {!professional.isHired && (
        <div className="flex flex-col gap-3 pt-2">
          {!showHiringOptions ? (
            <button 
              onClick={() => setShowHiringOptions(true)}
              className="w-full py-2.5 px-4 bg-zinc-100 hover:bg-white text-zinc-950 text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 shadow-xl shadow-white/10"
            >
              Contratar para Projeto
            </button>
          ) : (
            <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 animate-in zoom-in-95 duration-200 shadow-2xl">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 text-left">Selecione a Vaga</p>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {availableProjects.length === 0 ? (
                  <p className="text-[10px] text-zinc-600 italic">Nenhuma vaga disponível.</p>
                ) : (
                  availableProjects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => handleHire(project.id)}
                      className="w-full text-left p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/5 transition-colors group/item"
                    >
                      <p className="text-xs font-bold text-zinc-300 group-hover/item:text-white truncate">{project.title}</p>
                      <p className="text-[9px] text-zinc-500 mt-0.5 font-mono">BRL {project.budget}</p>
                    </button>
                  ))
                )}
              </div>
              <button 
                onClick={() => setShowHiringOptions(false)}
                className="w-full mt-3 text-[9px] font-bold text-zinc-600 hover:text-zinc-400 transition-colors uppercase tracking-widest"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-auto pt-5 border-t border-white/5 flex justify-between items-end">
        <div className="flex flex-col gap-0.5 text-left">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none font-mono">Valor por hora</span>
          <span className="text-xl font-bold text-emerald-400 tracking-tighter tabular-nums leading-none">
            {formattedRate}
          </span>
        </div>
        
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-zinc-700 hover:text-red-500 transition-colors p-1"
          title="Remover Profissional"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
