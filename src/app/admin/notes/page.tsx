import React from "react";
import { Button } from "@/components/ui/button";
import { NotesTable } from "@/components/Admin/NotesTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Download } from "lucide-react";

export default function NotesPage() {
  return (
    <div className="flex flex-col gap-5 w-full pl-64">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pagarés</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Pagaré
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Pagarés</CardTitle>
          <CardDescription>
            Administra todos los pagarés generados en la plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NotesTable />
        </CardContent>
      </Card>
    </div>
  );
} 