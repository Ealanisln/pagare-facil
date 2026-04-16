import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  PromissoryNoteFormSchema,
  PromissoryNoteFormData,
} from "@/lib/schemas";
import { ConfigurationCard } from "../ConfigurationCard";

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
      <ConfigurationCard control={form.control} />
    </Form>
  );
}

describe("ConfigurationCard", () => {
  it("renders both date pickers, periodicity select and number input", () => {
    render(<Harness />);

    expect(screen.getByText("Fecha del pagare")).toBeInTheDocument();
    expect(screen.getByText("Fecha del primer pago")).toBeInTheDocument();
    expect(screen.getByText("Periodicidad")).toBeInTheDocument();
    expect(screen.getByText("Numero de periodos")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("defaults periodicity to Mensual", () => {
    render(<Harness />);

    expect(screen.getByText("Mensual")).toBeInTheDocument();
  });

  it("coerces non-numeric input on number of periods to 1", () => {
    render(<Harness />);

    const input = screen.getByRole("spinbutton") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "abc" } });
    expect(input.value).toBe("1");

    fireEvent.change(input, { target: { value: "6" } });
    expect(input.value).toBe("6");
  });
});
