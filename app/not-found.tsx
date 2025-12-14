import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
            <h2 className="text-2xl font-bold mb-4">Página não encontrada</h2>
            <p className="text-muted-foreground mb-6">
                A página que você está procurando não existe.
            </p>
            <Link href="/" className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-brand-blue/90">
                Voltar para o início
            </Link>
        </div>
    );
}
