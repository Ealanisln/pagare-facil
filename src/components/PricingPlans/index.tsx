import React from "react";
import { PricingPlan, PlanFeature } from "./PricingPlan";

export interface PricingPlanData {
  id: string;
  name: string;
  description: string;
  price: string;
  features: PlanFeature[];
  buttonText: string;
  buttonHref: string;
  mostPopular?: boolean;
  variant?: "default" | "outline";
}

export interface PricingPlansProps {
  plans: PricingPlanData[];
  className?: string;
}

export function PricingPlans({ plans, className = "" }: PricingPlansProps) {
  return (
    <div className={`grid md:grid-cols-3 gap-8 ${className}`}>
      {plans.map((plan) => (
        <PricingPlan
          key={plan.id}
          id={plan.id}
          name={plan.name}
          description={plan.description}
          price={plan.price}
          features={plan.features}
          buttonText={plan.buttonText}
          buttonHref={plan.buttonHref}
          mostPopular={plan.mostPopular}
          variant={plan.variant}
        />
      ))}
    </div>
  );
}

// Export default pricing plans data
export const DEFAULT_PRICING_PLANS: PricingPlanData[] = [
  {
    id: "free",
    name: "Plan Básico",
    description: "Para individuos que necesitan crear pagarés ocasionalmente",
    price: "Gratis",
    features: [
      { name: "Hasta 3 pagarés al mes", included: true },
      { name: "Plantilla estándar", included: true },
      { name: "Descarga en PDF", included: true },
      { name: "Soporte por email", included: true },
      { name: "Plantillas personalizadas", included: false },
      { name: "Sin marca de agua", included: false },
      { name: "API de integración", included: false },
    ],
    buttonText: "Comenzar gratis",
    buttonHref: "/autenticacion/registro",
  },
  {
    id: "pro",
    name: "Plan Profesional",
    description: "Para profesionales que necesitan crear pagarés regularmente",
    price: "$19.99/mes",
    features: [
      { name: "Pagarés ilimitados", included: true },
      { name: "Plantilla estándar", included: true },
      { name: "Descarga en PDF", included: true },
      { name: "Soporte prioritario", included: true },
      { name: "Plantillas personalizadas", included: true },
      { name: "Sin marca de agua", included: true },
      { name: "API de integración", included: false },
    ],
    buttonText: "Comenzar prueba de 14 días",
    buttonHref: "/autenticacion/registro",
    mostPopular: true,
  },
  {
    id: "enterprise",
    name: "Plan Empresarial",
    description: "Para empresas con necesidades avanzadas",
    price: "$49.99/mes",
    features: [
      { name: "Pagarés ilimitados", included: true },
      { name: "Todas las plantillas", included: true },
      { name: "Descarga en PDF", included: true },
      { name: "Soporte prioritario 24/7", included: true },
      { name: "Plantillas personalizadas", included: true },
      { name: "Sin marca de agua", included: true },
      { name: "API de integración", included: true },
    ],
    buttonText: "Contactar ventas",
    buttonHref: "/contacto",
    variant: "outline",
  },
];

// Re-export PricingPlan component and types
export { PricingPlan };
export type { PlanFeature, PricingPlanProps } from "./PricingPlan"; 