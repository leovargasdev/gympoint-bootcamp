import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import { addMonths, format, parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { Container } from './styles';
import { newEnrollmentRequest } from '~/store/modules/enrollment/actions';
import api from '~/services/api';

const schema = Yup.object().shape({
  student_id: Yup.number().required('É obrigatório selecionar um Aluno!'),
  plan_id: Yup.number().required('É obrigatório selecionar um Plano!'),
  start_date: Yup.date().required(
    'É obrigatório selecionar uma data de início'
  ),
});

export default function NewEnrollment() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);

  const [plan, setPlan] = useState(0);
  const [price, setPrice] = useState(0);

  const [startDate, setStartDate] = useState(
    format(new Date(), "yyyy'-'MM'-'dd")
  );
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy'-'MM'-'dd"));

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
    loadFields();
  }, []);

  useMemo(() => {
    // eslint-disable-next-line
    const p = plans.find(e => e.id == plan);
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
    dispatch(newEnrollmentRequest(data));
  }

  return (
    <Container>
      <header>
        <strong>Cadastro de matrícula</strong>
        <div>
          <button type="button">VOLTAR</button>
          <button type="button">SALVAR</button>
        </div>
      </header>

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="student_id">ALUNO</label>
        <Select name="student_id" options={students} />

        <label htmlFor="plan_id">PLANO</label>
        <Select
          name="plan_id"
          options={plans}
          onChange={e => setPlan(e.target.value)}
        />

        <label htmlFor="start_date">DATA DE INÍCIO</label>
        <Input
          type="date"
          name="start_date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />

        <label htmlFor="end_date">DATA DE TÉRMINO</label>
        <Input type="date" name="end_date" value={endDate} disabled />

        <label htmlFor="price">VALOR FINAL</label>
        <Input name="price" value={price} disabled />

        <button type="submit">Criar Matricula</button>
      </Form>
    </Container>
  );
}
