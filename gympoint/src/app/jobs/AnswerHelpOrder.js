import Mail from '../../lib/Mail';

class AnswerHelpOrder {
  get key() {
    return 'AnswerHelpOrder';
  }

  async handle({ data }) {
    const { name, email } = data.student;
    const { question, answer } = data.helpOrder;
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Resposta da solicitação de Ajuda',
      template: 'answerHelpOrder',
      context: {
        name,
        question,
        answer,
      },
    });
  }
}

export default new AnswerHelpOrder();
