'use client';

import Input from "@/components/ui/Input";

export default function SearchInput({ className }: { className?: string }) {
    return (
        <Input
            className={className}
            placeholder="Buscar por nome ou CPF..."
            onChange={(value) => {
                console.log("Search:", value);
            }}
        />
    );
}
