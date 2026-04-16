import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  PromissoryNoteFormSchema,
  PromissoryNoteFormData,
} from "@/lib/schemas";
import { GuarantorInfoCard } from "../GuarantorInfoCard";

function Harness({ initialGuarantors = 0 }: { initialGuarantors?: number }) {
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
      numberOfGuarantors: initialGuarantors,
      guarantors:
        initialGuarantors > 0
          ? [{ name: "", address: "", city: "", phone: "" }]
          : [],
    },
    mode: "onBlur",
  });

  return (
    <Form {...form}>
      <GuarantorInfoCard
        control={form.control}
        watch={form.watch}
        setValue={form.setValue}
      />
    </Form>
  );
}

describe("GuarantorInfoCard", () => {
  it("renders the number-of-guarantors selector with default 'Sin aval'", () => {
    render(<Harness />);

    expect(screen.getByText("Numero de Avales")).toBeInTheDocument();
    expect(screen.getByText("Sin aval")).toBeInTheDocument();
  });

  it("does not render guarantor fields when count is 0", () => {
    render(<Harness initialGuarantors={0} />);

    expect(screen.queryByText("Nombre del Aval")).not.toBeInTheDocument();
    expect(screen.queryByText("Aval 1")).not.toBeInTheDocument();
  });

  it("renders guarantor fields when count is 1", () => {
    render(<Harness initialGuarantors={1} />);

    expect(screen.getByText("Aval 1")).toBeInTheDocument();
    expect(screen.getByText("Nombre del Aval")).toBeInTheDocument();
    expect(screen.getByText("Direccion del Aval")).toBeInTheDocument();
    expect(screen.getByText("Ciudad del Aval")).toBeInTheDocument();
    expect(screen.getByText("Telefono del Aval (opcional)")).toBeInTheDocument();
  });

  it("updates the guarantor name on typing", () => {
    render(<Harness initialGuarantors={1} />);

    const input = screen.getByPlaceholderText(
      "Ej: Roberto Sanchez",
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Roberto Sanchez" } });
    expect(input.value).toBe("Roberto Sanchez");
  });
});
