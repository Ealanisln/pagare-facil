import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  PromissoryNoteFormSchema,
  PromissoryNoteFormData,
} from "@/lib/schemas";
import { GeneralInfoCard } from "../GeneralInfoCard";

function Harness() {
  const form = useForm<PromissoryNoteFormData>({
    resolver: zodResolver(PromissoryNoteFormSchema),
    defaultValues: {
      name: "",
      amount: undefined,
      interestRate: undefined,
      payment_place: "",
      debtorName: "",
      debtorAddress: "",
      debtorCity: "",
      debtorPhone: "",
      signingDate: undefined,
      firstPaymentDate: undefined,
      periodicity: "monthly",
      numberOfMonths: 1,
      numberOfGuarantors: 0,
      guarantors: [],
    },
    mode: "onBlur",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <GeneralInfoCard control={form.control} />
        <button type="submit">submit</button>
      </form>
    </Form>
  );
}

describe("GeneralInfoCard", () => {
  it("renders the four beneficiary fields with their labels", () => {
    render(<Harness />);

    expect(screen.getByText("Nombre del beneficiario")).toBeInTheDocument();
    expect(screen.getByText("Monto")).toBeInTheDocument();
    expect(screen.getByText("Tasa de interes (%)")).toBeInTheDocument();
    expect(screen.getByText("Lugar de pago")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Ej: Juan Perez Lopez"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ej: Monterrey, Nuevo Leon"),
    ).toBeInTheDocument();
  });

  it("shows required validation errors when submitting empty", async () => {
    render(<Harness />);

    fireEvent.click(screen.getByRole("button", { name: "submit" }));

    await waitFor(() => {
      expect(
        screen.getByText("El nombre del beneficiario es requerido"),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByText("El lugar de pago es requerido"),
    ).toBeInTheDocument();
  });

  it("only accepts amounts with up to 2 decimals", () => {
    render(<Harness />);

    const [amount] = screen.getAllByPlaceholderText("0.00") as HTMLInputElement[];
    fireEvent.change(amount, { target: { value: "123.45" } });
    expect(amount.value).toBe("123.45");

    fireEvent.change(amount, { target: { value: "123.456" } });
    expect(amount.value).toBe("123.45");
  });
});
