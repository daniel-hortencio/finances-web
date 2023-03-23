import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Skeleton,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionPanel,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import { transactionService } from "../../../services/Transaction";
import { categoryService } from "../../../services/Categories";
import {
  Transaction,
  Statement,
  TransactionType,
} from "../../../types/Transaction";
import { Category } from "../../../types/Category";
import { FormCreateTransaction } from "./FormTransaction/FormCreateTransaction";
import { CardTransaction } from "../../elements/Cards/CardTransaction";
import { Modal } from "../../elements/Modal";
import { FormDeleteTransaction } from "./ConfirmationDeleteTransaction";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setNamesSuggest,
  useAuthenticateUser,
} from "../../../store";
import { setStatement } from "../../../store";
import { FormUpdateTransaction } from "./FormTransaction/FormUpdateTransaction";
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
  operation: "update" | "create" | "delete-transaction" | "delete-exchange";
  modal_title: string;
};

export const Balance = () => {
  const [balance, setBalance] = useState<MovementByCurrency[]>([]);
  const [showModal, setShowModal] = useState<ModalParamsType>({
    show: false,
    operation: "create",
    modal_title: "",
  });

  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);
  const [exchangeToDelete, setExchangeToDelete] = useState<Exchange | null>(
    null
  );
  const [transactionToUpdate, setTransactionToUpdate] =
    useState<Transaction | null>(null);
  const [isFetchingTransactions, setIsFetchingTransactions] = useState(true);

  const state = useSelector(useAuthenticateUser);
  const dispatch = useDispatch();

  function getTransactions() {
    transactionService
      .getByUser()
      .then(({ data }) => {
        dispatch(setStatement(data));
        setIsFetchingTransactions(false);
      })
      .catch((err) => {
        console.log({ err });
      });

    transactionService.getNamesSuggest().then(({ data }) => {
      dispatch(setNamesSuggest(data));
    });
  }

  useEffect(() => {
    getTransactions();

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

    /* console.log({ statements: state.statements, statistics }); */

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
        type: "debit" as TransactionType,
      };

    const { name, background_color, icon_color, icon_name, type } = category;

    return { name, background_color, icon_color, icon_name, type };
  }

  function closeModal() {
    setShowModal({ ...showModal, show: false });
  }

  function openModal(
    operation: "update" | "create" | "delete-transaction" | "delete-exchange",
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

      {!isFetchingTransactions && (
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
              <Tab>Transaction</Tab>
              <Tab>Income</Tab>
              <Tab>Exchange</Tab>
            </TabList>

            <TabPanels>
              <TabPanel paddingX={0}>
                <FormCreateTransaction
                  categories={state.categories.filter(
                    (category) => category.type === "debit"
                  )}
                  onSuccess={() => getTransactions()}
                  onClose={closeModal}
                />
              </TabPanel>
              <TabPanel paddingX={0}>
                <FormCreateIncome
                  categories={state.categories.filter(
                    (category) => category.type === "credit"
                  )}
                  onSuccess={() => getTransactions()}
                  onClose={closeModal}
                />
              </TabPanel>
              <TabPanel paddingX={0}>
                <FormCreateExchange
                  onSuccess={() => getTransactions()}
                  onClose={closeModal}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}

        {showModal.operation === "delete-transaction" && (
          <FormDeleteTransaction
            transaction={transactionToDelete}
            onSuccess={() => getTransactions()}
            onClose={closeModal}
          />
        )}

        {showModal.operation === "delete-exchange" && (
          <FormDeleteExchange
            exchange={exchangeToDelete}
            onSuccess={() => getTransactions()}
            onClose={closeModal}
          />
        )}

        {showModal.operation === "update" && transactionToUpdate && (
          <FormUpdateTransaction
            defaultData={transactionToUpdate}
            categories={state.categories.filter(
              (category) => category.type === transactionToUpdate.type
            )}
            onSuccess={() => getTransactions()}
            onClose={closeModal}
          />
        )}
      </Modal>

      <Box>
        {isFetchingTransactions ? (
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
                  {statement.movements.map((transaction: any) => {
                    if (transaction.id_transaction)
                      return (
                        <CardTransaction
                          key={"transaction-" + transaction.id_transaction}
                          description={transaction.description}
                          value={transaction.value}
                          category={getCategory(transaction.id_category)}
                          currency={transaction.currency}
                          date={transaction.date}
                          type={transaction.type}
                          handleDelete={() => {
                            setTransactionToDelete(transaction);
                            openModal(
                              "delete-transaction",
                              "Delete Transaction"
                            );
                          }}
                          handleEdit={() => {
                            setTransactionToUpdate(transaction);
                            openModal(
                              "update",
                              transaction.type === "debit"
                                ? "Update Transaction"
                                : "Update Income"
                            );
                          }}
                        />
                      );

                    if (transaction.id_exchange) {
                      return (
                        <CardExchange
                          key={"exchange-" + transaction.id_transaction}
                          input_value={transaction.input_value}
                          input_currency={transaction.input_currency}
                          output_value={transaction.output_value}
                          output_currency={transaction.output_currency}
                          date={transaction.date}
                          handleDelete={() => {
                            setExchangeToDelete(transaction);
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
