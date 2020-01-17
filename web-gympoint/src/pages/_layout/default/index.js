import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Header from '~/components/Header';

import {
  Wrapper,
  Content,
  ContentModal,
  ModalRemoveConfirm,
  ModalCancelRemove,
} from './styles';

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

export default function DefaultLayout({ children }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <Header />
      <Content>{children}</Content>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={setModalGlobalRemove}
        style={customStyles}
        contentLabel="Remover Aluno"
      >
        <ContentModal>
          <strong>MENSAGEM</strong>
          <ModalRemoveConfirm type="button">SIM</ModalRemoveConfirm>
          <ModalCancelRemove type="button">NÃO</ModalCancelRemove>
        </ContentModal>
      </Modal>
    </Wrapper>
  );
}

DefaultLayout.protTypes = {
  children: PropTypes.element.isRequired,
};
