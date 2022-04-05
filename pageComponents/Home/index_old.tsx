import TransactionInput from "../../components/TransactionInput";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import Auth from "../../components/Auth";
import { Session } from "@supabase/supabase-js";
import styles from "./styles.module.scss";
// import { format } from "path";

interface TransactionType {
  reason: string;
  amount: number;
}

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [transactions, setTransactions] = useState<TransactionType[] | []>([]);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log("session -->", session);
  console.log("transactions -->", transactions);

  if (!session) {
    return (
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        <Auth />
        {/* <Account key={session.user.id} session={session} /> */}
      </div>
    );
  }

  const submit = () => {
    const newTransaction: TransactionType = {
      reason: reason,
      amount: Number(amount),
    };

    setTransactions((prevState) => ([newTransaction, ...prevState ]));
    setAmount('')
    setReason('')
  };

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
              setReason(e.target.value);
            }}
            type="text"
          />
        </div>
        <div className={styles.input_container}>
          <label>Amount</label>
          <TransactionInput
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
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
                <span style={{ marginRight: "1rem" }}>{item.reason}</span>
                <p> {item.amount} </p>
              </div>
            );
          })}
      </section>
    </div>
  );
}
