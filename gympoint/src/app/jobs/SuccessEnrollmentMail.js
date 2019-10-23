import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SuccessEnrollmentMail {
  get key() {
    return 'SuccessEnrollmentMail';
  }

  async handle({ data }) {
    const { name, email } = data.student;
    const { title, price, start_date, end_date } = data.enrollment;
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Matricula Cadastrada',
      template: 'successEnrollment',
      context: {
        title,
        price,
        start_date: format(parseISO(start_date), "dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
        end_date: format(parseISO(end_date), "dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new SuccessEnrollmentMail();
