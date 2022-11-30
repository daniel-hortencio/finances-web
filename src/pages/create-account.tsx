import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";

import { CreateAccount } from "../components/pages/CreateAccount";

export default function PageBalance() {
  return (
    <AuthenticatedLayout title="Create Account">
      <CreateAccount />
    </AuthenticatedLayout>
  );
}
