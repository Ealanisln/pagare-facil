"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format, setDate } from "date-fns"
import { es } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  selected: number | undefined;
  onChange: (day: number | undefined) => void;
  className?: string;
}

export function DatePicker({ selected, onChange, className }: DatePickerProps) {
  const today = new Date()
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    selected ? setDate(today, selected) : undefined
  )
  const [open, setOpen] = React.useState(false)

  const handleSelect = (date: Date | Date[] | undefined) => {
    if (Array.isArray(date)) {
      // If it's an array, take the first date
      const firstDate = date[0]
      setSelectedDate(firstDate)
      onChange(firstDate ? firstDate.getDate() : undefined)
    } else {
      // Single date or undefined
      setSelectedDate(date)
      onChange(date ? date.getDate() : undefined)
    }
    // Close the popover after selection
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground",
            className
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
          locale="es-ES"
          fromDate={new Date(today.getFullYear(), today.getMonth(), 1)}
          toDate={new Date(today.getFullYear(), today.getMonth() + 1, 0)}
          classNames={{
            caption_label: "font-medium text-sm",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: cn(
              "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
            ),
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
          }}
        />
      </PopoverContent>
    </Popover>
  )
}