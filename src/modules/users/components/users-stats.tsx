import { StatCard } from "@/shared/components/ui";
import { getUsersStats } from "../utils/users-stats-view";

export default function UsersStats() {
  const statsItems = getUsersStats();

  return (
    <section
      dir="rtl"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {statsItems.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
          description={item.description}
          icon={item.icon}
          iconClassName={`${item.iconBackground} ${item.iconColor}`}
          descriptionClassName={item.descriptionColor}
          valueAdornment={
            item.percentage && (
              <span className="rounded-sm bg-users-stat-success-bg px-2 py-1 text-[10px] font-semibold text-users-stat-success-fg">
                {item.percentage}
              </span>
            )
          }
        />
      ))}
    </section>
  );
}
