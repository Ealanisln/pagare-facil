"use client";

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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, FileText } from "lucide-react";

// Mock data - esto se reemplazaría con datos reales de la base de datos
const mockNotes = [
  {
    id: "1",
    name: "Préstamo personal",
    amount: 50000,
    interestRate: 12.5,
    debtorName: "Juan Pérez",
    createdAt: "20/05/2024",
    status: "active",
  },
  {
    id: "2",
    name: "Préstamo vehicular",
    amount: 250000,
    interestRate: 8.25,
    debtorName: "María López",
    createdAt: "18/05/2024",
    status: "pending",
  },
  {
    id: "3",
    name: "Préstamo negocio",
    amount: 100000,
    interestRate: 10.0,
    debtorName: "Carlos Ruiz",
    createdAt: "15/05/2024",
    status: "completed",
  },
  {
    id: "4",
    name: "Préstamo educativo",
    amount: 80000,
    interestRate: 7.5,
    debtorName: "Ana Martínez",
    createdAt: "12/05/2024",
    status: "active",
  },
];

export function NotesTable() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Activo</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pendiente</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pagaré</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockNotes.map((note) => (
          <TableRow key={note.id}>
            <TableCell className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-md flex items-center justify-center bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">{note.name}</div>
                <div className="text-sm text-muted-foreground">{note.debtorName}</div>
              </div>
            </TableCell>
            <TableCell>
              <div>{formatCurrency(note.amount)}</div>
              <div className="text-sm text-muted-foreground">Interés: {note.interestRate}%</div>
            </TableCell>
            <TableCell>{getStatusBadge(note.status)}</TableCell>
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
                    <Eye className="mr-2 h-4 w-4" /> Ver PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Anular pagaré
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