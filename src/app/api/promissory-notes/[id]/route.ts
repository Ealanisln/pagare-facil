import { NextRequest, NextResponse } from "next/server";
import { PromissoryNote } from "../route";

// Mock data for a single promissory note
const mockPromissoryNote: PromissoryNote = {
  id: "note_123",
  name: "Préstamo Personal",
  amount: 5000,
  interestRate: 5.5,
  paymentPlace: "Ciudad de México",
  debtorName: "Juan Pérez",
  debtorAddress: "Calle Principal 123",
  debtorCity: "Ciudad de México",
  debtorPhone: "555-123-4567",
  signingDate: new Date().toISOString(),
  paymentDay: 15,
  periodicity: "monthly",
  numberOfMonths: 12,
  guarantors: [
    {
      id: "guarantor_123",
      name: "María López",
      address: "Avenida Central 456",
      city: "Ciudad de México",
      phone: "555-987-6543"
    }
  ],
  firstPaymentDate: new Date(
    new Date().setMonth(new Date().getMonth() + 1)
  ).toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  userId: "user_123"
};

/**
 * GET handler for fetching a single promissory note by ID
 */
export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { id } = params;
    
    // In a real implementation, we would:
    // 1. Authenticate the user
    // 2. Fetch the promissory note from a database
    // 3. Check if the user has access to the note
    // 4. Return the promissory note
    
    // For now, check if the mock ID matches and return the mock data
    if (id === "note_123") {
      return NextResponse.json(mockPromissoryNote);
    }
    
    // Return 404 if not found
    return NextResponse.json(
      { error: "Promissory note not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error fetching promissory note:", error);
    return NextResponse.json(
      { error: "Failed to fetch promissory note" },
      { status: 500 }
    );
  }
}

/**
 * PUT handler for updating a promissory note
 */
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { id } = params;
    
    // Check if the note exists
    if (id !== "note_123") {
      return NextResponse.json(
        { error: "Promissory note not found" },
        { status: 404 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    
    // In a real implementation, we would:
    // 1. Authenticate the user
    // 2. Fetch the promissory note from a database
    // 3. Check if the user has access to update the note
    // 4. Update the promissory note in the database
    // 5. Return the updated note
    
    // For now, merge the body with the mock data
    const updatedNote: PromissoryNote = {
      ...mockPromissoryNote,
      ...body,
      id, // Ensure the ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error("Error updating promissory note:", error);
    return NextResponse.json(
      { error: "Failed to update promissory note" },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler for deleting a promissory note
 */
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { id } = params;
    
    // Check if the note exists
    if (id !== "note_123") {
      return NextResponse.json(
        { error: "Promissory note not found" },
        { status: 404 }
      );
    }
    
    // In a real implementation, we would:
    // 1. Authenticate the user
    // 2. Fetch the promissory note from a database
    // 3. Check if the user has access to delete the note
    // 4. Delete the promissory note from the database
    
    // For this mock, we'll just return a success message
    return NextResponse.json({
      success: true,
      message: "Promissory note deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting promissory note:", error);
    return NextResponse.json(
      { error: "Failed to delete promissory note" },
      { status: 500 }
    );
  }
} 