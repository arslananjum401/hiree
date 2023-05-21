import { DataTypes, Model, ModelDefined, Sequelize } from "sequelize";

interface payrollSchema {
    payrollId: string,
    employeFK: string,
    totalOvertimeHrs: number,
    grossPay: number,
    taxesWithheld: number,
    netPay: number,
    payDate: Date,
    payrollTaxes: number,
}

export const payrollModel = (sequelize: Sequelize, employeeModel: ModelDefined<any, any>) => {
    const payroll: ModelDefined<payrollSchema, {}> = sequelize.define("payroll", {
        payrollId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        employeFK: {
            type: DataTypes.UUID,
            references: {
                model: employeeModel,
                key: "employeId"
            }
        },
        totalOvertimeHrs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        grossPay: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        netPay: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        payDate: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        payrollTaxes: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    payroll.belongsTo(employeeModel, { foreignKey: "employeFK" })
    employeeModel.hasMany(payroll, { foreignKey: "employeFK" })
    return payroll
}