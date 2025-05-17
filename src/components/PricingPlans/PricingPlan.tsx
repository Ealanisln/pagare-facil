import React from "react";
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
import { CheckIcon, XIcon } from "lucide-react";

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface PricingPlanProps {
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

export function PricingPlan({
  id,
  name,
  description,
  price,
  features,
  buttonText,
  buttonHref,
  mostPopular = false,
  variant = "default",
}: PricingPlanProps) {
  return (
    <Card 
      className={`flex flex-col h-full ${
        mostPopular 
          ? "border-indigo-500 shadow-lg" 
          : "border-gray-200"
      }`}
    >
      {mostPopular && (
        <div className="bg-indigo-500 text-white text-center py-2 text-sm font-medium">
          Más popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-6">
          <span className="text-3xl font-bold">{price}</span>
          {id !== "free" && <span className="text-gray-500">/mes</span>}
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
              ) : (
                <XIcon className="h-5 w-5 text-gray-300 mr-2 shrink-0" />
              )}
              <span className={feature.included ? "" : "text-gray-500"}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full ${
            mostPopular 
              ? "bg-indigo-600 hover:bg-indigo-700" 
              : ""
          }`}
          variant={variant}
          asChild
        >
          <Link href={buttonHref}>
            {buttonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 