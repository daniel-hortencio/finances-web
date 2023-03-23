import { Currency } from "../enums/Currency"
import { Statement, Transaction } from "../types/Transaction"
import { Exchange } from "../types/Exchange"

export type MovementByCurrency = {
    currency: Currency,
    total: number
}

type StatisticsByMounth = {
    month: number,
    year: number,
    movements_by_currency: MovementByCurrency[]
}

type Statistics = {
    statistics: StatisticsByMounth[],
    total: MovementByCurrency[]
}

export function getStatistic(statements: Statement[]): Statistics {
    return {
        statistics: statements.map(statement => getStatisticByMonth(statement)),
        total: getStatisticsTotal(statements.map(statement => getStatisticByMonth(statement)))
    }
}

function getStatisticByMonth(statement: Statement): StatisticsByMounth {

    const { year, month } = statement

    let statistic_by_month: StatisticsByMounth = {
        year,
        month,
        movements_by_currency: []
    }

    statement.movements.forEach(movement => {
        if ((movement as Transaction).id_transaction) {
            handleTransactionMovement(statistic_by_month, movement as Transaction)
        }

        if ((movement as Exchange).id_exchange) {
            handleExchangeMovement(statistic_by_month, movement as Exchange)
        }
    })

    return statistic_by_month
}

function getStatisticsTotal(statistics: StatisticsByMounth[]) {
    let statistics_total: MovementByCurrency[] = []

    statistics.forEach(statistic => {
        statistic.movements_by_currency.forEach(st => {

            const statistic_index = statistics_total.findIndex(item => item.currency === st.currency)

            if (statistic_index < 0) {
                statistics_total.push({
                    currency: st.currency,
                    total: st.total
                })
            } else {
                statistics_total[statistic_index].total += st.total
            }
        })

    })

    return statistics_total
}

function handleTransactionMovement(statistic_by_month: StatisticsByMounth, movement: Transaction) {
    const currency_index = statistic_by_month.movements_by_currency.findIndex(item => item.currency === (movement as Transaction).currency)

    if (currency_index < 0) {
        statistic_by_month.movements_by_currency.push({
            total: (movement as Transaction).type === "credit" ? (movement as Transaction).value : (-1 * (movement as Transaction).value),
            currency: (movement as Transaction).currency
        })
    } else {
        statistic_by_month.movements_by_currency[currency_index].total += (movement as Transaction).type === "credit" ? (movement as Transaction).value : (-1 * (movement as Transaction).value)
    }
}

function handleExchangeMovement(statistic_by_month: StatisticsByMounth, movement: Exchange) {
    const currency_index_input = statistic_by_month.movements_by_currency.findIndex(item => item.currency === (movement as Exchange).input_currency)

    if (currency_index_input < 0) {
        statistic_by_month.movements_by_currency.push({
            total: (-1 * (movement as Exchange).input_value),
            currency: (movement as Exchange).input_currency
        })
    } else {
        statistic_by_month.movements_by_currency[currency_index_input].total += (-1 * (movement as Exchange).input_value)
    }

    const currency_index_output = statistic_by_month.movements_by_currency.findIndex(item => item.currency === (movement as Exchange).output_currency)

    if (currency_index_output < 0) {
        statistic_by_month.movements_by_currency.push({
            total: (movement as Exchange).output_value,
            currency: (movement as Exchange).output_currency
        })
    } else {
        statistic_by_month.movements_by_currency[currency_index_output].total += (movement as Exchange).output_value
    }
}