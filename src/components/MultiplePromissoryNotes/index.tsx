import React, { useState } from "react";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DatePicker } from "@/components/DatePicker";

interface Note {
  id: number;
  description: string;
  amount: number;
  paymentDate: number | undefined;
}

const MultiplePromissoryNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<number | undefined>(undefined);

  const addNote = () => {
    const newNote: Note = {
      id: notes.length,
      description,
      amount,
      paymentDate,
    };
    setNotes([...notes, newNote]);
    setDescription("");
    setAmount(0);
    setPaymentDate(undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crea múltiples pagarés</CardTitle>
        <CardDescription>
          Selecciona múltiples periodos de pago para crear varios pagarés
          automáticamente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Monto"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
          <DatePicker 
            selected={paymentDate} 
            onChange={(date: number | undefined) => setPaymentDate(date)} 
          />
          <Button onClick={addNote}>Agregar Pagaré</Button>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Pagarés creados:</h3>
          {notes.map((note) => (
            <div key={note.id} className="p-2 border rounded mb-2">
              <p>
                <strong>Descripción:</strong> {note.description}
              </p>
              <p>
                <strong>Monto:</strong> ${note.amount}
              </p>
              <p>
                <strong>Fecha de Pago:</strong>{" "}
                {note.paymentDate
                  ? format(new Date(note.paymentDate), "PPP")
                  : "No seleccionada"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiplePromissoryNotes;