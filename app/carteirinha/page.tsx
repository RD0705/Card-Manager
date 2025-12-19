import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@/utils/supabase/server';
import { getMemberByEmail } from '@/utils/supabase/queries';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Download, Wallet, CreditCard, ChevronLeft, LogIn, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function CarteirinhaPage() {
    const user = await currentUser();

    // Not logged in state
    if (!user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-card border-border">
                    <CardContent className="pt-8 pb-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-brand-blue-light flex items-center justify-center mx-auto mb-6">
                            <LogIn className="w-8 h-8 text-brand-blue" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">
                            Acesso Restrito
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            Faça login para visualizar sua carteirinha digital.
                        </p>
                        <Link href="/sign-in">
                            <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white" size="lg">
                                Fazer Login
                            </Button>
                        </Link>
                        <Link href="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-brand-blue transition-colors mt-4 text-sm">
                            <ChevronLeft className="w-4 h-4" />
                            Voltar ao início
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Get user email
    const email = user.emailAddresses[0]?.emailAddress;

    if (!email) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-card border-border">
                    <CardContent className="pt-8 pb-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-8 h-8 text-destructive" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">
                            E-mail não encontrado
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            Não foi possível identificar seu e-mail. Entre em contato com o suporte.
                        </p>
                        <Link href="/">
                            <Button variant="outline" className="w-full" size="lg">
                                Voltar ao início
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Fetch member data
    const supabase = createClient();
    const member = await getMemberByEmail(supabase as any, email);

    // Member not found state
    if (!member) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-card border-border">
                    <CardContent className="pt-8 pb-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-brand-orange-light flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-8 h-8 text-brand-orange" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">
                            Associação não encontrada
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            Não encontramos uma associação vinculada ao seu e-mail ({email}). Entre em contato com o suporte para mais informações.
                        </p>
                        <Link href="/">
                            <Button variant="outline" className="w-full" size="lg">
                                Voltar ao início
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Format validity date
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { month: '2-digit', year: 'numeric' });
    };

    // Generate member ID
    const memberId = `CB-${new Date(member.created_at).getFullYear()}-${String(member.id).padStart(6, '0')}`;

    // Card data from member
    const userData = {
        name: member.full_name || 'Nome não informado',
        cpf: member.cpf ? `***.***.${member.cpf.slice(-5)}` : '***.***.***-**',
        plan: member.plan || 'Plano Standard',
        validity: formatDate(member.expiration_date),
        memberId: memberId,
        status: member.status || 'active',
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/Logo.png"
                            alt="CheckUp Benefícios"
                            width={40}
                            height={40}
                            className="rounded-xl"
                        />
                        <span className="text-xl font-bold text-brand-blue">CheckUp Benefícios</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-muted-foreground hover:text-brand-blue transition-colors font-medium">
                            Início
                        </Link>
                        <Link href="/rede-credenciada" className="text-muted-foreground hover:text-brand-blue transition-colors font-medium">
                            Rede Credenciada
                        </Link>
                        <Link href="/assinatura" className="text-muted-foreground hover:text-brand-blue transition-colors font-medium">
                            Assinatura
                        </Link>
                    </nav>
                    <Link href="/minha-area">
                        <Button variant="outline" size="sm" className="border-brand-blue text-brand-blue hover:bg-brand-blue/10">
                            Minha Área
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Back Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1 text-muted-foreground hover:text-brand-blue transition-colors mb-8"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Voltar ao início
                    </Link>

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
                            Carteirinha Digital
                        </h1>
                        <p className="text-muted-foreground">
                            Sua carteirinha virtual para apresentar na rede credenciada
                        </p>
                    </div>

                    {/* 3D Card */}
                    <div className="flex justify-center mb-8" style={{ perspective: "1000px" }}>
                        <div
                            className="relative w-[380px] h-[240px] animate-float"
                            style={{
                                transformStyle: "preserve-3d",
                                transform: "rotateY(-5deg) rotateX(5deg)",
                            }}
                        >
                            <div
                                className="absolute inset-0 rounded-2xl overflow-hidden"
                                style={{
                                    background: "linear-gradient(135deg, hsl(210 100% 20%) 0%, hsl(210 80% 35%) 50%, hsl(210 100% 25%) 100%)",
                                    boxShadow: "0 25px 50px -12px rgba(0, 51, 102, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
                                    transform: "translateZ(20px)",
                                }}
                            >
                                {/* Pattern overlay */}
                                <div
                                    className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                    }}
                                />

                                {/* Card Content */}
                                <div className="relative h-full p-6 flex flex-col justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center">
                                                <Shield className="w-7 h-7 text-primary-foreground" />
                                            </div>
                                            <div>
                                                <p className="text-primary-foreground/70 text-xs">CheckUp Benefícios</p>
                                                <p className="text-primary-foreground font-bold">{userData.plan}</p>
                                            </div>
                                        </div>
                                        <div className="w-14 h-10 rounded bg-gradient-to-br from-brand-orange to-brand-orange-light flex items-center justify-center">
                                            <CreditCard className="w-6 h-6 text-accent-foreground" />
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-primary-foreground/60 text-xs mb-1">Número da Carteirinha</p>
                                        <p className="text-primary-foreground text-lg font-mono tracking-wider">
                                            {userData.memberId}
                                        </p>
                                    </div>

                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-primary-foreground/60 text-xs mb-1">Titular</p>
                                            <p className="text-primary-foreground font-semibold">{userData.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-primary-foreground/60 text-xs mb-1">Validade</p>
                                            <p className="text-primary-foreground font-semibold">{userData.validity}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Shine effect */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
                                    }}
                                />
                            </div>

                            {/* Shadow */}
                            <div
                                className="absolute inset-0 rounded-2xl"
                                style={{
                                    background: "hsl(210 100% 15%)",
                                    transform: "translateZ(-10px) translateY(10px)",
                                    filter: "blur(20px)",
                                    opacity: 0.3,
                                }}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <Button className="flex-1 gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white" size="lg">
                            <Download className="w-5 h-5" />
                            Baixar PDF
                        </Button>
                        <Button variant="outline" size="lg" className="flex-1 gap-2 border-foreground/20">
                            <Wallet className="w-5 h-5" />
                            Adicionar à Wallet
                        </Button>
                    </div>

                    {/* Member Info */}
                    <div className="mt-8 p-6 bg-secondary/50 rounded-xl border border-border max-w-md mx-auto">
                        <h3 className="font-semibold text-foreground mb-4">Dados do Associado</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Nome</span>
                                <span className="font-medium text-foreground">{userData.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">CPF</span>
                                <span className="font-medium text-foreground">{userData.cpf}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Plano</span>
                                <span className="font-medium text-foreground">{userData.plan}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Validade</span>
                                <span className="font-medium text-foreground">{userData.validity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status</span>
                                <span className={`font-medium ${userData.status === 'active' ? 'text-success' : 'text-destructive'}`}>
                                    {userData.status === 'active' ? 'Ativo' : 'Inativo'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
