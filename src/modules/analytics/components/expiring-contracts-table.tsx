import { Button } from "@/shared/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from "@/shared/components/ui/table";
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

        <Button
          unstyled
          type="button"
          className="shrink-0 cursor-pointer text-sm font-medium text-text-primary transition-colors hover:text-text-secondary"
        >
          عرض الكل
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full min-w-[480px] text-right">
          <TableHeader className="bg-background text-text-secondary">
            <TableRow>
              <TableHead presentation="analytics-leading">
                المعرض ورقم العقد
              </TableHead>
              <TableHead presentation="analytics">الاستحقاق</TableHead>
              <TableHead className="px-4 py-4 text-center text-base font-semibold">
                الحالة
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {contracts.map((contract) => (
              <ExpiringContractRow key={contract.id} contract={contract} />
            ))}
          </TableBody>
        </Table>
      </div>
    </article>
  );
}
