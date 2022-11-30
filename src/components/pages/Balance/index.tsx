import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Skeleton,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import { accountService } from "../../../services/Accounts";
import { categoryService } from "../../../services/Categories";
import { balanceService } from "../../../services/Balance";
import { Account } from "../../../types/Account";
import { Balance as BalanceTypes } from "../../../types/Balance";
import { Category } from "../../../types/Category";
import { FormCreateAccount } from "./FormAccount/FormCreateAccount";
import { CardAccount } from "../../elements/Cards/CardAccount";
import { Modal } from "../../elements/Modal";
import { FormDeleteAccount } from "./ConfirmationDeleteAccount";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, useAuthenticateUser } from "../../../store";
import { setStatement } from "../../../store";
import { FormUpdateAccount } from "./FormAccount/FormUpdateAccount";
import { CardBalance } from "../../elements/Cards/CardBalance";
import Icon from "../../elements/Icon";
import { getMonth } from "../../../utils/getMonth";
import { FormCreateIncome } from "./FormIncome/FormCreateIncome";
import { FormCreateExchange } from "./FormExchange/FormCreateExchange";
import { CardExchange } from "../../elements/Cards/CardExchange";
import { getBalance } from "../../../utils/getBalance";

type ModalParamsType = {
  show: boolean;
  operation: "update" | "create" | "delete";
  modal_title: string;
};

export const Balance = () => {
  const [balance, setBalance] = useState<BalanceTypes | null>(null);
  const [showModal, setShowModal] = useState<ModalParamsType>({
    show: false,
    operation: "create",
    modal_title: "",
  });

  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [accountToUpdate, setAccountToUpdate] = useState<Account | null>(null);
  const [isFetchingAccounts, setIsFetchingAccounts] = useState(true);

  const state = useSelector(useAuthenticateUser);
  const dispatch = useDispatch();

  function getAccounts() {
    accountService
      .getByUser()
      .then(({ data }) => {
        dispatch(setStatement(data));
        setIsFetchingAccounts(false);
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  useEffect(() => {
    getAccounts();

    categoryService
      .getByUser()
      .then((res) => {
        dispatch(setCategories(res.data));
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  useEffect(() => {
    getBalance(state.statements);
  }, [state.statements]);

  function getCategory(id_category: string | undefined) {
    const category = state.categories.find(
      (category: Category) => category.id_category === id_category
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

  function closeModal() {
    setShowModal({ ...showModal, show: false });
  }

  function openModal(
    operation: "update" | "create" | "delete",
    modal_title: string
  ) {
    setShowModal({ show: true, operation, modal_title });
  }

  return (
    <>
      <Box
        bg="white"
        padding={2}
        boxShadow="base"
        borderRadius="md"
        marginBottom={6}
      >
        <Heading size="md" mb={2}>
          Balance
        </Heading>
        <Box>
          {balance ? (
            balance.balances?.map((balance) => (
              <CardBalance
                key={balance.currency}
                currency={balance.currency}
                value={balance.value}
              />
            ))
          ) : (
            <>
              {[1, 2, 3].map((item) => (
                <Skeleton
                  key={item}
                  width="6rem"
                  height="3.8rem"
                  borderRadius="md"
                  marginRight={2}
                />
              ))}
            </>
          )}
        </Box>
      </Box>

      {!isFetchingAccounts && (
        <Box marginBottom={6}>
          <Button
            onClick={() => openModal("create", "Create Movement")}
            colorScheme="teal"
          >
            <Icon name="FiPlusCircle" size={20} />
            <Text marginLeft={2}>Add New Movement</Text>
          </Button>
        </Box>
      )}

      <Modal
        isOpen={showModal.show}
        onClose={closeModal}
        title={showModal.modal_title}
      >
        {showModal.operation === "create" && (
          <Tabs variant="soft-rounded" colorScheme="teal">
            <TabList>
              <Tab>Income</Tab>
              <Tab>Account</Tab>
              <Tab>Exchange</Tab>
            </TabList>

            <TabPanels>
              <TabPanel paddingX={0}>
                <FormCreateIncome
                  onSuccess={() => {
                    getAccounts();
                    /* getBalance(); */
                  }}
                  onClose={closeModal}
                />
              </TabPanel>
              <TabPanel paddingX={0}>
                <FormCreateAccount
                  categories={state.categories}
                  onSuccess={() => {
                    getAccounts();
                    /* getBalance(); */
                  }}
                  onClose={closeModal}
                />
              </TabPanel>
              <TabPanel paddingX={0}>
                <FormCreateExchange
                  onSuccess={() => {
                    getAccounts();
                    /* getBalance(); */
                  }}
                  onClose={closeModal}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}

        {showModal.operation === "delete" && (
          <FormDeleteAccount
            account={accountToDelete}
            /* onSuccess={() =>
              dispatch(removeAccount(accountToDelete?.id_account))
            } */
            onSuccess={() => {}}
            onClose={closeModal}
          />
        )}

        {showModal.operation === "update" && accountToUpdate && (
          <FormUpdateAccount
            defaultData={accountToUpdate}
            categories={state.categories}
            onSuccess={() => {
              getAccounts();
              /* getBalance(); */
            }}
            onClose={closeModal}
          />
        )}
      </Modal>

      <Box>
        {isFetchingAccounts ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Skeleton
              key={item}
              borderRadius="md"
              marginBottom={2}
              height="3rem"
            />
          ))
        ) : (
          <Accordion defaultIndex={[0]} allowMultiple>
            {state?.statements.map((statement: any) => (
              <AccordionItem key={statement.month + statement.year}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight={600} as="span">
                      {getMonth(statement.month)}
                    </Text>{" "}
                    {statement.year}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  {statement.movements.map((account: any) => {
                    if (account.id_account)
                      return (
                        <CardAccount
                          key={"account-" + account.id_account}
                          description={account.description}
                          value={account.value}
                          category={getCategory(account.id_category)}
                          currency={account.currency}
                          date={account.date}
                          type={account.type}
                          handleDelete={() => {
                            setAccountToDelete(account);
                            openModal("delete", "Delete Account");
                          }}
                          handleEdit={() => {
                            setAccountToUpdate(account);
                            openModal(
                              "update",
                              account.type === "debit"
                                ? "Update Account"
                                : "Update Income"
                            );
                          }}
                        />
                      );

                    if (account.id_exchange) {
                      return (
                        <CardExchange
                          key={"exchange-" + account.id_account}
                          input_value={account.input_value}
                          input_currency={account.input_currency}
                          output_value={account.output_value}
                          output_currency={account.output_currency}
                          date={account.date}
                          handleDelete={() => {
                            setAccountToDelete(account);
                            openModal("delete", "Delete Exchange");
                          }}
                          handleEdit={() => {
                            setAccountToUpdate(account);
                            //openModal("update_exchange", "Update Exchange");
                          }}
                        />
                      );
                    }
                  })}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </Box>
    </>
  );
};
