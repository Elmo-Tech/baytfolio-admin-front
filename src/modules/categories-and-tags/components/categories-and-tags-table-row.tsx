import { useState } from "react";
import { Pencil, Power } from "lucide-react";

import { BtnV2, TableCell, TableRow } from "@/shared/components/common";
import { Badge, Dialog, DialogTrigger } from "@/shared/components/ui";

import type { CateAndTagsItem } from "../types/categories-and-tags.types";

import { CategoriesAndTagsFormDialogContent } from "./categories-and-tags-form-dialog-content";

interface CategoriesAndTagsTableRowProps {
  item: CateAndTagsItem;
  onEdit?: (item: CateAndTagsItem) => void;
  onStop?: (item: CateAndTagsItem) => void;
}

export const CategoriesAndTagsTableRow = ({
  item,
  onEdit,
  onStop,
}: CategoriesAndTagsTableRowProps) => {
  const isActive = item.status === "نشط";
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <TableRow>
      {/* Content image */}
      <TableCell className="ps-4">
        <img
          src={item.image}
          alt={item.nameAr}
          loading="lazy"
          className="h-12 w-16 min-w-16 rounded-lg border border-border object-cover"
        />
      </TableCell>

      {/* Name */}
      <TableCell className="min-w-60">
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold text-primary">{item.nameAr}</p>

          <p dir="ltr" className="mt-1 text-xs text-text-muted">
            {item.nameEn}
          </p>
        </div>
      </TableCell>

      {/* State */}
      <TableCell className="text-center">
        <Badge
          variant="outline"
          className={`whitespace-nowrap border-transparent px-3 py-1 text-xs font-medium ${
            isActive
              ? "bg-status-active-bg text-status-active-fg"
              : "bg-status-suspended-bg text-status-suspended-fg"
          }`}
        >
          {item.status}
        </Badge>
      </TableCell>

      {/* Order */}
      <TableCell
        className={`text-center text-sm font-semibold ${item.status === "نشط" ? "text-text-secondary" : "text-text-secondary/50"}`}
      >
        {item.order}
      </TableCell>

      {/* Actions */}
      <TableCell>
        <div className="flex items-center justify-center gap-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <BtnV2
                type="button"
                variant={"background"}
                size="sm"
                className="text-text-secondary"
              >
                <Pencil className="size-3.5" />
                تعديل
              </BtnV2>
            </DialogTrigger>

            {isEditDialogOpen && (
              <CategoriesAndTagsFormDialogContent
                item={item}
                onSave={onEdit}
                onClose={() => setIsEditDialogOpen(false)}
              />
            )}
          </Dialog>

          <BtnV2
            type="button"
            variant={item.status === "نشط" ? "destructive" : "success"}
            size="sm"
            onClick={() => onStop?.(item)}
          >
            <Power className="size-3.5" />
            {item.status === "نشط" ? "إيقاف" : "تفعيل"}
          </BtnV2>
        </div>
      </TableCell>
    </TableRow>
  );
};
