import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import AdminLayout from "./admin-layout";

export default function AdminLayoutWithNuqs() {
  return (
    <NuqsAdapter>
      <AdminLayout />
    </NuqsAdapter>
  );
}
