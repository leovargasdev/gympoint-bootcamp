import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { Container } from './styles';
import { newStudentRequest } from '~/store/modules/student/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome do aluno é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number().min(14, 'A idade mínima é 14 anos'),
  height: Yup.string().required('A Altura é obrigatória'),
  weight: Yup.string().required('O peso é obrigatório'),
});

export default function NewStudent() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(newStudentRequest(data));
  }

  return (
    <Container>
      <header>
        <strong>Cadastro de aluno</strong>
        <div>
          <button type="button">VOLTAR</button>
          <button type="button">SALVAR</button>
        </div>
      </header>

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="name">Nome Completo</label>
        <Input name="name" placeholder="Fulano da Silva" />

        <label htmlFor="email">Endereço de e-mail</label>
        <Input type="email" name="email" placeholder="fulano@email.com" />

        <label htmlFor="age">Idade</label>
        <Input type="number" name="age" defaultValue={0} />

        <label htmlFor="height">PESO(em kg)</label>
        <Input name="height" placeholder="60 kg" />

        <label htmlFor="weight">Altura</label>
        <Input name="weight" placeholder="1,90" />

        <button type="submit">Criar Aluno</button>
      </Form>
    </Container>
  );
}
