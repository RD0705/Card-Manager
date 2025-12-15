'use client';

import { Shield, Search, MapPin, Phone, Clock, ExternalLink, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input"; // Using Capital I Input which seems common in this project
import Link from "next/link";
import { useState } from "react";

const mockClinics = [
    {
        id: 1,
        name: "Hospital São Lucas",
        specialty: "Hospital Geral",
        address: "Av. Paulista, 1500 - Bela Vista, São Paulo - SP",
        phone: "(11) 3456-7890",
        hours: "24 horas",
        distance: "1.2 km",
    },
    {
        id: 2,
        name: "Clínica MedCare",
        specialty: "Clínica Médica",
        address: "Rua Augusta, 2300 - Consolação, São Paulo - SP",
        phone: "(11) 3234-5678",
        hours: "07:00 - 19:00",
        distance: "2.5 km",
    },
    {
        id: 3,
        name: "Laboratório Diagnóstico Plus",
        specialty: "Laboratório",
        address: "Rua Oscar Freire, 800 - Jardins, São Paulo - SP",
        phone: "(11) 3567-8901",
        hours: "06:00 - 18:00",
        distance: "3.1 km",
    },
    {
        id: 4,
        name: "Centro Odontológico Premium",
        specialty: "Odontologia",
        address: "Av. Brasil, 1200 - Jardim América, São Paulo - SP",
        phone: "(11) 3789-0123",
        hours: "08:00 - 20:00",
        distance: "4.0 km",
    },
    {
        id: 5,
        name: "Clínica Oftalmológica VistaCare",
        specialty: "Oftalmologia",
        address: "Rua Haddock Lobo, 595 - Cerqueira César, São Paulo - SP",
        phone: "(11) 3901-2345",
        hours: "08:00 - 18:00",
        distance: "4.8 km",
    },
];

const RedeCredenciada = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredClinics = mockClinics.filter(
        (clinic) =>
            clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            clinic.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
            clinic.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
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
                        <Link href="/minha-area" className="text-muted-foreground hover:text-brand-blue transition-colors font-medium">
                            Carteirinha
                        </Link>
                        <Link href="/assinatura" className="text-muted-foreground hover:text-brand-blue transition-colors font-medium">
                            Assinatura
                        </Link>
                    </nav>
                    <Link href="/sign-in">
                        <Button variant="default" size="sm" className="bg-brand-orange text-white hover:bg-brand-orange/90">
                            Acessar
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-16 flex h-[calc(100vh-4rem)]">
                {/* Sidebar - Search & List */}
                <aside className="w-full md:w-[420px] bg-card border-r border-border flex flex-col">
                    {/* Search Header */}
                    <div className="p-6 border-b border-border bg-card">
                        <h1 className="text-2xl font-bold text-brand-blue mb-4">Rede Credenciada</h1>
                        <div className="space-y-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar por cidade, especialidade..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <Filter className="w-4 h-4" />
                                Filtros Avançados
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                            {filteredClinics.length} locais encontrados
                        </p>
                    </div>

                    {/* Clinic List */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredClinics.map((clinic) => (
                            <div
                                key={clinic.id}
                                className="p-4 border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold text-foreground group-hover:text-brand-blue transition-colors">
                                            {clinic.name}
                                        </h3>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-brand-blue-light text-brand-blue font-medium">
                                            {clinic.specialty}
                                        </span>
                                    </div>
                                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                                        {clinic.distance}
                                    </span>
                                </div>

                                <div className="space-y-1.5 mt-3 text-sm text-muted-foreground">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span>{clinic.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 flex-shrink-0" />
                                        <span>{clinic.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 flex-shrink-0" />
                                        <span>{clinic.hours}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-3 text-brand-orange hover:text-brand-orange p-0 h-auto font-medium"
                                >
                                    <ExternalLink className="w-4 h-4 mr-1" />
                                    Abrir no Maps
                                </Button>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Map Container */}
                <div className="hidden md:flex flex-1 bg-secondary/30 items-center justify-center relative">
                    {/* Map Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-secondary/80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-brand-blue-light flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-12 h-12 text-brand-blue" />
                            </div>
                            <p className="text-lg font-medium text-muted-foreground">Mapa Interativo</p>
                            <p className="text-sm text-muted-foreground/70 mt-1">
                                Visualize os locais credenciados próximos a você
                            </p>
                        </div>
                    </div>

                    {/* Floating Markers (Decorative) */}
                    <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center shadow-lg animate-pulse-slow">
                        <MapPin className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div className="absolute top-1/3 right-1/3 w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center shadow-lg" style={{ animationDelay: '1s' }}>
                        <MapPin className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="absolute bottom-1/3 left-1/3 w-8 h-8 rounded-full bg-success flex items-center justify-center shadow-lg animate-pulse-slow" style={{ animationDelay: '2s' }}>
                        <MapPin className="w-5 h-5 text-success-foreground" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RedeCredenciada;
