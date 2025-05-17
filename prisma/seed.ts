import { PrismaClient, PlanInterval } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding the database...");

  // Crear los planes por defecto
  const plans = [
    {
      name: "Plan Básico",
      description: "Para individuos que necesitan crear pagarés ocasionalmente",
      price: 0.00,
      currency: "MXN",
      interval: PlanInterval.MONTHLY,
      features: JSON.stringify([
        "Hasta 3 pagarés al mes",
        "Plantilla estándar",
        "Descarga en PDF",
        "Soporte por email",
      ]),
      isActive: true,
    },
    {
      name: "Plan Profesional",
      description: "Para profesionales que necesitan crear pagarés regularmente",
      price: 199.99,
      currency: "MXN",
      interval: PlanInterval.MONTHLY,
      features: JSON.stringify([
        "Pagarés ilimitados",
        "Plantilla estándar",
        "Descarga en PDF",
        "Soporte prioritario",
        "Plantillas personalizadas",
        "Sin marca de agua",
      ]),
      isActive: true,
    },
    {
      name: "Plan Empresarial",
      description: "Para empresas con necesidades avanzadas",
      price: 499.99,
      currency: "MXN",
      interval: PlanInterval.MONTHLY,
      features: JSON.stringify([
        "Pagarés ilimitados",
        "Todas las plantillas",
        "Descarga en PDF",
        "Soporte prioritario 24/7",
        "Plantillas personalizadas",
        "Sin marca de agua",
        "API de integración",
      ]),
      isActive: true,
    },
  ];

  // Crear o actualizar los planes
  for (const plan of plans) {
    const existingPlan = await prisma.plan.findFirst({
      where: { name: plan.name },
    });

    if (existingPlan) {
      console.log(`Actualizando plan: ${plan.name}`);
      await prisma.plan.update({
        where: { id: existingPlan.id },
        data: plan,
      });
    } else {
      console.log(`Creando plan: ${plan.name}`);
      await prisma.plan.create({
        data: plan,
      });
    }
  }

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 