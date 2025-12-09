import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center overflow-hidden">
        {/* Abstract Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-brand-blue/20 z-0"></div>

        <div className="relative z-10 max-w-5xl w-full">
          {/* Logo / Brand Area */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
              {/* Placeholder for Logo if img_0 is logo */}
              <Image
                src="/assets/img_0.png"
                alt="Logo CheckUP"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Sua Saúde, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500">
              Na Palma da Mão
            </span>
          </h1>

          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A <strong>Carteirinha Digital CheckUp</strong> oferece acesso simplificado à rede credenciada Bradesco.
            Gestão inteligente, pagamentos seguros e benefícios exclusivos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/checkout"
              className="px-8 py-4 rounded-full bg-brand-orange text-white text-lg font-bold hover:bg-orange-600 transition shadow-lg hover:shadow-orange-500/20"
            >
              Quero Minha Carteirinha
            </Link>
            <Link
              href="/sign-in"
              className="px-8 py-4 rounded-full bg-zinc-800 text-white text-lg font-semibold hover:bg-zinc-700 transition border border-zinc-700"
            >
              Já sou Cliente
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
            <Image
              src="/assets/img_1.png"
              alt="App Preview"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Benefícios Exclusivos</h2>
            <ul className="space-y-4 text-lg text-zinc-400">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-xs">✓</span>
                Rede ampla de atendimento
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-xs">✓</span>
                Descontos em farmácias
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-xs">✓</span>
                Agendamento online rápido
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
