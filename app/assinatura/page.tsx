import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@/utils/supabase/server';
import { getMemberByEmail } from '@/utils/supabase/queries';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, CheckCircle2, CreditCard, Calendar, ChevronLeft, AlertTriangle, LogIn, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin-ui/table";

export default async function AssinaturaPage() {
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
                            Faça login para verificar o status da sua assinatura.
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
    const member = await getMemberByEmail(supabase, email);

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

    // Format dates
    const formatDateBR = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    // Check if subscription is active
    const isActive = member.status === 'active';
    const expirationDate = member.expiration_date ? new Date(member.expiration_date) : null;
    const isExpired = expirationDate ? expirationDate < new Date() : false;

    // Subscription data from member
    const subscription = {
        plan: member.plan || 'Plano Standard',
        status: isExpired ? 'Vencido' : (isActive ? 'Ativo' : 'Inativo'),
        price: 'R$ 189,90', // Could be fetched from a pricing table
        nextBilling: formatDateBR(member.expiration_date),
        paymentMethod: 'Cartão •••• ****',
        startDate: formatDateBR(member.start_date),
    };

    // Mock payment history (could be fetched from a payments table later)
    const paymentHistory: Array<{
        id: number;
        date: string;
        amount: string;
        status: string;
        method: string;
    }> = [];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Image 
                            src="/logo.png" 
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
                        <Link href="/minha-area" className="text-muted-foreground hover:text-brand-blue transition-colors font-medium">
                            Carteirinha
                        </Link>
                        <Link href="/rede-credenciada" className="text-muted-foreground hover:text-brand-blue transition-colors font-medium">
                            Rede Credenciada
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

                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
                            Status da Assinatura
                        </h1>
                        <p className="text-muted-foreground">
                            Gerencie sua assinatura e visualize o histórico de pagamentos
                        </p>
                    </div>

                    {/* Current Plan Card */}
                    <Card className="mb-8 border-border shadow-card overflow-hidden">
                        <div className={`p-6 ${isExpired ? 'bg-gradient-to-r from-destructive/80 to-destructive' : 'bg-gradient-to-r from-brand-blue to-brand-blue-medium'}`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-primary-foreground/70 text-sm">Seu plano atual</p>
                                    <h2 className="text-2xl font-bold text-primary-foreground">{subscription.plan}</h2>
                                </div>
                                <Badge className={`${isExpired ? 'bg-white/20 text-white' : 'bg-success/20 text-success-foreground'} border-0 hover:bg-success/30`}>
                                    {isExpired ? <XCircle className="w-4 h-4 mr-1.5" /> : <CheckCircle2 className="w-4 h-4 mr-1.5" />}
                                    {subscription.status}
                                </Badge>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Valor Mensal</p>
                                    <p className="text-2xl font-bold text-brand-blue">{subscription.price}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">{isExpired ? 'Venceu em' : 'Válido até'}</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-muted-foreground" />
                                        <p className={`text-lg font-semibold ${isExpired ? 'text-destructive' : 'text-foreground'}`}>{subscription.nextBilling}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Início da Assinatura</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-muted-foreground" />
                                        <p className="text-lg font-semibold text-foreground">{subscription.startDate}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment History */}
                    <Card className="mb-8 border-border shadow-card">
                        <CardHeader>
                            <CardTitle className="text-brand-blue">Histórico de Pagamentos</CardTitle>
                            <CardDescription>Seus últimos pagamentos realizados</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {paymentHistory.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Data</TableHead>
                                            <TableHead>Valor</TableHead>
                                            <TableHead>Método</TableHead>
                                            <TableHead className="text-right">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paymentHistory.map((payment) => (
                                            <TableRow key={payment.id}>
                                                <TableCell className="font-medium">{payment.date}</TableCell>
                                                <TableCell>{payment.amount}</TableCell>
                                                <TableCell className="text-muted-foreground">{payment.method}</TableCell>
                                                <TableCell className="text-right">
                                                    <Badge variant="secondary" className="bg-success/10 text-success border-0">
                                                        {payment.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <div className="text-center py-8">
                                    <CreditCard className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                                    <p className="text-muted-foreground">Nenhum pagamento registrado ainda</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="outline" size="lg" className="flex-1 gap-2">
                            <CreditCard className="w-5 h-5" />
                            Alterar Forma de Pagamento
                        </Button>
                        <Button variant="destructive" size="lg" className="flex-1 gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Cancelar Assinatura
                        </Button>
                    </div>

                    {/* Help Section */}
                    <div className="mt-12 p-6 bg-secondary/50 rounded-xl border border-border">
                        <h3 className="font-semibold text-foreground mb-2">Precisa de ajuda?</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Entre em contato com nossa central de atendimento para tirar dúvidas sobre sua assinatura.
                        </p>
                        <Button variant="outline" size="sm" className="border-brand-blue text-brand-blue hover:bg-brand-blue/10">
                            Falar com Suporte
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
