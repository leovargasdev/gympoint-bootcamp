import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';

import { Container } from './styles';
import api from '~/services/api';
import { updateStudentRequest } from '~/store/modules/student/actions';

export default function EditStudent(props) {
  const dispatch = useDispatch();
  const [student, setStudent] = useState({});
  const idStudent = useState(props.match.params.id);

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`/student/${idStudent[0]}`);

      setStudent(response.data);
    }

    loadStudent();
  }, [idStudent, props.match.params]);

  function handleSubmit(data) {
    dispatch(updateStudentRequest({ ...data, id: idStudent[0] }));
  }

  return (
    <Container>
      <header>
        <strong>Edição de aluno</strong>
        <div>
          <button type="button">VOLTAR</button>
          <button type="button">SALVAR</button>
        </div>
      </header>

      <Form initialData={student} onSubmit={handleSubmit}>
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

        <button type="submit">Criar estudante</button>
      </Form>
    </Container>
  );
}
