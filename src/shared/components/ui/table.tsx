import { cn } from "@/shared/utils/cn";
import {
  tableHeadPresentations,
  type TableHeadPresentation,
} from "./table-head-presentations";
import {
  tableCellPresentations,
  type TableCellPresentation,
} from "./table-cell-presentations";
import type { ComponentProps } from "react";

// Class-neutral local table adapters preserve each existing table layout and
// external overflow container. No table engine or new wrapper is introduced.
export function Table(props: ComponentProps<"table">) {
  return <table {...props} />;
}
export function TableHeader(props: ComponentProps<"thead">) {
  return <thead {...props} />;
}
export function TableBody(props: ComponentProps<"tbody">) {
  return <tbody {...props} />;
}
export function TableRow(props: ComponentProps<"tr">) {
  return <tr {...props} />;
}
export function TableHead({
  presentation,
  className,
  ...props
}: ComponentProps<"th"> & { presentation?: TableHeadPresentation }) {
  return (
    <th
      className={
        presentation
          ? cn(tableHeadPresentations[presentation], className)
          : className
      }
      {...props}
    />
  );
}
export function TableCell({
  presentation,
  className,
  ...props
}: ComponentProps<"td"> & { presentation?: TableCellPresentation }) {
  return (
    <td
      className={
        presentation
          ? cn(tableCellPresentations[presentation], className)
          : className
      }
      {...props}
    />
  );
}
