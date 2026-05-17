import ProfessionalForm from "@/app/components/ProfessionalForm";
import ProfessionalCard from "@/app/components/ProfessionalCard";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProfessionalsPage() {
  let pros = [];
  let availableProjects = [];
  let allProjects = [];
  try {
    pros = await prisma.professional.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    allProjects = await prisma.project.findMany();
    availableProjects = allProjects.filter(p => !p.hiredProfessionalId);
  } catch (error) {
    console.error("Erro ao buscar dados via Prisma:", error);
  }

  // Mapear profissionais para saber se estão ocupados
  const prosWithStatus = pros.map(pro => {
    const hiredProject = allProjects.find(p => p.hiredProfessionalId === pro.id);
    return {
      ...pro,
      isHired: !!hiredProject,
      hiredProjectId: hiredProject?.id,
      hiredProjectTitle: hiredProject?.title
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900 font-sans selection:bg-violet-500/30 selection:text-white">
      {/* Header Minimalista (Unificado) */}
      <header className="bg-zinc-950/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center transition-transform group-hover:rotate-12">
              <div className="w-4 h-4 border-2 border-zinc-950 rounded-sm"></div>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              freela<span className="text-zinc-500">cloud</span>
            </h1>
          </Link>
          <nav className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-white transition-colors">Projetos</Link>
              <Link href="/profissionais" className="text-sm font-medium text-white transition-colors">Profissionais</Link>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-full border border-white/5 transition-all active:scale-95"
            >
              Publicar Job
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 mb-6 mt-12 pb-4 leading-normal">
            Encontre talentos que constroem o futuro.
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
            Profissionais independentes com habilidades de classe mundial, prontos para integrar seu time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Coluna Menor: Cadastro de Profissionais */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <ProfessionalForm />
          </div>

          {/* Coluna Maior: Feed de Profissionais */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
                <h3 className="text-lg font-bold text-white tracking-tight italic">Especialistas Disponíveis</h3>
              </div>
              <span className="text-zinc-500 text-xs font-medium tabular-nums">
                ({pros.length} membros na comunidade)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prosWithStatus.length === 0 ? (
                <div className="col-span-full py-20 bg-zinc-900/30 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-zinc-400 font-medium tracking-tight">Nenhum especialista cadastrado.</p>
                </div>
              ) : (
                prosWithStatus.map((pro) => (
                  <ProfessionalCard 
                    key={pro.id} 
                    professional={pro} 
                    availableProjects={availableProjects}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
