import { Sequelize, DataTypes, Model } from "sequelize"
import { userModel } from "../schema/user"
import { employeModel } from "../schema/employe";
import { attendanceModel } from "../schema/attendance";
import { payrollModel } from "../schema/payroll";

const sequelize = new Sequelize(
    "hiree",//database name
    "root",//userName
    "36^5pCN#HlrQ",//password
    {
        dialect: "mysql",
        host: "localhost",
        logging: false
    }
)
const connection = async () => {
    try {
        await sequelize.authenticate();
        sequelize.sync({ alter: true }).then(() => console.log("re-sync done"))
        console.log('connection has been established successfully.');
    } catch (error) {
        console.log(`error occurred while establishing connection. Error:${error}`);

    }
}

connection();
const user = userModel(sequelize)
const employe = employeModel(sequelize, userModel(sequelize))
const attendance = attendanceModel(sequelize, employe)
const payroll = payrollModel(sequelize, employe)
const db = {
    sequelize,
    user,
    employe,
    attendance,
    payroll
}

export default db

