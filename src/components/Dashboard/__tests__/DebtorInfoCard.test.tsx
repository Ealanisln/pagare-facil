import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  PromissoryNoteFormSchema,
  PromissoryNoteFormData,
} from "@/lib/schemas";
import { DebtorInfoCard } from "../DebtorInfoCard";

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
        <DebtorInfoCard control={form.control} />
        <button type="submit">submit</button>
      </form>
    </Form>
  );
}

describe("DebtorInfoCard", () => {
  it("renders the four debtor fields with their labels", () => {
    render(<Harness />);

    expect(screen.getByText("Nombre del deudor")).toBeInTheDocument();
    expect(screen.getByText("Direccion")).toBeInTheDocument();
    expect(screen.getByText("Poblacion")).toBeInTheDocument();
    expect(screen.getByText("Telefono (opcional)")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Ej: Maria Garcia Martinez"),
    ).toBeInTheDocument();
  });

  it("marks the phone input as type tel", () => {
    render(<Harness />);

    expect(screen.getByPlaceholderText("Ej: 55 1234 5678")).toHaveAttribute(
      "type",
      "tel",
    );
  });

  it("requires name, address and city but not phone", async () => {
    render(<Harness />);

    fireEvent.click(screen.getByRole("button", { name: "submit" }));

    await waitFor(() => {
      expect(
        screen.getByText("El nombre del deudor es requerido"),
      ).toBeInTheDocument();
    });
    expect(
      screen.getByText("La direccion del deudor es requerida"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("La ciudad del deudor es requerida"),
    ).toBeInTheDocument();
  });
});
