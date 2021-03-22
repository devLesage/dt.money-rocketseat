import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./cmponents/Dashboard";
import { Header } from "./cmponents/Header";
import { NewTransactionModal } from "./cmponents/NewTransactionModal";
import {TransactionsProvider} from "./hooks/useTransactions";
import {GlobalStyle} from "./styles/global";

Modal.setAppElement('#root');
export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false); //modal setado como false

    function handleOpenNewTransactionModal(){
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal(){
        setIsNewTransactionModalOpen(false);
    }
  return (
    <TransactionsProvider>
       <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
       <Dashboard/>

       <NewTransactionModal
        isOpen={isNewTransactionModalOpen}

        onRequestclose={handleCloseNewTransactionModal}
       />

      
       <GlobalStyle/>
    </TransactionsProvider>
  );
}


