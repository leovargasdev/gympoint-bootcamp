import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.DOUBLE,
        total: {
          type: Sequelize.VIRTUAL,
          get() {
            return Number((this.price * this.duration).toFixed(2));
          },
        },
      },
      {
        sequelize,
      }
    );
  }
}

export default Plan;
