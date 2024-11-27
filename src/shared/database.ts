import { Sequelize } from "sequelize";

// Inicialização para SQLite
export const sequelize = new Sequelize({
    dialect: 'sqlite', // Troque de 'mysql' para 'sqlite'
    storage: 'database.sqlite', // Defina o arquivo SQLite
    logging: false // (Opcional) Desativa logs de SQL no console
});

export default sequelize;
