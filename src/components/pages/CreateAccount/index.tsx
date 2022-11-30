import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";

import Icon from "../../elements/Icon";

import { accountService } from "../../../services/Accounts";
import { categoryService } from "../../../services/Categories";
import { balanceService } from "../../../services/Balance";
import { Account } from "../../../types/Account";
import { Balance as BalanceTypes } from "../../../types/Balance";
import { Category } from "../../../types/Category";
//import { FormCreateAccount } from "./FormCreateAccount";
import { CardAccount } from "../../elements/Cards/CardAccount";
import { currencyMask } from "../../../utils/masks/currencyMask";

export const CreateAccount = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [balance, setBalance] = useState<BalanceTypes | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    accountService
      .getByUser()
      .then((res) => {
        console.log({res})
      })
      .catch((err) => {
        console.log({ err });
      });

    balanceService
      .getByUser()
      .then((res) => {
        setBalance(res.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  function handleDeleteAccount(id_account: string) {}

  function handleEditAccount(id_account: string) {}

  function getCategory(id_category: string | undefined) {
    const category = categories.find(
      (category) => category.id_category === id_category
    );

    if (!category)
      return {
        name: "Sem categoria",
        background_color: "#ccc",
        icon_color: "#fff",
        icon_name: "",
      };

    const { name, background_color, icon_color, icon_name } = category;

    return { name, background_color, icon_color, icon_name };
  }

  return (
    <>
      {/* <FormCreateAccount categories={categories} /> */}
      <Button onClick={() => {}}>Add New Account</Button>
      <Box as="ul" display="flex">
        {balance?.balances?.map((balance) => (
          <Box
            as="li"
            key={balance.currency}
            border="1px"
            borderStyle="solid"
            borderColor="gray.700"
            p="1.5"
          >
            <strong>{balance.currency}</strong>{" "}
            <p>{currencyMask(`${balance.value.toFixed(2)}`)}</p>
          </Box>
        ))}
      </Box>
      <ul>
        {accounts.map((account) => (
          <CardAccount
            key={account.id_account}
            description={account.description}
            value={account.value}
            category={getCategory(account.id_category)}
            currency={account.currency}
            date={account.date}
            type={account.type}
            handleDelete={() => handleDeleteAccount(account.id_account)}
            handleEdit={() => handleEditAccount(account.id_account)}
          />
        ))}
      </ul>
    </>
  );
};
