import { LoginForm } from "../components/login-form";
import { AuthCard } from "../components/auth-card";
import { AuthLayout } from "../components/auth-layout";
import { LoginRoleTabs } from "../atoms/login-form/login-role-tabs";

import { ShieldUser } from "lucide-react";
import { baytfolioIcon } from "@/assets";

import { useQueryStates } from "nuqs";
import { loginSearchParams } from "../utils/login-search-params";

import { loginRoleContent } from "../constants/login.constants";

export const LoginPage = () => {
  const [params, setParams] = useQueryStates(loginSearchParams);
  const content = loginRoleContent[params.role];

  return (
    <AuthLayout>
      <AuthCard className="max-w-2xl">
        <div className="mb-7 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <img
              src={baytfolioIcon}
              alt=""
              aria-hidden="true"
              className="h-10 w-10 shrink-0 object-contain"
            />

            <div className="flex flex-col items-start">
              <p className="text-lg font-bold text-auth-brand-navy">
                BaytFolio
              </p>
              <span className="text-base text-auth-text-muted">
                المسؤول الأعلى
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md bg-auth-soft-bg px-3 py-2 text-text-secondary">
            <ShieldUser className="size-4" />

            <span className="whitespace-nowrap text-sm ">
              بوابة الإدارة المركزية
            </span>
          </div>
        </div>

        <LoginRoleTabs
          value={params.role}
          onValueChange={(nextRole) => void setParams({ role: nextRole })}
        />

        <div className="mb-7 text-right">
          <h1 className="mb-2 text-[26px] font-bold">{content.title}</h1>

          <p className="text-sm leading-6 text-text-secondary">
            {content.description}
          </p>
        </div>

        <LoginForm key={params.role} role={params.role} />
      </AuthCard>
    </AuthLayout>
  );
};
