"use client"

import * as React from "react"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/app/_lib/utils"
import { Button } from "./button"
import { Calendar } from "@/app/_components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover"
import { SelectSingleEventHandler } from "react-day-picker"

interface DatePickerProps {
  value?: Date
  onChange?: SelectSingleEventHandler
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const handleDateChange: SelectSingleEventHandler = (
    selectedDate,
    triggerDate,
    modifiers,
    e,
  ) => {
    if (selectedDate && onChange) {
      // Normaliza a data para meio-dia para evitar problemas de fuso horário
      const normalizedDate = new Date(selectedDate)
      normalizedDate.setHours(12, 0, 0, 0)
      onChange(normalizedDate, triggerDate, modifiers, e)
    } else if (onChange) {
      onChange(selectedDate, triggerDate, modifiers, e)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            new Date(value).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          ) : (
            <span>Selecione uma data...</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDateChange}
          initialFocus
          locale={ptBR}
          disabled={(date) => {
            // Desabilita datas anteriores a hoje
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const checkDate = new Date(date)
            checkDate.setHours(0, 0, 0, 0)
            return checkDate < today
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
