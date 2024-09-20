import type { ReactNode } from "react";

export default function SlyIsEdit({ children }: { children: ReactNode[] }) {
  return (
    <div data-sly-test="${wcmmode.edit}">
      {children}
    </div>
  )
}