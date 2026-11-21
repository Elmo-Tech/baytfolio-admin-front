export interface ExpiringContractRowData {
  id: string;
  name: string;
  expiry: string;
  remaining: string;
  status: string;
  statusColor: string;
  dateDescriptionColor: string;
}

interface ExpiringContractRowProps {
  contract: ExpiringContractRowData;
}

export default function ExpiringContractRow({
  contract,
}: ExpiringContractRowProps) {
  return (
    <tr className="border-t border-border-divider transition-colors hover:bg-background/50">
      <td className="px-5 py-5">
        <p className="text-base font-semibold text-text-primary">
          {contract.name}
        </p>
        <p className="mt-1.5 text-sm text-text-muted">{contract.id}</p>
      </td>

      <td className="px-3 py-5 text-center">
        <p className="text-base font-medium tabular-nums text-text-primary">
          {contract.expiry}
        </p>
        <p
          className={[
            "mt-1.5 text-sm font-semibold",
            contract.dateDescriptionColor,
          ].join(" ")}
        >
          {contract.remaining}
        </p>
      </td>

      <td className="px-4 py-5 text-center">
        <span
          className={[
            "inline-flex items-center whitespace-nowrap rounded-md border px-3 py-1.5 text-sm font-semibold",
            contract.statusColor,
          ].join(" ")}
        >
          {contract.status}
        </span>
      </td>
    </tr>
  );
}
