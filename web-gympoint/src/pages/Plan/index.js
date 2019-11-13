import React, { useEffect, useState } from 'react';
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

import api from '~/services/api';

export default function Plan() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      setPlans(response.data);
    }

    loadPlans();
  }, [plans]);

  function handleRemovePlan(id) {
    console.tron.log('id:', id);
  }

  return (
    <Container>
      <header>
        <strong>Gerenciando planos</strong>
        <div>
          <Link to="/plan/new">
            <MdAdd size={14} color="#fff" />
            <span>Cadastrar</span>
          </Link>
        </div>
      </header>
      <StudentsTable>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DURAÇÃO</th>
            <th>VALOR p/ MÊS</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              {/* titulo */}
              <td>
                <span>{plan.title}</span>
              </td>
              {/* duração */}
              <td>
                <span>{plan.duration} mês</span>
              </td>
              {/* preço */}
              <td>
                <Age>R$ {plan.price}</Age>
              </td>
              {/* config */}
              <td>
                <ConfigButtons>
                  <BtnEdit to={`/plan/${plan.id}/edit`}>editar</BtnEdit>
                  <BtnRemove
                    type="button"
                    onClick={() => handleRemovePlan('student_id')}
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
