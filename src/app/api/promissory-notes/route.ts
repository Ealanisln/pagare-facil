import { NextRequest, NextResponse } from "next/server";

// Types for promissory notes
export interface Guarantor {
  id: string;
  name: string;
  address: string;
  city: string;
  phone?: string;
}

export interface PromissoryNote {
  id: string;
  name: string;
  amount: number;
  interestRate: number;
  paymentPlace: string;
  debtorName: string;
  debtorAddress: string;
  debtorCity: string;
  debtorPhone?: string;
  signingDate: string;
  paymentDay: number;
  periodicity: "weekly" | "biweekly" | "monthly" | "quarterly" | "semiannual";
  numberOfMonths: number;
  guarantors: Guarantor[];
  firstPaymentDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

// Mock data
const mockPromissoryNotes: PromissoryNote[] = [];

/**
 * GET handler for fetching promissory notes
 */
export async function GET(request: NextRequest) {
  try {
    // In a real implementation, we would:
    // 1. Authenticate the user
    // 2. Fetch the user's promissory notes from a database
    // 3. Return the promissory notes
    
    // Get search params
    const searchParams = request.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit") || "10");
    const page = Number(searchParams.get("page") || "1");
    
    // Paginate results
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedNotes = mockPromissoryNotes.slice(startIndex, endIndex);
    
    return NextResponse.json({
      data: paginatedNotes,
      pagination: {
        total: mockPromissoryNotes.length,
        page,
        limit,
        pages: Math.ceil(mockPromissoryNotes.length / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching promissory notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch promissory notes" },
      { status: 500 }
    );
  }
}

/**
 * POST handler for creating a new promissory note
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // In a real implementation, we would:
    // 1. Authenticate the user
    // 2. Validate the request body
    // 3. Store the promissory note in a database
    // 4. Return the created promissory note
    
    // Create a new promissory note with mock data
    const newPromissoryNote: PromissoryNote = {
      id: `note_${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "user_123" // In a real app, this would come from the authenticated user
    };
    
    // Add to our mock array (in a real app, this would be stored in a database)
    mockPromissoryNotes.push(newPromissoryNote);
    
    return NextResponse.json(newPromissoryNote, { status: 201 });
  } catch (error) {
    console.error("Error creating promissory note:", error);
    return NextResponse.json(
      { error: "Failed to create promissory note" },
      { status: 500 }
    );
  }
} 