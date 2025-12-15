'use client';

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    const whatsappNumber = "5511999999999";
    const whatsappMessage = "Olá! Preciso de ajuda com meu plano CheckUp Benefícios.";

    const handleWhatsAppClick = () => {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            {/* Desktop Button */}
            <Button
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 hidden md:flex"
                size="lg"
            >
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
            </Button>

            {/* Mobile FAB */}
            <div className="fixed bottom-6 right-6 md:hidden z-50">
                <Button
                    onClick={handleWhatsAppClick}
                    className="bg-[#25D366] hover:bg-[#20BD5A] text-white w-14 h-14 rounded-full shadow-lg"
                    size="icon"
                >
                    <MessageCircle className="w-6 h-6" />
                </Button>
            </div>
        </>
    );
}
