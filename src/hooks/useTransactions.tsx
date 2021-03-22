import {createContext, useEffect, useState, ReactNode, useContext} from 'react';
import { api } from '../services/api';
interface Transaction{
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}
/*
interface TransactionInput{
    title: string;
    amount: number;
    type: string;
    category: string;
} */

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; //herdar todos os campos menos os mencionados aqui
// type TransactionInput = Pick<Transaction, 'title ' | 'amount' | 'type' | 'category'>; Selecionar de dentro
interface TransactionsProviderProps{
    children: ReactNode;
}

interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}
const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    );

export function TransactionsProvider({children}: TransactionsProviderProps){
//pra exibir as transações, sempre alterando o estado
const[transactions, setTransactions] = useState<Transaction[]>([]);

useEffect(()=> {
    api.get('transactions').then(response=> setTransactions(response.data.transactions));
}, []);

async function createTransaction(transactionInput : TransactionInput){
    const response = await api.post('/transactions', 
    {...transactionInput, 
    createdAt: new Date(),
    });

    const {transaction} = response.data;

    //conceito de imutabilidade. Criando um novo vetor a partir do ultimo elemento
    setTransactions([
        ...transactions,
        transaction,
    ]);
}

return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions(){
    const context = useContext(TransactionsContext);

    return context;
}