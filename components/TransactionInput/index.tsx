import { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss'

interface TransactionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TransactionInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input {...props} className={styles.input} />
};

export default TransactionInput;
