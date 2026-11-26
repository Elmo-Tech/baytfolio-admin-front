import { roleCards } from "../constants/home-role-content.constants";
import { HomeRoleCard } from "./home-role-card";

export const HomeRoleSelection = () => {
  return (
    <section
      aria-label="اختيار مساحة العمل"
      className="mx-auto mt-12 grid w-full max-w-5xl gap-6 md:grid-cols-2"
    >
      {roleCards.map((card) => (
        <HomeRoleCard key={card.title} card={card} />
      ))}
    </section>
  );
};
