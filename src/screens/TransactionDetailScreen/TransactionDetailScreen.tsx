import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import type { Transaction } from '../../types/transaction'
import { formatCurrency, formatDetailDate } from '../../utils/formatters'
import styles from './TransactionDetailScreen.module.css'

interface TransactionDetailScreenProps {
  transaction: Transaction
  onBack: () => void
}

function TransactionDetailScreenComponent({
  transaction,
  onBack,
}: TransactionDetailScreenProps) {
  return (
    <div className={`${styles.screen} ${styles.screenDetail}`}>
      <button className={styles.backButton} onClick={onBack} aria-label="Back">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <section className={styles.detailHero}>
        <h1>{formatCurrency(transaction.amount)}</h1>
        <p className={styles.detailName}>{transaction.name}</p>
        <p className={styles.detailDate}>{formatDetailDate(transaction.date)}</p>
      </section>

      <section className={styles.detailCard} aria-label="Transaction details">
        <div className={`${styles.detailRow} ${styles.statusRow}`}>
          <div className={styles.statusContent}>
            <div className={styles.statusLine}>
              <span className={styles.detailLabel}>Status:</span>
              <span className={styles.statusValue}>{transaction.pending ? 'Pending' : 'Approved'}</span>
            </div>
            <span className={styles.detailValueMuted}>RBC Bank Debit Card</span>
          </div>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Type</span>
          <span className={`${styles.detailValue} ${styles.detailValueMuted}`}>{transaction.type}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Description</span>
          <span className={`${styles.detailValue} ${styles.detailValueMuted}`}>{transaction.description}</span>
        </div>
        {transaction.authorizedUser ? (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Authorized User</span>
            <span className={`${styles.detailValue} ${styles.detailValueMuted}`}>{transaction.authorizedUser}</span>
          </div>
        ) : null}
        <div className={`${styles.detailRow} ${styles.totalRow}`}>
          <span className={styles.detailLabel}>Total</span>
          <span className={styles.detailValue}>{formatCurrency(transaction.amount)}</span>
        </div>
      </section>
    </div>
  )
}

export const TransactionDetailScreen = memo(TransactionDetailScreenComponent)
