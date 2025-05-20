import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PromissoryNotesPage() {
  // Mock data - in a real app, this would come from the database
  const promissoryNotes: any[] = [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mis Pagarés</h1>
        <Button asChild>
          <Link href="/panel/pagares/nuevo">
            <Plus className="mr-2 h-4 w-4" /> Crear Pagaré
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar pagarés..." className="pl-8" />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Todos los pagarés</CardTitle>
          <CardDescription>
            Gestiona todos tus documentos legales en un solo lugar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {promissoryNotes.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Deudor</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha de firma</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promissoryNotes.map((note) => (
                  <TableRow key={note.id}>
                    <TableCell>{note.name}</TableCell>
                    <TableCell>{note.debtorName}</TableCell>
                    <TableCell>${note.amount.toFixed(2)}</TableCell>
                    <TableCell>{new Date(note.signingDate).toLocaleDateString()}</TableCell>
                    <TableCell>Activo</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No hay pagarés</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Aún no has creado ningún pagaré. Crea tu primer pagaré para empezar
                a gestionar tus documentos legales.
              </p>
              <Button asChild>
                <Link href="/panel/pagares/nuevo">
                  <Plus className="mr-2 h-4 w-4" /> Crear mi primer pagaré
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 