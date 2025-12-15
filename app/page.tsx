'use client';

import Link from 'next/link';
import { Shield, Heart, Users, ChevronRight, CreditCard, MapPin, Activity, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Pricing from '@/components/ui/Pricing/Pricing';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-brand-blue">CheckUp Benefícios</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#servicos" className="text-muted-foreground hover:text-brand-blue transition-colors font-medium">
              Serviços
            </a>
            <Link href="/sobre" className="text-muted-foreground hover:text-brand-blue transition-colors font-medium">
              Sobre Nós
            </Link>
            <a href="#contato" className="text-muted-foreground hover:text-brand-blue transition-colors font-medium">
              Contato
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <SignedIn>
              <Link href="/admin">
                <button className="px-4 py-2 text-sm font-medium rounded-lg bg-brand-orange text-white shadow-button hover:bg-brand-orange/90 transition-colors">
                  Painel
                </button>
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link href="/admin">
                <button className="px-4 py-2 text-sm font-medium rounded-lg border border-brand-blue text-brand-blue hover:bg-brand-blue-light transition-colors">
                  Área do Admin
                </button>
              </Link>
              <Link href="/sign-in">
                <button className="px-4 py-2 text-sm font-medium rounded-lg bg-brand-orange text-white shadow-button hover:bg-brand-orange/90 transition-colors">
                  Acessar
                </button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 hero-gradient relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue-light border border-brand-blue/10 mb-6">
                <Heart className="w-4 h-4 text-brand-orange" />
                <span className="text-sm font-medium text-brand-blue">Cuidando da sua saúde</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-blue leading-tight mb-6">
                Gestão completa de benefícios para sua{' '}
                <span className="text-brand-orange">saúde</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Simplifique o gerenciamento dos seus benefícios de saúde com nossa plataforma digital.
                Acesse sua carteirinha, encontre a rede credenciada e muito mais.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/minha-area">
                  <button className="px-8 py-4 text-lg font-bold rounded-xl bg-brand-orange text-white shadow-button hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                    Acessar Carteirinha
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </Link>
                <a href="#planos" className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-brand-blue text-brand-blue hover:bg-brand-blue-light transition-colors flex items-center justify-center">
                  Conhecer Serviços
                </a>
              </div>

              <div className="flex items-center gap-8 mt-10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="text-sm text-muted-foreground">100% Digital</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="text-sm text-muted-foreground">Suporte 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="text-sm text-muted-foreground">Seguro</span>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px]">
                {/* Main card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-48 bg-gradient-to-br from-brand-blue to-brand-blue-medium rounded-2xl shadow-2xl p-6 animate-float">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-primary-foreground/80 text-sm">Carteirinha Digital</p>
                      <p className="text-primary-foreground font-semibold">CheckUp Benefícios</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 bg-primary-foreground/20 rounded" />
                    <div className="h-3 w-1/2 bg-primary-foreground/20 rounded" />
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Shield className="w-8 h-8 text-primary-foreground/40" />
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-10 right-10 w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center shadow-lg animate-pulse-slow">
                  <Heart className="w-8 h-8 text-accent-foreground" />
                </div>
                <div className="absolute bottom-20 left-10 w-14 h-14 bg-success rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-7 h-7 text-success-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicos" className="py-20 bg-card relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
              Serviços Rápidos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Acesse os principais serviços da sua conta de forma rápida e prática
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="group bg-card card-gradient rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-brand-blue-light flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-colors duration-300">
                <CreditCard className="w-7 h-7 text-brand-blue group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Carteirinha Digital
              </h3>
              <p className="text-muted-foreground mb-6">
                Acesse sua carteirinha digital a qualquer momento, sem necessidade de impressão.
              </p>
              <button className="text-brand-orange hover:text-brand-orange p-0 h-auto font-semibold flex items-center">
                Acessar <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="group bg-card card-gradient rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-brand-orange-light flex items-center justify-center mb-6 group-hover:bg-brand-orange transition-colors duration-300">
                <MapPin className="w-7 h-7 text-brand-orange group-hover:text-accent-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Rede Credenciada
              </h3>
              <p className="text-muted-foreground mb-6">
                Encontre hospitais, clínicas e laboratórios próximos de você em nossa rede.
              </p>
              <button className="text-brand-orange hover:text-brand-orange p-0 h-auto font-semibold flex items-center">
                Buscar <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="group bg-card card-gradient rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center mb-6 group-hover:bg-success transition-colors duration-300">
                <Activity className="w-7 h-7 text-success group-hover:text-success-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Status da Assinatura
              </h3>
              <p className="text-muted-foreground mb-6">
                Verifique o status da sua assinatura e mantenha seus benefícios em dia.
              </p>
              <button className="text-brand-orange hover:text-brand-orange p-0 h-auto font-semibold flex items-center">
                Verificar <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-primary-foreground mb-2">15k+</p>
              <p className="text-primary-foreground/70">Associados Ativos</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary-foreground mb-2">500+</p>
              <p className="text-primary-foreground/70">Clínicas Credenciadas</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary-foreground mb-2">98%</p>
              <p className="text-primary-foreground/70">Satisfação</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary-foreground mb-2">24/7</p>
              <p className="text-primary-foreground/70">Suporte Disponível</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-brand-blue-light to-background rounded-3xl p-12 border border-border">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
              Comece a usar agora
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Acesse sua conta e aproveite todos os benefícios da nossa plataforma digital de saúde.
            </p>
            <Link href="/minha-area">
              <button className="px-8 py-4 text-lg font-bold rounded-xl bg-brand-orange text-white shadow-button hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto">
                Acessar Minha Conta
                <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-brand-blue text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">CheckUp</span>
              </div>
              <p className="text-primary-foreground/70 text-sm">
                Gestão completa de benefícios para sua saúde.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><Link href="/minha-area" className="hover:text-primary-foreground transition-colors">Carteirinha</Link></li>
                <li><Link href="#" className="hover:text-primary-foreground transition-colors">Rede Credenciada</Link></li>
                <li><Link href="/minha-area" className="hover:text-primary-foreground transition-colors">Minha Conta</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><Link href="#" className="hover:text-primary-foreground transition-colors">Central de Ajuda</Link></li>
                <li><Link href="#" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-primary-foreground transition-colors">Fale Conosco</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  0800 123 4567
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contato@checkup.com.br
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/60">
            © 2024 CheckUp Benefícios. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
