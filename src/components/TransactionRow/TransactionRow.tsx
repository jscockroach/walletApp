import { memo, useCallback, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faApple,
  faApplePay,
  faAmazon,
} from '@fortawesome/free-brands-svg-icons'
import {
  faBullseye,
  faCouch,
  faLeaf,
  faMobileScreenButton,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { Transaction } from '../../types/transaction'
import { formatCurrency, formatListDate } from '../../utils/formatters'
import styles from './TransactionRow.module.css'

interface TransactionRowProps {
  transaction: Transaction
  onSelect: (transaction: Transaction) => void
}

const ICON_MAP: Record<string, IconDefinition> = {
  apple: faApple,
  payment: faApplePay,
  ikea: faCouch,
  target: faBullseye,
  grocery: faLeaf,
  amazon: faAmazon,
  phone: faMobileScreenButton,
}

const DARK_BACKGROUNDS = ['tone1', 'tone2', 'tone3', 'tone4', 'tone5']

const COLORED_ICON_KEYS = new Set(['payment', 'ikea', 'target'])

function getToneFromId(id: string): string {
  let hash = 0
  for (let i = 0; i < id.length; i += 1) {
    hash += id.charCodeAt(i)
  }

  return DARK_BACKGROUNDS[hash % DARK_BACKGROUNDS.length]
}

export function TransactionRow({ transaction, onSelect }: TransactionRowProps) {
  const amountPrefix = transaction.type === 'payment' ? '+' : ''
  const cashbackLabel = transaction.cashbackPercentage
    ? `${transaction.cashbackPercentage}%`
    : ''
  const icon = useMemo(() => {
    return ICON_MAP[transaction.merchantKey] ?? faMobileScreenButton
  }, [transaction.merchantKey])
  const toneClass = useMemo(() => {
    if (COLORED_ICON_KEYS.has(transaction.merchantKey)) {
      if (transaction.merchantKey === 'payment') {
        return 'brandPayment'
      }

      if (transaction.merchantKey === 'ikea') {
        return 'brandIkea'
      }

      return 'brandTarget'
    }

    return getToneFromId(transaction.id)
  }, [transaction.id, transaction.merchantKey])
  const detailsPrefix = transaction.pending ? 'Pending - ' : ''
  const metaText = useMemo(() => {
    const formattedDate = formatListDate(transaction.date)
    return transaction.authorizedUser
      ? `${transaction.authorizedUser} - ${formattedDate}`
      : formattedDate
  }, [transaction.authorizedUser, transaction.date])
  const formattedAmount = useMemo(() => formatCurrency(transaction.amount), [transaction.amount])
  const handleClick = useCallback(() => {
    onSelect(transaction)
  }, [onSelect, transaction])

  return (
    <button className={styles.transactionRow} onClick={handleClick}>
      <span className={`${styles.merchantIcon} ${styles[toneClass]}`} aria-hidden="true">
        <FontAwesomeIcon icon={icon} />
      </span>

      <span className={styles.transactionMain}>
        <span className={styles.transactionHeaderRow}>
          <span className={styles.transactionName}>{transaction.name}</span>
        </span>

        <span className={styles.transactionDescription}>
          {detailsPrefix}
          {transaction.description}
        </span>

        <span className={styles.transactionMeta}>{metaText}</span>
      </span>

      <span className={styles.transactionSide} aria-hidden="true">
        <span className={styles.transactionAmount}>
          {amountPrefix}
          {formattedAmount}
        </span>
        <span className={styles.cashbackBadge}>{cashbackLabel}</span>
      </span>

      <span className={styles.transactionArrow} aria-hidden="true">
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </button>
  )
}

export const MemoizedTransactionRow = memo(TransactionRow)
