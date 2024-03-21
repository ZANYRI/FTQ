import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', '3183', {
  host: 'localhost',
  dialect: 'postgres'
});

const Candidate = sequelize.define('Candidate', {
  flmname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  linkVK: {
    type: DataTypes.TEXT
  },
  education: {
    type: DataTypes.TEXT
  },
  phoneNumber: {
    type: DataTypes.TEXT
  }
});

Candidate.sync();

export { sequelize, Candidate };
