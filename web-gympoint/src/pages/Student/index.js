import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import {
  Container,
  StudentsTable,
  Age,
  ConfigButtons,
  BtnEdit,
  BtnRemove,
} from './styles';

import { deleteStudentRequest } from '~/store/modules/student/actions';
import api from '~/services/api';

export default function Students() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    loadStudents();
  }, [students]);

  function handleRemoveStudent(id) {
    dispatch(deleteStudentRequest({ id }));
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
                    onClick={() => handleRemoveStudent(student.id)}
                  >
                    apagar
                  </BtnRemove>
                </ConfigButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </StudentsTable>
    </Container>
  );
}
