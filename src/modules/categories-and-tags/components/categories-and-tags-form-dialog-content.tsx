import * as React from "react";

import { BtnV2 } from "@/shared/components/common";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui";
import { CategoriesAndTagsFormFields } from "../atoms/categories-and-tags-form/categories-and-tags-form-fields";

import { PlusCircle, Save } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  categoriesAndTagsSchema,
  type CategoriesAndTagsFormValues,
} from "../schemas/categories-and-tags.schema";

import { useQueryStates } from "nuqs";
import { cateAndTagsParams } from "../utils/categories-and-tags-params";

import { cateAndTagsCopy } from "../constants/categories-and-tags-form";

import { categoriesData, tagsData } from "../data/categories-and-tags.data";

import type { CateAndTagsItem } from "../types/categories-and-tags.types";

interface CategoriesAndTagsFormDialogContentProps {
  item?: CateAndTagsItem;
  onSave?: (item: CateAndTagsItem) => void;
  onClose: () => void;
}

const createItemId = () => Date.now();

export const CategoriesAndTagsFormDialogContent = ({
  item,
  onSave,
  onClose,
}: CategoriesAndTagsFormDialogContentProps) => {
  const [{ type }] = useQueryStates(cateAndTagsParams);
  const copy = cateAndTagsCopy[type];
  const formId = React.useId().replace(/:/g, "");

  const fallbackImage =
    type === "categories" ? categoriesData[0].image : tagsData[0].image;

  const form = useForm<CategoriesAndTagsFormValues>({
    resolver: zodResolver(categoriesAndTagsSchema),
    defaultValues: {
      image: item?.image ?? fallbackImage,
      nameAr: item?.nameAr ?? "",
      nameEn: item?.nameEn ?? "",
      order: String(item?.order ?? ""),
      status: item?.status ?? "نشط",
    },
  });

  const onSubmit = (values: CategoriesAndTagsFormValues) => {
    onSave?.({
      id: item?.id ?? createItemId(),
      nameAr: values.nameAr,
      nameEn: values.nameEn,
      order: Number(values.order),
      status: values.status,
      image: values.image,
    });
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>{item ? copy.editTitle : copy.addTitle}</DialogTitle>

        <DialogDescription>{copy.description}</DialogDescription>
      </DialogHeader>

      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4"
      >
        <CategoriesAndTagsFormFields
          control={form.control}
          formId={formId}
          nameLabel={copy.nameLabel}
          namePlaceholder={copy.namePlaceholder}
          nameEnPlaceholder={copy.nameEnPlaceholder}
        />

        <DialogFooter>
          <BtnV2 type="button" variant="white" onClick={onClose}>
            إلغاء
          </BtnV2>

          <BtnV2
            type="submit"
            form={formId}
            disabled={form.formState.isSubmitting}
          >
            {item ? (
              <>
                <Save />
                حفظ التعديلات
              </>
            ) : (
              <>
                <PlusCircle />
                {copy.saveLabel}
              </>
            )}
          </BtnV2>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
