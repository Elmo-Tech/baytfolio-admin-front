import { getNeedsAttention } from "../utils/needs-attention-view";
import NeedsAttentionCard from "./needs-attention-card";

export default function NeedsAttention() {
  const { items, onAction } = getNeedsAttention();

  return (
    <section aria-labelledby="needs-attention-heading" className="space-y-4">
      <header className="flex items-center justify-between gap-4">
        <h2
          id="needs-attention-heading"
          className="flex min-w-0 items-center gap-2 text-xl font-bold text-text-primary"
        >
          <span className="h-5 w-1 shrink-0 rounded-full bg-notification-unread" />
          <span>يحتاج إلى إجراء فوري (Needs Attention)</span>
        </h2>

        <p className="min-w-0 text-left text-xs leading-5 text-text-muted sm:text-sm">
          مهام تتطلب تخطيطًا واهتمامًا رسميًا
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 min-[1025px]:grid-cols-3">
        {items.map((item) => (
          <NeedsAttentionCard
            key={item.id}
            title={item.title}
            description={item.description}
            value={item.value}
            detail={item.detail}
            secondary={item.secondary}
            action={item.action}
            icon={item.iconComponent}
            classes={item.classes}
            detailClass={item.detailClass}
            secondaryClass={item.secondaryClass}
            onAction={onAction}
          />
        ))}
      </div>
    </section>
  );
}
