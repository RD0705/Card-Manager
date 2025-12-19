import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Básico",
    price: "R$ 89",
    period: "/mês",
    description: "Ideal para quem busca cobertura essencial",
    features: [
      "Carteirinha Digital",
      "Consultas médicas básicas",
      "Exames laboratoriais simples",
      "Atendimento 24h por telefone",
      "Rede credenciada regional",
    ],
    highlighted: false,
  },
  {
    name: "Intermediário",
    price: "R$ 159",
    period: "/mês",
    description: "Melhor custo-benefício para famílias",
    features: [
      "Tudo do plano Básico",
      "Consultas com especialistas",
      "Exames de imagem",
      "Internação hospitalar",
      "Cobertura nacional",
      "Descontos em farmácias",
    ],
    highlighted: true,
  },
  {
    name: "Avançado",
    price: "R$ 299",
    period: "/mês",
    description: "Cobertura completa e premium",
    features: [
      "Tudo do plano Intermediário",
      "Cirurgias de alta complexidade",
      "Quarto individual",
      "Acompanhante em internação",
      "Check-up anual completo",
      "Telemedicina ilimitada",
      "Reembolso diferenciado",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section id="planos" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
            Escolha seu Plano
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferecemos opções flexíveis para atender às suas necessidades de saúde
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${plan.highlighted
                ? "border-brand-orange shadow-lg shadow-brand-orange/20 scale-105"
                : "border-border shadow-card hover:shadow-card-hover"
                }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-orange text-accent-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-brand-blue">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.highlighted ? "bg-brand-orange text-white hover:bg-brand-orange/90" : "border-brand-blue text-brand-blue hover:bg-brand-blue/10 border-2"}`}
                  onClick={() => window.location.href = '/checkout'}
                >
                  Escolher Plano
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

