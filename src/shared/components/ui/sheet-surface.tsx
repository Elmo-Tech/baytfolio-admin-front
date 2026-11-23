import type { ReactNode } from "react";
import { Button } from "./button";

interface SheetSurfaceProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

// Custom compatibility adapter for the persistent mobile navigation sheet.
// Children stay mounted in the closed state; portal, focus and Escape behavior
// remain as before. The existing transform/opacity transitions are unchanged.
export function SheetSurface({ open, onClose, children }: SheetSurfaceProps) {
  return (
    <div
      className={`fixed inset-0 z-50 min-[1226px]:hidden ${open ? "visible" : "invisible pointer-events-none"}`}
    >
      <Button
        unstyled
        type="button"
        aria-label="إغلاق القائمة"
        onClick={onClose}
        className={`absolute inset-0 bg-overlay/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`absolute right-0 top-0 h-full w-[280px] max-w-[85vw] bg-card transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {children}
      </div>
    </div>
  );
}
