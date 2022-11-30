import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";

import { Categories } from "../components/pages/Categories";

export default function PageBalance() {
  return (
    <AuthenticatedLayout title="Categories">
      <Categories />
    </AuthenticatedLayout>
  );
}
