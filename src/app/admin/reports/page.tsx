import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, BarChart } from "@/components/ui/charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Calendar, FileText, Users } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-5 w-full pl-64">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Último mes
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">General</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="notes">Pagarés</TabsTrigger>
          <TabsTrigger value="revenue">Ingresos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas generales</CardTitle>
              <CardDescription>
                Visión general de la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
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
                    <FileText className="h-4 w-4 text-muted-foreground" />
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

              <Card>
                <CardHeader>
                  <CardTitle>Ingresos mensuales</CardTitle>
                </CardHeader>
                <CardContent>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de usuarios</CardTitle>
              <CardDescription>
                Estadísticas detalladas sobre los usuarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Nuevos registros</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AreaChart
                      data={[
                        { name: "Ene", total: 12 },
                        { name: "Feb", total: 18 },
                        { name: "Mar", total: 15 },
                        { name: "Abr", total: 22 },
                        { name: "May", total: 30 },
                        { name: "Jun", total: 25 },
                      ]}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Distribución por plan</CardTitle>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de pagarés</CardTitle>
              <CardDescription>
                Estadísticas detalladas sobre los pagarés generados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Pagarés creados por mes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AreaChart
                      data={[
                        { name: "Ene", total: 45 },
                        { name: "Feb", total: 78 },
                        { name: "Mar", total: 65 },
                        { name: "Abr", total: 92 },
                        { name: "May", total: 120 },
                        { name: "Jun", total: 105 },
                      ]}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Montos promedio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={[
                        { name: "Ene", total: 25000 },
                        { name: "Feb", total: 32000 },
                        { name: "Mar", total: 27500 },
                        { name: "Abr", total: 31200 },
                        { name: "May", total: 35000 },
                        { name: "Jun", total: 33700 },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de ingresos</CardTitle>
              <CardDescription>
                Detalles financieros de la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Ingresos mensuales por plan</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Distribución de ingresos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={[
                        { name: "Básico", total: 7200 },
                        { name: "Estándar", total: 9600 },
                        { name: "Premium", total: 9000 },
                      ]}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 