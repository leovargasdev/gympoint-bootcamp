import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CreateHelpOrderMail {
  get key() {
    return 'CreateHelpOrderMail';
  }

  async handle({ data }) {
    const { name, email } = data.student;
    const { question, createdAt } = data.helpOrder;
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Solicitação de Auxílio',
      template: 'createHelpOrder',
      context: {
        name,
        question,
        createdAt: format(
          parseISO(createdAt),
          "'às' H:mm'h' 'do dia' dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CreateHelpOrderMail();
