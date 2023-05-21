import { DataTypes, ModelDefined, Sequelize } from "sequelize"

interface employeSchema {
    employeId: string,
    userFK: string,
    salary: number,
    employeRole: string,
    employmentStatus: string,
    DOJ: Date,
    address: string
}

export const employeModel = (sequelize: Sequelize, userModel: ModelDefined<any, any>) => {
    const employee: ModelDefined<employeSchema, {}> = sequelize.define('employe', {
        employeId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userFK: {
            type: DataTypes.UUID,
            references: {
                model: userModel,
                key: "userId"
            }
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        employeRole: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employmentStatus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DOJ: {
            type: DataTypes.DATE,
            allowNull: false,

        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: false,
        }
    )
    employee.belongsTo(userModel, { foreignKey: "userFK" })
    userModel.hasOne(userModel, { foreignKey: "userFK" })
    return employee
}