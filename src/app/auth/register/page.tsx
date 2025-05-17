"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const { signUp, loading, error, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir al dashboard
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (password !== confirmPassword) {
      setFormError("Las contraseñas no coinciden");
      return;
    }
    
    if (!acceptTerms) {
      setFormError("Debes aceptar los términos y condiciones");
      return;
    }
    
    // Utilizar el método signUp del contexto
    await signUp(email, password, name);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Crear cuenta
        </CardTitle>
        <CardDescription className="text-center">
          Ingresa tus datos para registrarte en Pagaré Fácil
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {(formError || error) && (
            <Alert variant="destructive">
              <AlertDescription>{formError || error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              placeholder="Juan Pérez"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked: boolean | "indeterminate") => 
                setAcceptTerms(checked === true)}
              disabled={loading}
            />
            <label 
              htmlFor="terms" 
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Acepto los{" "}
              <Link 
                href="/terms" 
                className="text-indigo-600 hover:underline"
                target="_blank"
              >
                términos y condiciones
              </Link>
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando cuenta...
              </>
            ) : (
              "Registrarme"
            )}
          </Button>
          <div className="text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="text-indigo-600 hover:underline">
              Iniciar sesión
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RegisterForm />
    </Suspense>
  );
} 