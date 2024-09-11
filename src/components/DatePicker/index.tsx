"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, setDate } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

interface DatePickerProps {
  selected: number | undefined;
  onChange: (day: number | undefined) => void;
}

export function DatePicker({ selected, onChange }: DatePickerProps) {
  const today = new Date()
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    selected ? setDate(today, selected) : undefined
  )
  const [signingDate, setSigningDate] = useState<Date | undefined>(undefined);


  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    onChange(date ? date.getDate() : undefined)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? `Día ${selected}` : <span>Selecciona el día</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          initialFocus
          fromDate={new Date(today.getFullYear(), today.getMonth(), 1)}
          toDate={new Date(today.getFullYear(), today.getMonth() + 1, 0)}
        />
      </PopoverContent>
    </Popover>
  )
}