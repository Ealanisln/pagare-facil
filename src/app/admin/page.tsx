import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart } from "@/components/ui/charts";
import { UsersTable } from "@/components/Admin/UsersTable";
import { NotesTable } from "@/components/Admin/NotesTable";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-5 w-full pl-64">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Administrativo</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Descargar Reporte
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">
              +10% desde el último mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Pagarés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">542</div>
            <p className="text-xs text-muted-foreground">
              +25% desde el último mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,240</div>
            <p className="text-xs text-muted-foreground">
              +12% desde el último mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Tasa de Conversión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% desde el último mes
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Resumen de Ingresos</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <AreaChart
                  data={[
                    { name: "Ene", total: 2200 },
                    { name: "Feb", total: 4300 },
                    { name: "Mar", total: 3700 },
                    { name: "Abr", total: 5100 },
                    { name: "May", total: 8000 },
                    { name: "Jun", total: 7200 },
                  ]}
                />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Usuarios por Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { name: "Básico", total: 73 },
                    { name: "Estándar", total: 32 },
                    { name: "Premium", total: 15 },
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analíticas avanzadas</CardTitle>
              <CardDescription>Información detallada del uso de la plataforma</CardDescription>
            </CardHeader>
            <CardContent>Contenido de analíticas...</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes</CardTitle>
              <CardDescription>Reportes personalizados</CardDescription>
            </CardHeader>
            <CardContent>Contenido de reportes...</CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Últimos Usuarios</CardTitle>
              <CardDescription>
                Usuarios registrados recientemente
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/users">
                <Eye className="mr-2 h-4 w-4" />
                Ver todos
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <UsersTable />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Últimos Pagarés</CardTitle>
              <CardDescription>
                Pagarés creados recientemente
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/notes">
                <Eye className="mr-2 h-4 w-4" />
                Ver todos
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <NotesTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 