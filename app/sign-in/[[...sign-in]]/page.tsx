'use client';

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoaded) return;

        setIsLoading(true);
        setError("");

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/minha-area");
            } else {
                // Handle other statuses if needed (e.g., needs_first_factor)
                console.log("Sign in status:", result.status);
                setError("Não foi possível completar o login. Tente novamente.");
            }
        } catch (err: any) {
            const errorMessage = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Erro ao fazer login. Verifique suas credenciais.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOAuth = async (strategy: "oauth_google" | "oauth_apple") => {
        if (!isLoaded) return;

        try {
            await signIn.authenticateWithRedirect({
                strategy,
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/minha-area",
            });
        } catch (err: any) {
            const errorMessage = err.errors?.[0]?.longMessage || "Erro ao conectar com provedor social.";
            setError(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Lado Esquerdo - Visual/Social Proof (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-medium overflow-hidden">
                {/* Background Decorativo */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-orange rounded-full blur-3xl" />
                </div>

                {/* Conteúdo */}
                <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white font-bold text-xl">CM</span>
                        </div>
                        <span className="text-2xl font-bold">Card Manager</span>
                    </div>

                    {/* Título */}
                    <h1 className="text-4xl font-bold leading-tight mb-4">
                        Gerencie seus benefícios <br />
                        <span className="text-brand-orange">com praticidade</span>
                    </h1>
                    <p className="text-lg text-white/80 mb-12 max-w-md">
                        Acesse sua carteirinha digital, encontre profissionais e acompanhe seu plano em um só lugar.
                    </p>

                    {/* Features */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 max-w-xs">
                            <svg className="w-5 h-5 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Carteirinha digital sempre à mão</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 max-w-xs">
                            <svg className="w-5 h-5 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Rede credenciada atualizada</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 max-w-xs">
                            <svg className="w-5 h-5 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Histórico de consultas</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lado Direito - Formulário */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Logo Mobile */}
                    <div className="lg:hidden mb-8 flex justify-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">CM</span>
                            </div>
                            <span className="text-xl font-bold text-brand-blue">Card Manager</span>
                        </div>
                    </div>

                    {/* Título */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Acesse sua conta</h1>
                        <p className="text-gray-500">Entre para gerenciar seus benefícios</p>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Campo Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                                E-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                required
                                disabled={isLoading}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange
                         transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>

                        {/* Campo Senha */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Senha
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange
                         transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>

                        {/* Mensagem de Erro */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                                <p className="text-sm text-red-600 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Link Esqueci Senha */}
                        <div className="text-right">
                            <Link href="/esqueci-senha" className="text-sm text-brand-blue hover:underline">
                                Esqueceu a senha?
                            </Link>
                        </div>

                        {/* Botão Principal */}
                        <button
                            type="submit"
                            disabled={isLoading || !isLoaded}
                            className="w-full py-3.5 bg-brand-orange text-white font-semibold rounded-xl
                       hover:bg-brand-orange/90 focus:outline-none focus:ring-2 focus:ring-brand-orange/50
                       disabled:opacity-70 disabled:cursor-not-allowed
                       transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Entrando...</span>
                                </>
                            ) : (
                                "Acessar Conta"
                            )}
                        </button>
                    </form>

                    {/* Divisor */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">ou continue com</span>
                        </div>
                    </div>

                    {/* Botões Sociais */}
                    <div className="space-y-3">
                        {/* Botão Google */}
                        <button
                            type="button"
                            onClick={() => handleOAuth("oauth_google")}
                            disabled={!isLoaded}
                            className="w-full py-3 px-4 border border-gray-200 rounded-xl bg-white
                       hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200
                       transition-all duration-200 flex items-center justify-center gap-3
                       disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-gray-700 font-medium">Entrar com Google</span>
                        </button>

                        {/* Botão Apple */}
                        <button
                            type="button"
                            onClick={() => handleOAuth("oauth_apple")}
                            disabled={!isLoaded}
                            className="w-full py-3 px-4 border border-gray-200 rounded-xl bg-white
                       hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200
                       transition-all duration-200 flex items-center justify-center gap-3
                       disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            <span className="text-gray-700 font-medium">Entrar com Apple</span>
                        </button>
                    </div>

                    {/* Link Criar Conta */}
                    <p className="text-center mt-8 text-gray-500">
                        Não tem uma conta?{" "}
                        <Link href="/sign-up" className="text-brand-blue font-semibold hover:underline">
                            Criar conta
                        </Link>
                    </p>

                    {/* Termos */}
                    <p className="text-center mt-6 text-xs text-gray-400">
                        Ao continuar, você concorda com nossos{" "}
                        <a href="#" className="underline hover:text-gray-600">Termos de Uso</a>
                        {" "}e{" "}
                        <a href="#" className="underline hover:text-gray-600">Política de Privacidade</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
