import { useSelector } from "react-redux";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";

import { Categories } from "../components/pages/Categories";
import { useAuthenticateUser } from "../store";
import { TranslationsPageCategories } from "../translations/pages/Categories";

export default function PageBalance() {
  const state = useSelector(useAuthenticateUser);

  return (
    <AuthenticatedLayout
      title={TranslationsPageCategories(state.user?.language).title}
    >
      <Categories />
    </AuthenticatedLayout>
  );
}
