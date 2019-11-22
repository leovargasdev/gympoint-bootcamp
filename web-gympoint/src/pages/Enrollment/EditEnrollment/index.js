import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { addMonths, format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { Container } from './styles';
import {
  updateEnrollmentRequest,
  getEnrollmentRequest,
} from '~/store/modules/enrollment/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  student_id: Yup.number().required('É obrigatório selecionar um Aluno!'),
  plan_id: Yup.number().required('É obrigatório selecionar um Plano!'),
  start_date: Yup.date().required(
    'É obrigatório selecionar uma data de início'
  ),
});

export default function EditEnrollment(props) {
  const dispatch = useDispatch();
  const id = Number(props.match.params.id);
  const { enrollment } = useSelector(state => state.enrollment);

  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [planId, setPlanId] = useState(enrollment.plan_id);
  const [price, setPrice] = useState(enrollment.price);
  const [studentId, setStudentId] = useState(enrollment.student_id);
  const [startDate, setStartDate] = useState(enrollment.start_date);
  const [endDate, setEndDate] = useState(enrollment.end_date);

  useEffect(() => {
    async function loadFields() {
      const responsePlans = await api.get('plans');
      const responseStudents = await api.get('students');
      const result = responseStudents.data.map(e => {
        return {
          id: e.id,
          title: e.name,
        };
      });
      setPlans(responsePlans.data);
      setStudents(result);
    }
    if (id !== enrollment.id) {
      dispatch(getEnrollmentRequest({ id }));
    }
    loadFields();
    // eslint-disable-next-line
  }, [props]);

  // Não sei pq mas isso não funciona, o useMemo carrega antes que o useEffect e assim o array plans está vazio e dá erro nas propriedades duration e price
  // const price = useMemo( () => planId && plans[planId - 1].duration * plans[planId - 1].price, [planId, plans] );

  function hadleSetEndDate() {
    setEndDate(
      format(
        addMonths(new Date(startDate), plans[planId].duration),
        'yyyy-MM-dd'
      )
    );
  }
  // Foi criada essa funções pois o useMemo dá pau.
  function handleChangePlan(plan) {
    setPlanId(plan);
    setPrice(plans[planId].duration * plans[planId].price);
    hadleSetEndDate();
  }

  // Mesmo bug do price
  function handleChangeStartDate(sd) {
    setStartDate(sd);
    hadleSetEndDate();
  }

  function handleSubmit(data) {
    dispatch(updateEnrollmentRequest({ ...data, id: enrollment.id }));
  }

  return (
    <Container>
      <header>
        <strong>Editar matrícula</strong>
        <div>
          <button type="button">VOLTAR</button>
          <button type="button">SALVAR</button>
        </div>
      </header>

      <Form schema={schema} initialData={enrollment} onSubmit={handleSubmit}>
        <label htmlFor="student_id">ALUNO</label>
        <Select
          value={studentId}
          name="student_id"
          options={students}
          onChange={e => setStudentId(e.target.value)}
        />

        <label htmlFor="plan_id">PLANO</label>
        <Select
          value={planId}
          name="plan_id"
          options={plans}
          onChange={e => handleChangePlan(e.target.value)}
        />

        <label htmlFor="start_date">DATA DE INÍCIO</label>
        <Input
          type="date"
          name="start_date"
          onChange={e => handleChangeStartDate(e.target.value)}
        />

        <label htmlFor="end_date">DATA DE TÉRMINO</label>
        <Input type="date" value={endDate} name="end_date" disabled />

        <label htmlFor="price">VALOR FINAL</label>
        <Input name="price" value={price} disabled />

        <button type="submit">Criar Matricula</button>
      </Form>
    </Container>
  );
}
