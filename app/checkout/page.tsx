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
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
            <div className="bg-zinc-800 p-8 rounded-2xl shadow-xl max-w-md w-full border border-zinc-700">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    Assinar <span className="text-brand-orange">Carteirinha</span>
                </h2>

                <div className="mb-8">
                    <div className="flex justify-between text-zinc-300 mb-2">
                        <span>Plano Anual</span>
                        <span className="font-bold text-white">R$ 120,00</span>
                    </div>
                    <div className="h-px bg-zinc-700 w-full mb-4"></div>
                    <p className="text-sm text-zinc-400">
                        Acesso ilimitado à rede credenciada por 12 meses.
                    </p>
                </div>

                <form onSubmit={handleCheckout} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Nome Completo</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
                            placeholder="Seu nome"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">CPF</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
                            placeholder="000.000.000-00"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
                    >
                        {loading ? 'Processando...' : 'Ir para Pagamento (Bradesco)'}
                    </button>
                </form>
            </div>
        </div>
    );
}
