import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { addMonths, format } from 'date-fns';
// import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { Container } from './styles';
// import { editEnrollmentRequest } from '~/store/modules/enrollment/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  student_id: Yup.number().required('É obrigatório selecionar um Aluno!'),
  plan_id: Yup.number().required('É obrigatório selecionar um Plano!'),
  start_date: Yup.date().required(
    'É obrigatório selecionar uma data de início'
  ),
});

export default function EditEnrollment(props) {
  // const dispatch = useDispatch();
  const [enrollment, setEnrollment] = useState({});
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [planId, setPlanId] = useState(0);

  const { id } = props.match.params;

  useEffect(() => {
    async function loadEnrollment() {
      const response = await api.get(`/enrollment/${id[0]}`);
      setEnrollment(response.data);
      setPlanId(response.data.plan_id);
    }

    loadEnrollment();
  }, [id]);

  const [startDate, setStartDate] = useState(
    format(new Date(), "yyyy'-'MM'-'dd")
  );

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
    loadFields();
  }, [enrollment, planId]);

  // const price = useMemo(
  //   () =>
  //     planId && plans && plans[planId - 1].duration * plans[planId - 1].price,
  //   [planId, plans]
  // );

  // const end_date = useMemo(
  //   () =>
  //     planId &&
  //     format(
  //       addMonths(new Date(startDate), plans[planId - 1].duration),
  //       "dd'/'MM'/'yyyy"
  //     ),
  //   [planId, plans, startDate]
  // );

  function handleSubmit(data) {
    console.tron.log(data);
    // dispatch(newEnrollmentRequest(data));
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
        <Select name="student_id" options={students} />

        <label htmlFor="plan_id">PLANO</label>
        <Select
          name="plan_id"
          options={plans}
          onChange={e => setPlanId(e.target.value)}
        />

        <label htmlFor="start_date">DATA DE INÍCIO</label>
        <Input
          type="date"
          name="start_date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />

        <label htmlFor="end_date">DATA DE TÉRMINO</label>
        <Input name="end_date" disabled />

        <label htmlFor="price">VALOR FINAL</label>
        <Input name="price" disabled />

        <button type="submit">Criar Matricula</button>
      </Form>
    </Container>
  );
}
