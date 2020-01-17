import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import Modal from 'react-modal';
import {
  Container,
  StudentsTable,
  Age,
  ConfigButtons,
  BtnEdit,
  BtnRemove,
  ContentModal,
  ModalRemoveStudent,
  ModalCancelRemoveStudent,
} from './styles';

import { deleteStudentRequest } from '~/store/modules/student/actions';
import api from '~/services/api';

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

export default function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [modalStudent, setModalStudent] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModalRemoveStudent() {
    // setModalGlobalRemove(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    loadStudents();
  }, [students]);

  function handleRemoveStudent(id) {
    dispatch(deleteStudentRequest({ id }));
    closeModal();
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando alunos</strong>
        <div>
          <Link to="/student/new">
            <MdAdd size={14} color="#fff" />
            <span>Cadastrar</span>
          </Link>
          <input type="text" placeholder="Buscar aluno" />
        </div>
      </header>
      <StudentsTable>
        <thead>
          <tr>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>IDADE</th>
            {/* eslint-disable-next-line */}
            <th />
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              {/* name */}
              <td>
                <span>{student.name}</span>
              </td>
              {/* email */}
              <td>
                <span>{student.email}</span>
              </td>
              {/* age */}
              <td>
                <Age>{student.age}</Age>
              </td>
              {/* config */}
              <td>
                <ConfigButtons>
                  <BtnEdit to={`/student/${student.id}/edit`}>editar</BtnEdit>
                  <BtnRemove
                    type="button"
                    onClick={() => openModalRemoveStudent(student)}
                  >
                    apagar
                  </BtnRemove>
                </ConfigButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </StudentsTable>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Remover Aluno"
        >
          <ContentModal>
            <strong>
              Deseja remover o aluno <span>{modalStudent.name}</span>?
            </strong>
            <ModalRemoveStudent
              type="button"
              onClick={() => handleRemoveStudent(modalStudent.id)}
            >
              SIM
            </ModalRemoveStudent>
            <ModalCancelRemoveStudent type="button">
              NÃO
            </ModalCancelRemoveStudent>
          </ContentModal>
        </Modal>
      </div>
    </Container>
  );
}
