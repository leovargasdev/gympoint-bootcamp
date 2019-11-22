import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { useParams } from 'react-router-dom';
import { addMonths, format, parseISO } from 'date-fns';
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

export default function EditEnrollment() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { enrollment } = useSelector(state => state.enrollment);

  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);

  const [plan, setPlan] = useState(enrollment.plan_id);
  const [student, setStudent] = useState(enrollment.student_id);
  const [price, setPrice] = useState(enrollment.price);

  const [startDate, setStartDate] = useState(enrollment.start_date);
  const [endDate, setEndDate] = useState(enrollment.end_date);

  useEffect(() => {
    async function loadFields() {
      const responseP = await api.get('plans');
      setPlans(responseP.data);

      const responseS = await api.get('students');
      const result = responseS.data.map(e => {
        return {
          id: e.id,
          title: e.name,
        };
      });
      setStudents(result);
    }
    if (id !== enrollment.id) {
      dispatch(getEnrollmentRequest({ id }));
    }
    loadFields();
    // eslint-disable-next-line
  }, [id]);

  useMemo(() => {
    const p = plans.find(p => p.id == plan);
    if (p) {
      const { duration, price: priceP } = p;
      setEndDate(
        format(addMonths(parseISO(startDate), duration), 'yyyy-MM-dd')
      );
      setPrice(duration * priceP);
    }
    // eslint-disable-next-line
  }, [startDate, plan]);

  function handleSubmit(data) {
    dispatch(updateEnrollmentRequest({ ...data, id }));
  }

  return (
    <Container>
      <header>
        <strong>Editar matrícula teste</strong>
        <div>
          <button type="button">VOLTAR</button>
          <button type="button">SALVAR</button>
        </div>
      </header>

      <Form schema={schema} initialData={enrollment} onSubmit={handleSubmit}>
        <label htmlFor="student_id">ALUNO</label>
        <Select
          value={student}
          name="student_id"
          options={students}
          onChange={e => setStudent(e.target.value)}
        />

        <label htmlFor="plan_id">PLANO</label>
        <Select
          value={plan}
          name="plan_id"
          options={plans}
          onChange={e => setPlan(e.target.value)}
        />

        <label htmlFor="start_date">DATA DE INÍCIO</label>
        <Input
          type="date"
          name="start_date"
          onChange={e => setStartDate(e.target.value)}
        />

        <label htmlFor="end_date">DATA DE TÉRMINO</label>
        <Input type="date" value={endDate} name="end_date" disabled />

        <label htmlFor="price">VALOR FINAL</label>
        <Input name="price" value={price} disabled />

        <button type="submit">Atualizar Matricula</button>
      </Form>
    </Container>
  );
}
