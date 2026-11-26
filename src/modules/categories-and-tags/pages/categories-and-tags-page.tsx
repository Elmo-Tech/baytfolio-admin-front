import { PagesHeading } from "@/shared/components/common";
import { CategoriesAndTagsDialog } from "../components/categories-and-tags-dialog";
import { CategoriesAndTagsTabs } from "../components/categories-and-tags-tabs";
import { CategoriesAndTagsContent } from "../components/categories-and-tags-content";

export const CategoriesAndTagsPage = () => {
  return (
    <div className="categories-and-tags-page">
      <PagesHeading
        title="التصنيفات والتاجات"
        description="إدارة تصنيفات الغرف والتاجات المستخدمة داخل BaytFolio."
      >
        <CategoriesAndTagsDialog />
      </PagesHeading>

      <CategoriesAndTagsTabs />

      <CategoriesAndTagsContent />
    </div>
  );
};
