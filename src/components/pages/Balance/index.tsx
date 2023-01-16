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
import { Account, Statement } from "../../../types/Account";
import { Category } from "../../../types/Category";
import { FormCreateAccount } from "./FormAccount/FormCreateAccount";
import { CardAccount } from "../../elements/Cards/CardAccount";
import { Modal } from "../../elements/Modal";
import { FormDeleteAccount } from "./ConfirmationDeleteAccount";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setNamesSuggest,
  useAuthenticateUser,
} from "../../../store";
import { setStatement } from "../../../store";
import { FormUpdateAccount } from "./FormAccount/FormUpdateAccount";
import { CardBalance } from "../../elements/Cards/CardBalance";
import Icon from "../../elements/Icon";
import { getMonth } from "../../../utils/getMonth";
import { FormCreateIncome } from "./FormIncome/FormCreateIncome";
import { FormCreateExchange } from "./FormExchange/FormCreateExchange";
import { CardExchange } from "../../elements/Cards/CardExchange";
import { getStatistic, MovementByCurrency } from "../../../utils/getStatistic";
import { FormDeleteExchange } from "./ConfirmationDeleteExchange";
import { Exchange } from "../../../types/Exchange";
import { currencyMask } from "../../../utils/masks/currencyMask";
import { AccordionHeader } from "../../elements/Accordion/AccordionHeader";

type ModalParamsType = {
  show: boolean;
  operation: "update" | "create" | "delete-account" | "delete-exchange";
  modal_title: string;
};

export const Balance = () => {
  const [balance, setBalance] = useState<MovementByCurrency[]>([]);
  const [showModal, setShowModal] = useState<ModalParamsType>({
    show: false,
    operation: "create",
    modal_title: "",
  });

  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [exchangeToDelete, setExchangeToDelete] = useState<Exchange | null>(
    null
  );
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

    accountService.getNamesSuggest().then(({ data }) => {
      dispatch(setNamesSuggest(data));
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
    const statistics = getStatistic(state.statements);

    setBalance(statistics.total);
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
    operation: "update" | "create" | "delete-account" | "delete-exchange",
    modal_title: string
  ) {
    setShowModal({ show: true, operation, modal_title });
  }

  console.log({ balance });

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
        <Box display="flex">
          {balance ? (
            balance?.map((balance) => (
              <CardBalance
                key={balance.currency}
                currency={balance.currency}
                value={balance.total}
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
              <Tab>Account</Tab>
              <Tab>Income</Tab>
              <Tab>Exchange</Tab>
            </TabList>

            <TabPanels>
              <TabPanel paddingX={0}>
                <FormCreateAccount
                  categories={state.categories}
                  onSuccess={() => getAccounts()}
                  onClose={closeModal}
                />
              </TabPanel>
              <TabPanel paddingX={0}>
                <FormCreateIncome
                  onSuccess={() => getAccounts()}
                  onClose={closeModal}
                />
              </TabPanel>
              <TabPanel paddingX={0}>
                <FormCreateExchange
                  onSuccess={() => getAccounts()}
                  onClose={closeModal}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}

        {showModal.operation === "delete-account" && (
          <FormDeleteAccount
            account={accountToDelete}
            onSuccess={() => getAccounts()}
            onClose={closeModal}
          />
        )}

        {showModal.operation === "delete-exchange" && (
          <FormDeleteExchange
            exchange={exchangeToDelete}
            onSuccess={() => getAccounts()}
            onClose={closeModal}
          />
        )}

        {showModal.operation === "update" && accountToUpdate && (
          <FormUpdateAccount
            defaultData={accountToUpdate}
            categories={state.categories}
            onSuccess={() => getAccounts()}
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
            {state?.statements.map((statement: Statement) => (
              <AccordionItem
                key={statement.month + statement.year}
                bg="white"
                boxShadow="base"
                borderRadius="md"
                marginBottom={2}
              >
                <AccordionHeader statement={statement} />

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
                            openModal("delete-account", "Delete Account");
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
                            setExchangeToDelete(account);
                            openModal("delete-exchange", "Delete Exchange");
                          }}
                          handleEdit={() => {}}
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
