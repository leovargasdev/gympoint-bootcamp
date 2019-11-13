import React, { useState, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { Container } from './styles';
import { newPlanRequest } from '~/store/modules/plan/actions';

const schema = Yup.object().shape({
  title: Yup.string().required('O Titulo do plano é obrigatório'),
  duration: Yup.number().max(12, 'A duração máxima é de 12 meses'),
  price: Yup.string().required('O preço é obrigatório'),
});

export default function NewPlan() {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState('');

  const total = useMemo(() => Number(price.replace(',', '.')) * duration, [
    price,
    duration,
  ]);

  function handleSubmit(data) {
    dispatch(newPlanRequest(data));
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

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="title">Titulo do Plano</label>
        <Input name="title" placeholder="Nome do plano" />

        <label htmlFor="duration">Duração (em meses)</label>
        <Input
          name="duration"
          value={duration}
          onChange={e => setDuration(e.target.value)}
        />

        <label htmlFor="price">Preço Mensal</label>
        <Input
          name="price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <label htmlFor="total">Total</label>
        <Input name="total" value={total} disabled />

        <button type="submit">Criar Plano</button>
      </Form>
    </Container>
  );
}
