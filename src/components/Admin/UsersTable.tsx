"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

// Mock data - esto se reemplazaría con datos reales de la base de datos
const mockUsers = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    status: "active",
    plan: "Premium",
    signupDate: "10/05/2024",
  },
  {
    id: "2",
    name: "María López",
    email: "maria@example.com",
    status: "active",
    plan: "Básico",
    signupDate: "15/05/2024",
  },
  {
    id: "3",
    name: "Carlos Ruiz",
    email: "carlos@example.com",
    status: "inactive",
    plan: "Estándar",
    signupDate: "01/04/2024",
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana@example.com",
    status: "trial",
    plan: "Básico",
    signupDate: "19/05/2024",
  },
];

export function UsersTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Activo</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactivo</Badge>;
      case "trial":
        return <Badge className="bg-blue-500">Prueba</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAvatarFallback = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Usuario</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Registro</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}`} alt={user.name} />
                <AvatarFallback>{getAvatarFallback(user.name)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </div>
            </TableCell>
            <TableCell>{user.plan}</TableCell>
            <TableCell>{getStatusBadge(user.status)}</TableCell>
            <TableCell>{user.signupDate}</TableCell>
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
                  <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                  <DropdownMenuItem>Editar usuario</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Desactivar cuenta
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 