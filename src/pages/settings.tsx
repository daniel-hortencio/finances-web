import { useSelector } from "react-redux";
import AuthenticatedLayout from "../components/layouts/AuthenticatedLayout";

import { Settings } from "../components/pages/Settings";
import { useAuthenticateUser } from "../store";
import { TranslationsPageSettings } from "../translations/pages/Settings";

export default function PageBalance() {
  const state = useSelector(useAuthenticateUser);

  return (
    <AuthenticatedLayout
      title={TranslationsPageSettings(state.user?.language).title}
    >
      <Settings />
    </AuthenticatedLayout>
  );
}
