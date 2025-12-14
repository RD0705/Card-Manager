'use client';

import { useSearchParams } from 'next/navigation';
import Button from "@/components/ui/Button";

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    // In a real app, we'd use this to pre-select the plan context
    // const plan = searchParams.get('plan'); 

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-card w-full max-w-md p-8 rounded-2xl border border-border shadow-card text-center">
                <h1 className="text-3xl font-bold text-brand-blue mb-4">Finalizar Compra</h1>
                <p className="text-muted-foreground mb-8">
                    Você está a um passo de garantir sua tranquilidade.
                </p>

                <div className="bg-secondary/50 p-4 rounded-lg mb-8 text-left">
                    <h3 className="font-semibold text-foreground">Resumo do Pedido</h3>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-muted-foreground">Plano Selecionado</span>
                        <span className="font-bold text-foreground">A confirmar</span>
                    </div>
                </div>

                <Button
                    className="w-full bg-brand-orange text-white hover:bg-brand-orange/90"
                    onClick={() => alert("Fluxo de pagamento será implementado aqui.")}
                >
                    Ir para Pagamento
                </Button>
            </div>
        </div>
    );
}
