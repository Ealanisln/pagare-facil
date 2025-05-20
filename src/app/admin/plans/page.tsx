import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, MoreHorizontal, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for plans
const plans = [
  {
    id: "1",
    name: "Básico",
    description: "Plan para usuarios individuales",
    price: 99,
    interval: "MONTHLY",
    features: ["5 pagarés por mes", "Acceso a plantillas básicas"],
    isActive: true,
    users: 73,
  },
  {
    id: "2",
    name: "Estándar",
    description: "Plan para pequeñas empresas",
    price: 299,
    interval: "MONTHLY",
    features: [
      "20 pagarés por mes",
      "Acceso a todas las plantillas",
      "Exportación de reportes",
    ],
    isActive: true,
    users: 32,
  },
  {
    id: "3",
    name: "Premium",
    description: "Plan para empresas",
    price: 599,
    interval: "MONTHLY",
    features: [
      "Pagarés ilimitados",
      "Acceso a todas las plantillas",
      "Exportación de reportes",
      "API de integración",
      "Soporte prioritario",
    ],
    isActive: true,
    users: 15,
  },
  {
    id: "4",
    name: "Promocional",
    description: "Plan promocional temporal",
    price: 49,
    interval: "MONTHLY",
    features: ["3 pagarés por mes", "Acceso a plantillas básicas"],
    isActive: false,
    users: 0,
  },
];

export default function PlansPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };

  return (
    <div className="flex flex-col gap-5 w-full pl-64">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Planes de Suscripción</h1>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Plan
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Administración de Planes</CardTitle>
          <CardDescription>
            Gestiona los planes de suscripción disponibles en la plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Usuarios</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <div className="font-medium">{plan.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {plan.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{formatCurrency(plan.price)}</div>
                    <div className="text-xs text-muted-foreground">
                      {plan.interval === "MONTHLY" ? "Mensual" : "Anual"}
                    </div>
                  </TableCell>
                  <TableCell>{plan.users}</TableCell>
                  <TableCell>
                    {plan.isActive ? (
                      <Badge className="bg-green-500">Activo</Badge>
                    ) : (
                      <Badge variant="outline">Inactivo</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menú de acciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {plan.isActive ? (
                          <DropdownMenuItem className="text-red-600">
                            <X className="mr-2 h-4 w-4" /> Desactivar
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-green-600">
                            <Check className="mr-2 h-4 w-4" /> Activar
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 