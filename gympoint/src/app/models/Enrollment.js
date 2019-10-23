import Sequelize, { Model } from 'sequelize';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.INTEGER,
        dt_format: {
          type: Sequelize.VIRTUAL,
          get() {
            const start = format(this.start_date, "dd'/'MM'/'yyyy", {
              locale: pt,
            });
            const end = format(this.end_date, "dd'/'MM'/'yyyy", {
              locale: pt,
            });
            return `${start} até ${end}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default Enrollment;
