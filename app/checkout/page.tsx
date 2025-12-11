'use client';

import { useState } from 'react';

export default function CheckoutPage() {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Future integration with Bradesco Webhook
        alert('Simulação: Redirecionando para Bradesco...');
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="bg-card p-8 rounded-2xl shadow-card max-w-md w-full border border-border">
                <h2 className="text-3xl font-bold text-brand-blue mb-6 text-center">
                    Assinar <span className="text-brand-orange">Carteirinha</span>
                </h2>

                <div className="mb-8">
                    <div className="flex justify-between text-foreground/80 mb-2">
                        <span>Plano Anual</span>
                        <span className="font-bold text-brand-blue">R$ 120,00</span>
                    </div>
                    <div className="h-px bg-border w-full mb-4"></div>
                    <p className="text-sm text-muted-foreground">
                        Acesso ilimitado à rede credenciada por 12 meses.
                    </p>
                </div>

                <form onSubmit={handleCheckout} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Nome Completo</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-brand-orange focus:outline-none placeholder:text-muted-foreground"
                            placeholder="Seu nome"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">CPF</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-brand-orange focus:outline-none placeholder:text-muted-foreground"
                            placeholder="000.000.000-00"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg hover:bg-brand-orange/90 transition disabled:opacity-50 shadow-button"
                    >
                        {loading ? 'Processando...' : 'Ir para Pagamento (Bradesco)'}
                    </button>
                </form>
            </div>
        </div>
    );
}
