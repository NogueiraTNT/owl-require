"use client"

import NextLink, { LinkProps } from "next/link"
import { useNav } from "../_providers/navigation-provider"
import { AnchorHTMLAttributes, forwardRef } from "react"

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

const LinkNav = forwardRef<HTMLAnchorElement, Props>(function LinkNav(
  { onClick, ...props },
  ref,
) {
  const { startNavigation } = useNav()

  return (
    <NextLink
      ref={ref}
      {...props}
      onClick={(e) => {
        // se for nova aba ou ctrl/meta, mantém padrão e não liga overlay
        if (
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          props.target === "_blank"
        ) {
          onClick?.(e)
          return
        }
        startNavigation()
        onClick?.(e)
      }}
      prefetch // garante prefetch quando possível
    />
  )
})

export default LinkNav
