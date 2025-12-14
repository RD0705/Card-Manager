'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
            <h2 className="text-2xl font-bold mb-4">Algo deu errado!</h2>
            <p className="text-muted-foreground mb-6">
                Não conseguimos carregar esta página.
            </p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-brand-blue/90"
            >
                Tentar novamente
            </button>
        </div>
    );
}
