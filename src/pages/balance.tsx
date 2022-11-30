import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";

import { Balance } from "../components/pages/Balance";

export default function PageBalance() {
  return (
    <AuthenticatedLayout title="Balance">
      <Balance />
    </AuthenticatedLayout>
  );
}
