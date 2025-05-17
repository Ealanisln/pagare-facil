import { NextRequest, NextResponse } from "next/server";

// Mock data types
interface BillingPlan {
  id: string;
  name: string;
  pricePerMonth: number;
  currency: string;
  features: string[];
  currentPlan: boolean;
}

interface UserBilling {
  userId: string;
  currentPlan: BillingPlan;
  paymentMethod: {
    type: string;
    last4?: string;
    expiryDate?: string;
  };
  billingCycle: {
    start: string;
    end: string;
  };
  invoices: Array<{
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending" | "failed";
    downloadUrl: string;
  }>;
}

// Mock data
const mockUserBilling: UserBilling = {
  userId: "user_123",
  currentPlan: {
    id: "free",
    name: "Plan Básico",
    pricePerMonth: 0,
    currency: "USD",
    features: [
      "Hasta 3 pagarés al mes",
      "Plantilla estándar",
      "Descarga en PDF",
      "Soporte por email",
    ],
    currentPlan: true,
  },
  paymentMethod: {
    type: "none"
  },
  billingCycle: {
    start: new Date().toISOString(),
    end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days later
  },
  invoices: []
};

/**
 * GET handler for fetching user billing information
 */
export async function GET(request: NextRequest) {
  try {
    // In a real implementation, we would:
    // 1. Authenticate the user
    // 2. Fetch the user's billing information from a database
    // 3. Return the billing information
    
    // For now, we'll return mock data
    return NextResponse.json(mockUserBilling);
  } catch (error) {
    console.error("Error fetching billing information:", error);
    return NextResponse.json(
      { error: "Failed to fetch billing information" },
      { status: 500 }
    );
  }
}

/**
 * POST handler for updating billing information
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // In a real implementation, we would:
    // 1. Authenticate the user
    // 2. Validate the request body
    // 3. Update the user's billing information in a database
    // 4. Return the updated billing information
    
    // For now, we'll just return a success message
    return NextResponse.json({
      success: true,
      message: "Billing information updated successfully",
      updatedFields: Object.keys(body),
    });
  } catch (error) {
    console.error("Error updating billing information:", error);
    return NextResponse.json(
      { error: "Failed to update billing information" },
      { status: 500 }
    );
  }
} 