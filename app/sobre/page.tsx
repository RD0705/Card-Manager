import Link from 'next/link';
import { Shield, Heart, Target, Award, Users, Phone, Mail, ChevronRight } from 'lucide-react';


export default function AboutPage() {
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
                        <Link href="/" className="text-muted-foreground hover:text-brand-blue transition-colors font-medium">
                            Início
                        </Link>
                        <Link href="/sobre" className="text-brand-blue transition-colors font-medium">
                            Sobre Nós
                        </Link>
                        <Link href="/#contato" className="text-muted-foreground hover:text-brand-blue transition-colors font-medium">
                            Contato
                        </Link>
                    </nav>
                    <div className="flex items-center gap-3">
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
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 hero-gradient relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative">
                    <div className="text-center max-w-3xl mx-auto animate-fade-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue-light border border-brand-blue/10 mb-6">
                            <Shield className="w-4 h-4 text-brand-blue" />
                            <span className="text-sm font-medium text-brand-blue">Sobre Nós</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-blue leading-tight mb-6">
                            Transformando a gestão de <span className="text-brand-orange">benefícios</span>
                        </h1>

                        <p className="text-lg text-muted-foreground mb-8">
                            Somos uma plataforma dedicada a simplificar o acesso à saúde e bem-estar,
                            conectando pessoas a uma rede de benefícios completa e acessível.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-card">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        <div>
                            <h2 className="text-3xl font-bold text-brand-blue mb-6">Nossa Missão</h2>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                A CheckUp Benefícios nasceu com o propósito de transformar a forma como as pessoas
                                acessam e gerenciam seus benefícios de saúde. Acreditamos que a tecnologia deve
                                simplificar a vida, não complicar.
                            </p>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                Nossa plataforma digital foi desenvolvida para oferecer uma experiência completa e
                                intuitiva, permitindo que nossos associados tenham acesso rápido à carteirinha digital,
                                rede credenciada e informações sobre seus planos de saúde.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Com uma equipe dedicada e atendimento 24 horas, estamos sempre prontos para ajudar
                                nossos associados em qualquer momento, garantindo tranquilidade e segurança.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-card card-gradient p-6 rounded-2xl border border-border shadow-card">
                                <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center mb-4">
                                    <Target className="w-6 h-6 text-brand-blue" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Visão</h3>
                                <p className="text-sm text-muted-foreground">
                                    Ser referência nacional em gestão de benefícios de saúde digital.
                                </p>
                            </div>

                            <div className="bg-card card-gradient p-6 rounded-2xl border border-border shadow-card">
                                <div className="w-12 h-12 rounded-xl bg-brand-orange-light flex items-center justify-center mb-4">
                                    <Award className="w-6 h-6 text-brand-orange" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Valores</h3>
                                <p className="text-sm text-muted-foreground">
                                    Transparência, inovação e compromisso com a saúde.
                                </p>
                            </div>

                            <div className="bg-card card-gradient p-6 rounded-2xl border border-border shadow-card">
                                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-success" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Equipe</h3>
                                <p className="text-sm text-muted-foreground">
                                    Profissionais qualificados e comprometidos com você.
                                </p>
                            </div>

                            <div className="bg-card card-gradient p-6 rounded-2xl border border-border shadow-card">
                                <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center mb-4">
                                    <Heart className="w-6 h-6 text-brand-blue" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">Cuidado</h3>
                                <p className="text-sm text-muted-foreground">
                                    Atendimento humanizado em cada interação.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-brand-blue relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                <div className="container mx-auto px-4 relative">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                            Nossos Números
                        </h2>
                        <p className="text-primary-foreground/70 max-w-xl mx-auto">
                            Resultados que comprovam nosso compromisso com a excelência
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-5xl font-bold text-primary-foreground mb-2">15k+</p>
                            <p className="text-primary-foreground/70">Associados Ativos</p>
                        </div>
                        <div>
                            <p className="text-5xl font-bold text-primary-foreground mb-2">10+</p>
                            <p className="text-primary-foreground/70">Anos de Experiência</p>
                        </div>
                        <div>
                            <p className="text-5xl font-bold text-primary-foreground mb-2">500+</p>
                            <p className="text-primary-foreground/70">Clínicas Credenciadas</p>
                        </div>
                        <div>
                            <p className="text-5xl font-bold text-primary-foreground mb-2">98%</p>
                            <p className="text-primary-foreground/70">Satisfação</p>
                        </div>
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
                                <li><Link href="/" className="hover:text-primary-foreground transition-colors">Início</Link></li>
                                <li><Link href="/sobre" className="hover:text-primary-foreground transition-colors">Sobre Nós</Link></li>
                                <li><Link href="/#planos" className="hover:text-primary-foreground transition-colors">Planos</Link></li>
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
