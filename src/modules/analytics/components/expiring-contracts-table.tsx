import ExpiringContractRow, {
  type ExpiringContractRowData,
} from "./expiring-contract-row";

interface ExpiringContractsTableProps {
  contracts: ExpiringContractRowData[];
}

export default function ExpiringContractsTable({
  contracts,
}: ExpiringContractsTableProps) {
  return (
    <article className="h-full min-w-0 overflow-hidden rounded-lg border border-border-subtle bg-card shadow-sm">
      <div className="flex min-h-[84px] items-center justify-between gap-3 border-b border-border-divider px-5 py-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">
            عقود تحتاج متابعة
          </h2>
          <p className="mt-1.5 text-sm text-text-muted">
            عقود تنتهي قريبًا وتتطلب تجديدًا تشغيليًا
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 cursor-pointer text-sm font-medium text-text-primary transition-colors hover:text-text-secondary"
        >
          عرض الكل
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-right">
          <thead className="bg-background text-text-secondary">
            <tr>
              <th className="px-5 py-4 text-base font-semibold">
                المعرض ورقم العقد
              </th>
              <th className="px-3 py-4 text-center text-base font-semibold">
                الاستحقاق
              </th>
              <th className="px-4 py-4 text-center text-base font-semibold">
                الحالة
              </th>
            </tr>
          </thead>

          <tbody>
            {contracts.map((contract) => (
              <ExpiringContractRow key={contract.id} contract={contract} />
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
