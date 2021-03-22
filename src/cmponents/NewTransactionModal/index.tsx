import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outCome from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps{
    isOpen:boolean;
    onRequestclose: () => void;
}
export function NewTransactionModal({isOpen, onRequestclose}:NewTransactionModalProps){
    const {createTransaction} = useTransactions();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event : FormEvent){
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        })

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestclose();
    }
    return(
        <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestclose}
        
        overlayClassName="react-modal-overlay"
        className="react-modal-content">
            <h2>Cadastrar Transação</h2>
            <button type="button" onClick={onRequestclose} className="react-modal-close">
                <img src={closeImg} alt="close modal"/>
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <input placeholder="Título" type="text" value={title} onChange={event => setTitle(event.target.value)}/>
                <input placeholder="Valor" type="number" value={amount} onChange={event => setAmount(Number(event.target.value))}/>
                <TransactionTypeContainer>
                    <RadioBox isActive = {type == 'deposit'} activeColor="green" type="button" onClick={() => {setType('deposit');}}>
                        <img src={incomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>  

                    <RadioBox isActive = {type == 'withdraw'} activeColor="red" type="button" onClick={() => {setType('withdraw');}}>
                        <img src={outCome} alt="Saída"/>
                        <span>Saída</span>
                    </RadioBox>                
                </TransactionTypeContainer>

                <input placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)}/>

                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}