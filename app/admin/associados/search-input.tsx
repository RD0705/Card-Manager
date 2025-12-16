'use client';

import { Input } from "@/components/admin-ui/input";

export default function SearchInput({ className }: { className?: string }) {
    return (
        <Input
            className={`bg-white text-zinc-900 border border-zinc-200 ${className || ''}`}
            placeholder="Buscar por nome ou CPF..."
            onChange={(e) => {
                console.log("Search:", (e.target as HTMLInputElement).value);
            }}
        />
    );
}
