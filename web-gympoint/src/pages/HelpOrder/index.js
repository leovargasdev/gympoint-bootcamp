import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import {
  Container,
  OrdersTable,
  ConfigButtons,
  BtnAnswer,
  ContentModal,
  QuestionStudent,
} from './styles';
import api from '~/services/api';
import { updateHelpOrderRequest } from '~/store/modules/helpOrder/actions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export default function HelpOrder() {
  const dispatch = useDispatch();
  const [helpOrders, setHelpOrders] = useState([]);
  const [modalOrder, setModalOrder] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('/help-orders');

      setHelpOrders(response.data);
    }

    loadOrders();
  }, []);

  function openModal({ question, id }) {
    setIsOpen(true);
    setModalOrder({ question, id });
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleSubmit(data) {
    closeModal();
    dispatch(updateHelpOrderRequest({ ...data, id: modalOrder.id }));
  }

  return (
    <Container>
      <header>
        <strong>Pedidos de auxílio</strong>
      </header>
      <OrdersTable>
        <thead>
          <tr>
            <th>ALUNO</th>
            {/* eslint-disable-next-line */}
            <th />
          </tr>
        </thead>
        <tbody>
          {helpOrders.map(order => (
            <tr key={order.id}>
              <td>
                <span>{order.student.name}</span>
              </td>
              {/* config */}
              <td>
                <ConfigButtons>
                  <BtnAnswer type="button" onClick={() => openModal(order)}>
                    Responder
                  </BtnAnswer>
                </ConfigButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </OrdersTable>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Responder pedido de ajuda"
        >
          <ContentModal>
            <QuestionStudent>
              <strong>PERGUNDA DO ALUNO</strong>
              <span>{modalOrder.question}</span>
            </QuestionStudent>
            <Form onSubmit={handleSubmit}>
              <label htmlFor="answer">SUA RESPOSTA</label>
              <Input
                multiline
                name="answer"
                rows="4"
                placeholder="Escreva a resposta aqui"
              />

              <button type="submit">Responder Aluno</button>
            </Form>
          </ContentModal>
        </Modal>
      </div>
    </Container>
  );
}
