import { useSelector } from "react-redux";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";

import { Balance } from "../components/pages/Balance";
import { TranslationsPageBalance } from "../translations/pages/Balance";
import { useAuthenticateUser } from "../store";

export default function PageBalance() {
  const state = useSelector(useAuthenticateUser);

  return (
    <AuthenticatedLayout
      title={TranslationsPageBalance(state.user?.language).title}
    >
      <Balance />
    </AuthenticatedLayout>
  );
}
