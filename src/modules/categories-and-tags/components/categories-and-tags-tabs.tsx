import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui";

import { useQueryStates } from "nuqs";
import { cateAndTagsParams } from "../utils/categories-and-tags-params";

import { cateAndTagsTabs } from "../constants/categories-and-tags-tabs.constants";

export const CategoriesAndTagsTabs = () => {
  const [params, setParams] = useQueryStates(cateAndTagsParams);

  return (
    <Tabs value={params.type} className="pb-5">
      <TabsList>
        {cateAndTagsTabs.map(({ value, label }) => {
          return (
            <TabsTrigger
              key={value}
              value={value}
              onClick={() => {
                setParams({ type: value });
              }}
            >
              {label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};
