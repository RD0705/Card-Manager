'use client';

import { Shield, Download, Wallet, User, Calendar, CreditCard, ChevronLeft, QrCode, Check, FileText, Users, BadgeCheck, Clock, MapPin, Stethoscope, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MinhaArea = () => {
  const userData = {
    name: "João Carlos da Silva",
    cpf: "***.***.***-00",
    plan: "Plano Ouro",
    planType: "Premium",
    cardNumber: "4532 •••• •••• 8976",
    validity: "12/2026",
    memberId: "CB-2024-001234",
    dependents: 0,
    status: "Ativo",
  };

  const benefits = [
    "Consultas Ilimitadas",
    "Exames Laboratoriais",
    "Telemedicina 24h",
    "Descontos em Farmácias",
  ];

  const consultationHistory = [
    {
      id: 1,
      specialty: "Clínica Geral",
      doctor: "Dr. Roberto Mendes",
      clinic: "Clínica São Lucas",
      date: "15/11/2024",
      time: "09:30",
      status: "Realizada",
    },
    {
      id: 2,
      specialty: "Cardiologia",
      doctor: "Dra. Ana Paula Santos",
      clinic: "Hospital Central",
      date: "28/10/2024",
      time: "14:00",
      status: "Realizada",
    },
    {
      id: 3,
      specialty: "Dermatologia",
      doctor: "Dr. Carlos Eduardo",
      clinic: "Centro Médico Vida",
      date: "10/10/2024",
      time: "11:15",
      status: "Realizada",
    },
    {
      id: 4,
      specialty: "Oftalmologia",
      doctor: "Dra. Maria Clara",
      clinic: "Clínica Visão",
      date: "05/09/2024",
      time: "16:45",
      status: "Realizada",
    },
  ];

  const whatsappNumber = "5511999999999";
  const whatsappMessage = "Olá! Preciso de ajuda com meu plano CheckUp Benefícios.";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
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
          <Button variant="brand-outline" size="sm">
            Sair
          </Button>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-brand-blue transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar ao início
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">
                Olá, {userData.name.split(' ')[0]}!
              </h1>
              <p className="text-muted-foreground">
                Gerencie sua carteirinha, consultas e entre em contato conosco
              </p>
            </div>
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 hidden md:flex"
              size="lg"
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </Button>
          </div>

          <Tabs defaultValue="carteirinha" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="carteirinha" className="gap-2">
                <CreditCard className="w-4 h-4" />
                Carteirinha
              </TabsTrigger>
              <TabsTrigger value="historico" className="gap-2">
                <Clock className="w-4 h-4" />
                Histórico
              </TabsTrigger>
            </TabsList>

            <TabsContent value="carteirinha" className="space-y-8">
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
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />

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

                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
                      }}
                    />
                  </div>

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

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button variant="cta" size="lg" className="flex-1 gap-2">
                  <Download className="w-5 h-5" />
                  Baixar PDF
                </Button>
                <Button variant="outline" size="lg" className="flex-1 gap-2 border-foreground/20">
                  <Wallet className="w-5 h-5" />
                  Adicionar à Wallet
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-blue-light flex items-center justify-center">
                        <FileText className="w-5 h-5 text-brand-blue" />
                      </div>
                      <CardTitle className="text-lg text-foreground">Informações do Plano</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BadgeCheck className="w-4 h-4" />
                        <span className="text-sm">Status</span>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/20">
                        {userData.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span className="text-sm">Titular</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{userData.name}</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CreditCard className="w-4 h-4" />
                        <span className="text-sm">CPF</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{userData.cpf}</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm">Plano</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{userData.plan} ({userData.planType})</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Validade</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{userData.validity}</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Dependentes</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{userData.dependents} dependentes</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-orange-light flex items-center justify-center">
                        <QrCode className="w-5 h-5 text-brand-orange" />
                      </div>
                      <CardTitle className="text-lg text-foreground">Validação e Benefícios</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 bg-foreground rounded-xl flex items-center justify-center mb-3">
                        <div className="w-28 h-28 bg-background rounded-lg p-2">
                          <div className="w-full h-full grid grid-cols-7 gap-0.5">
                            {Array.from({ length: 49 }).map((_, i) => (
                              <div
                                key={i}
                                className={`rounded-sm ${
                                  [0,1,2,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48].includes(i) ? 'bg-foreground' : 
                                  Math.random() > 0.6 ? 'bg-foreground' : 'bg-transparent'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Apresente este código na recepção
                      </p>
                      <p className="text-xs font-mono text-muted-foreground mt-1">
                        {userData.memberId}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Resumo de Cobertura</h4>
                      <div className="space-y-2">
                        {benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-success" />
                            </div>
                            <span className="text-sm text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="historico" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Histórico de Consultas</h2>
                <Badge variant="secondary" className="bg-brand-blue-light text-brand-blue">
                  {consultationHistory.length} consultas
                </Badge>
              </div>

              <div className="grid gap-4">
                {consultationHistory.map((consultation) => (
                  <Card key={consultation.id} className="shadow-card hover:shadow-card-hover transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center flex-shrink-0">
                          <Stethoscope className="w-6 h-6 text-brand-blue" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground">{consultation.specialty}</h3>
                              <p className="text-sm text-muted-foreground">{consultation.doctor}</p>
                            </div>
                            <Badge className="bg-success/10 text-success border-success/20 flex-shrink-0">
                              {consultation.status}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{consultation.clinic}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{consultation.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{consultation.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {consultationHistory.length === 0 && (
                <Card className="shadow-card">
                  <CardContent className="py-12 text-center">
                    <Stethoscope className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Nenhuma consulta encontrada</h3>
                    <p className="text-sm text-muted-foreground">
                      Suas consultas realizadas aparecerão aqui
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="fixed bottom-6 right-6 md:hidden">
            <Button 
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white w-14 h-14 rounded-full shadow-lg"
              size="icon"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MinhaArea;
