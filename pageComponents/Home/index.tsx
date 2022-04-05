import TransactionInput from '../../components/TransactionInput'
import { useState, useEffect } from 'react'
import Signin from '../Signin'
import { Session } from '@supabase/supabase-js'
import styles from './styles.module.scss'
import { useAuth } from '../../Context/AuthContext'
// import { format } from "path";

interface TransactionType {
  reason: string
  amount: number
}

export default function Home() {
  const { session } = useAuth()
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [transactions, setTransactions] = useState<TransactionType[] | []>([])

  if (!session) {
    return (
      <div className={styles.container}>
        <Signin />
      </div>
    )
  }

  const submit = () => {
    const newTransaction: TransactionType = {
      reason: reason,
      amount: Number(amount),
    }

    setTransactions((prevState) => [newTransaction, ...prevState])
    setAmount('')
    setReason('')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Finances App</h1>
      </header>

      <h2>Manage your money with efficiency</h2>

      <form className={styles.form_container} onSubmit={submit}>
        <div>
          <button type="submit">Insert Transaction</button>
          <span>Number of transactions: {transactions.length} </span>
        </div>
        <div className={styles.input_container}>
          <label>Reason</label>
          <TransactionInput
            value={reason}
            onChange={(e) => {
              setReason(e.target.value)
            }}
            type="text"
          />
        </div>
        <div className={styles.input_container}>
          <label>Amount</label>
          <TransactionInput
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value)
            }}
            type="text"
          />
        </div>
      </form>

      <section>
        {transactions.length > 0 &&
          transactions.map((item, index) => {
            return (
              <div key={index}>
                <span style={{ marginRight: '1rem' }}>{item.reason}</span>
                <p> {item.amount} </p>
              </div>
            )
          })}
      </section>
    </div>
  )
}
