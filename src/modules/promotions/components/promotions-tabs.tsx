import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui";

import { useQueryStates } from "nuqs";

import { promotionsParams } from "../utils/promotions-params";

import { promotionsTabs } from "../constants/promotions.constants";

export const PromotionsTabs = () => {
  const [{ tab }, setParams] = useQueryStates(promotionsParams);

  return (
    <Tabs value={tab} className="pb-5">
      <TabsList className="grid w-full grid-cols-1 gap-1 rounded-xl border border-border bg-white p-1 sm:grid-cols-3">
        {promotionsTabs.map(({ value, label, count, icon: Icon }) => {
          return (
            <TabsTrigger
              key={value}
              value={value}
              onClick={() => {
                setParams({
                  tab: value,
                  page: 1,
                  search: "",
                  type: "all",
                });
              }}
              className="group w-full justify-center gap-2 rounded-lg border-0 bg-transparent px-4 py-3 text-[13px] font-medium text-text-secondary hover:bg-primary hover:text-primary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Icon className="size-4" />

              {label}

              {typeof count === "number" && (
                <span className="size-5 rounded-full bg-background text-[11px] font-semibold text-text-secondary group-data-[state=active]:bg-white/15 group-data-[state=active]:text-primary-foreground flex items-center justify-center">
                  {count}
                </span>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};
