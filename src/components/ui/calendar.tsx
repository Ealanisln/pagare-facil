"use client"

import * as React from "react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'  // RESTORED - using default styles as base
import './calendar.css'
import { cn } from "@/lib/utils"

export interface CalendarProps {
  className?: string
  mode?: 'single' | 'range'
  selected?: Date | Date[]
  onSelect?: (date: Date | Date[] | undefined) => void
  locale?: string
  fromDate?: Date
  toDate?: Date
  initialFocus?: boolean
  showOutsideDays?: boolean
  classNames?: Record<string, string>
}

function ReactCalendarComponent({
  className,
  mode = 'single',
  selected,
  onSelect,
  locale = 'es-ES',
  fromDate,
  toDate,
  ...props
}: CalendarProps) {
  // Convert selected prop to react-calendar value
  const calendarValue = React.useMemo(() => {
    if (selected) {
      if (Array.isArray(selected)) {
        // For range mode, ensure we have exactly 2 dates
        if (mode === 'range' && selected.length === 2) {
          return selected as [Date, Date]
        } else if (selected.length > 0) {
          return selected[0]
        }
        return null
      }
      return selected
    }
    return null
  }, [selected, mode])

  // Force style override for month text - simplified
  React.useEffect(() => {
    const applyMonthTextSize = () => {
      const monthLabels = document.querySelectorAll('.react-calendar__navigation__label')
      monthLabels.forEach((label) => {
        const element = label as HTMLElement
        element.style.setProperty('font-size', '14px', 'important')
      })
    }
    
    // Apply immediately and with a small delay to ensure it takes effect
    applyMonthTextSize()
    const timeout = setTimeout(applyMonthTextSize, 50)
    
    return () => clearTimeout(timeout)
  }, [])

  // Handle calendar change events
  const handleChange = React.useCallback((value: any) => {
    if (onSelect) {
      if (value === null || value === undefined) {
        onSelect(undefined)
      } else if (Array.isArray(value)) {
        // Filter out null values and ensure we have Date objects
        const dateArray = value.filter((date: any): date is Date => date instanceof Date)
        onSelect(dateArray.length > 0 ? dateArray : undefined)
      } else if (value instanceof Date) {
        onSelect(value)
      } else {
        onSelect(undefined)
      }
    }
  }, [onSelect])

  // Custom month/year formatter to remove "De"
  const formatMonthYear = React.useCallback((locale: string | undefined, date: Date) => {
    const monthNames = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ]
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    return `${month} ${year}`
  }, [])

  return (
    <div className={cn("react-calendar-wrapper custom-react-calendar", className)}>
      <Calendar
        onChange={handleChange}
        value={calendarValue as any}
        locale={locale}
        className="mx-auto border rounded-lg shadow-sm"
        tileClassName="hover:bg-blue-50"
        selectRange={mode === 'range'}
        minDate={fromDate}
        maxDate={toDate}
        formatMonthYear={formatMonthYear}
        calendarType="gregory"
        {...props}
      />
    </div>
  )
}

ReactCalendarComponent.displayName = "Calendar"

export { ReactCalendarComponent as Calendar }
