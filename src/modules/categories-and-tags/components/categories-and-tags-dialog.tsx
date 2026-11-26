import { useState } from "react";

import { Dialog, DialogTrigger } from "@/shared/components/ui";
import { BtnV2 } from "@/shared/components/common";

import { Plus } from "lucide-react";

import { useQueryStates } from "nuqs";
import { cateAndTagsParams } from "../utils/categories-and-tags-params";

import { CategoriesAndTagsFormDialogContent } from "./categories-and-tags-form-dialog-content";

export const CategoriesAndTagsDialog = () => {
  const [{ type }] = useQueryStates(cateAndTagsParams);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <BtnV2 type="button" size={"lg"}>
          <Plus />

          {type === "categories" ? "إضافة تصنيف" : "إضافة تاج"}
        </BtnV2>
      </DialogTrigger>

      {isOpen && (
        <CategoriesAndTagsFormDialogContent onClose={() => setIsOpen(false)} />
      )}
    </Dialog>
  );
};
