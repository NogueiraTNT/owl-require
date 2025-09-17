import React, { forwardRef } from "react"
import { NumericFormat, NumericFormatProps } from "react-number-format"

// 1. Remova 'InputProps' da importação
import { Input } from "@/app/_components/ui/input"

// 2. Crie o tipo 'InputProps' extraindo-o diretamente do componente 'Input'
type InputProps = React.ComponentProps<typeof Input>

export const MoneyInput = forwardRef(
  (
    // Agora 'InputProps' está definido corretamente e pode ser usado aqui
    props: NumericFormatProps<InputProps>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        customInput={Input}
        getInputRef={ref}
      />
    )
  },
)

MoneyInput.displayName = "MoneyInput"
