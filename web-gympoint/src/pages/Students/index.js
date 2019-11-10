import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { Container, StudentsTable } from './styles';

import api from '~/services/api';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    loadStudents();
  }, []);

  function handleEditStudent(id) {
    console.log('id:', id);
  }
  function handleRemoveStudent(id) {
    console.log('id:', id);
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando alunos</strong>
        <div>
          <Link to="/">
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
            <th />
            {/* config  */}
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
                <strong>{student.age}</strong>
              </td>
              {/* config */}
              <td>
                <button
                  type="button"
                  onClick={() => handleEditStudent('student_id')}
                >
                  editar
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveStudent('student_id')}
                >
                  apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </StudentsTable>
    </Container>
  );
}
