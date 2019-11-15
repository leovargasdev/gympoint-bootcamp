import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import api from '~/services/api';
import { Container } from './styles';
import { updatePlanRequest } from '~/store/modules/plan/actions';

const schema = Yup.object().shape({
  title: Yup.string().required('O Titulo do plano é obrigatório'),
  duration: Yup.number().max(12, 'A duração máxima é de 12 meses'),
  price: Yup.string().required('O preço é obrigatório'),
});

export default function EditPlan(props) {
  const dispatch = useDispatch();
  const [plan, setPlan] = useState({});
  const { id } = props.match.params;

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get(`/plan/${id[0]}`);
      setPlan(response.data);
    }

    loadPlan();
  }, [id]);

  const [duration, setDuration] = useState(plan.duration);
  const [price, setPrice] = useState(plan.price);
  const [total, setTotal] = useState(plan.total);

  useEffect(() => {
    setTotal((Number(price) * duration).toFixed(2));
  }, [price, duration]);

  function handleSubmit(data) {
    dispatch(updatePlanRequest({ ...data, id }));
  }

  return (
    <Container>
      <header>
        <strong>Cadastro de plano</strong>
        <div>
          <button type="button">VOLTAR</button>
          <button type="button">SALVAR</button>
        </div>
      </header>

      <Form schema={schema} initialData={plan} onSubmit={handleSubmit}>
        <label htmlFor="title">Titulo do Plano</label>
        <Input name="title" placeholder="Nome do plano" />

        <label htmlFor="duration">Duração (em meses)</label>
        <Input name="duration" onChange={e => setDuration(e.target.value)} />

        <label htmlFor="price">Preço Mensal</label>
        <Input
          name="price"
          onChange={e => setPrice(e.target.value.replace(',', '.'))}
        />

        <label htmlFor="total">Total</label>
        <Input name="total" value={total} disabled />

        <button type="submit">Criar Plano</button>
      </Form>
    </Container>
  );
}
