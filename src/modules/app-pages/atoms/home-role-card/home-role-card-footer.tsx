import { Link } from "react-router";
import { CardFooter } from "@/shared/components/ui";
import { BtnV2 } from "@/shared/components/common";

import { ArrowLeft } from "lucide-react";

import type { RoleCardData } from "../../types/home.types";

export const HomeRoleCardFooter = ({ card }: { card: RoleCardData }) => {
  return (
    <CardFooter className="relative mt-auto">
      <Link to={card.href} className="w-full">
        <BtnV2
          type="button"
          variant={card.accent === "admin" ? "default" : "accent"}
          className="w-full"
        >
          {card.ctaLabel}
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
        </BtnV2>
      </Link>
    </CardFooter>
  );
};
