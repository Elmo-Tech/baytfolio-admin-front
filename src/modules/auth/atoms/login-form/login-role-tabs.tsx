import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui";

import { rolesWithLabels } from "../../constants/login.constants";
import type { LoginRole } from "../../types/login.types";

interface LoginRoleTabsProps {
  value: LoginRole;
  onValueChange: (value: LoginRole) => void;
}

export const LoginRoleTabs = ({ value, onValueChange }: LoginRoleTabsProps) => {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue as LoginRole)}
      className="mb-6"
    >
      <TabsList className="w-full">
        {rolesWithLabels.map(({ value, label }) => {
          return (
            <TabsTrigger key={value} value={value} className="flex-1">
              {label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};
