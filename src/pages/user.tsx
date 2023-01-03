import { useSelector } from "react-redux";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";

import { User } from "../components/pages/User";
import { useAuthenticateUser } from "../store";
import { TranslationsPageUser } from "../translations/pages/Perfil";

export default function PageBalance() {
  const state = useSelector(useAuthenticateUser);

  return (
    <AuthenticatedLayout
      title={TranslationsPageUser(state.user?.language).title}
    >
      <User />
    </AuthenticatedLayout>
  );
}
