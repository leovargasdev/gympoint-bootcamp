import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { addMonths, format } from 'date-fns';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { Container } from './styles';
import { updateEnrollmentRequest } from '~/store/modules/enrollment/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  student_id: Yup.number().required('É obrigatório selecionar um Aluno!'),
  plan_id: Yup.number().required('É obrigatório selecionar um Plano!'),
  start_date: Yup.date().required(
    'É obrigatório selecionar uma data de início'
  ),
});

export default function EditEnrollment({ match }) {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [enrollment, setEnrollment] = useState({});
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [studentId, setStudentId] = useState(0);
  const [planId, setPlanId] = useState(0);

  const { id } = match.params;

  useEffect(() => {
    async function loadEnrollment() {
      const response = await api.get(`/enrollment/${id}`);
      setEnrollment(response.data);
      setStudentId(enrollment.student_id);
      setPlanId(enrollment.plan_id);
      setPrice(enrollment.price);
    }

    loadEnrollment();
  }, [enrollment.plan_id, enrollment.price, enrollment.student_id, id]);

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
  }, []);

  useEffect(() => {
    if (plans) setPrice(1);
    // console.tron.log(enrollment);
  }, [enrollment, planId, plans]);

  // const price = useMemo(
  //   () =>
  //     planId && plans && ,
  //   [planId, plans]
  // );

  // const end_date = useMemo(
  //   () =>
  //     planId &&
  //     format(
  //       addMonths(new Date(startDate), plans[planId - 1].duration),
  //       "yyyy'-'MM'-'dd"
  //     ),
  //   [planId, plans, startDate]
  // );

  function handleSubmit(data) {
    console.tron.log({ ...data, id: 123 });
    // dispatch(updateEnrollmentRequest({ ...data, id }));
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
        <Input type="date" name="end_date" disabled />

        <label htmlFor="price">VALOR FINAL</label>
        <Input name="price" value={price} disabled />

        <button type="submit">Criar Matricula</button>
      </Form>
    </Container>
  );
}
