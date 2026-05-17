import JobForm from "./components/JobForm";
import JobCard from "./components/JobCard";
import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  let projects = [];
  let professionals = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    professionals = await prisma.professional.findMany();
  } catch (error) {
    console.error("Erro ao buscar projetos da Home via Prisma:", error);
  }

  const projectsWithPros = projects.map(project => {
    const hiredPro = professionals.find(pro => pro.id === project.hiredProfessionalId);
    return {
      ...project,
      hiredProfessionalName: hiredPro?.name
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900 font-sans selection:bg-violet-500/30 selection:text-white">
      {/* Header Minimalista */}
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
              <Link href="/" className="text-sm font-medium text-white transition-colors">Projetos</Link>
              <Link href="/profissionais" className="text-sm font-medium text-zinc-500 hover:text-white transition-colors">Profissionais</Link>
            </div>
            <Link 
              href="/profissionais"
              className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-full transition-all active:scale-95 shadow-lg shadow-white/10"
            >
              Ver Profissionais
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 mb-6 mt-12 pb-4 leading-normal">
            A infraestrutura para o seu próximo grande projeto.
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
            Conecte-se com os melhores desenvolvedores do mercado. Sem burocracia, apenas entregas de alto nível.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Coluna Menor: Formulário Suspenso */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <JobForm />
          </div>

          {/* Coluna Maior: Feed de Projetos */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <h3 className="text-lg font-bold text-white tracking-tight italic">Feed de Projetos</h3>
              </div>
              <span className="text-zinc-500 text-xs font-medium tabular-nums">
                ({projectsWithPros.filter(p => !p.hiredProfessionalId).length} vagas abertas)
              </span>
            </div>
 
            <div className="space-y-4">
              {projectsWithPros.length === 0 ? (
                <div className="py-20 bg-zinc-900/30 rounded-3xl border border-white/5 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-zinc-400 font-medium tracking-tight">Nenhuma vaga aberta no momento.</p>
                  <p className="text-xs text-zinc-600 mt-1 max-w-[200px]">Publique ao lado para iniciar a lista.</p>
                </div>
              ) : (
                projectsWithPros.map((project) => (
                  <JobCard key={project.id} project={project} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
