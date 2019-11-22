import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { getEnrollmentRequest } from '~/store/modules/enrollment/actions';
import {
  Container,
  StudentsTable,
  ConfigButtons,
  BtnEdit,
  BtnRemove,
} from './styles';

import api from '~/services/api';

export default function Enrollment() {
  const [enrollments, setEnrollments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get('enrollments');
      setEnrollments(response.data);
    }

    loadEnrollments();
  }, []);

  function handleEditEnrollment(id) {
    dispatch(getEnrollmentRequest({ id }));
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando Matriculas</strong>
        <div>
          <Link to="/enrollment/new">
            <MdAdd size={14} color="#fff" />
            <span>Cadastrar</span>
          </Link>
        </div>
      </header>
      <StudentsTable>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>PLANO</th>
            <th>INÍCIO</th>
            <th>TÉRMINO</th>
            <th>ATIVA</th>
            {/* eslint-disable-next-line */}
            <th />
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enrollment => (
            <tr key={enrollment.id}>
              {/* aluno */}
              <td>
                <span>{enrollment.student}</span>
              </td>
              {/* plano */}
              <td>
                <span>{enrollment.title_plan}</span>
              </td>
              {/* inicio */}
              <td>
                <span>{enrollment.start}</span>
              </td>
              {/* termino */}
              <td>
                <span>{enrollment.end}</span>
              </td>
              {/* estado */}
              <td>
                <span>
                  <MdCheckCircle size={14} color="#fff" />
                </span>
              </td>
              {/* config */}
              <td>
                <ConfigButtons>
                  <BtnEdit onClick={() => handleEditEnrollment(enrollment.id)}>
                    {/* <BtnEdit to={`/enrollment/${enrollment.id}/edit`}> */}
                    {/* to={`/enrollment/${enrollment.id}/edit`} */}
                    editar
                  </BtnEdit>
                  <BtnRemove type="button">apagar</BtnRemove>
                </ConfigButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </StudentsTable>
    </Container>
  );
}
