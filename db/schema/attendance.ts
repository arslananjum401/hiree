import { DataTypes, ModelDefined, Sequelize } from "sequelize";

interface attendanceSchema {
    attendanceId: string,
    employeFK: string,
    date: Date,
    attendanceStatus: "Present" | "Absent" | "Leave",
    timeIn: Date,
    timeOut: Date,
    overTimeHrs: number,
    notes: string
}

export const attendanceModel = (sequelize: Sequelize, employeeModel: ModelDefined<any, any>) => {
    const attendance: ModelDefined<attendanceSchema, {}> = sequelize.define("attendance", {
        attendanceId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        employeFK: {
            type: DataTypes.UUID,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        attendanceStatus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timeIn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        timeOut: {
            type: DataTypes.DATE,
            allowNull: false
        },
        overTimeHrs: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        notes: {
            type: DataTypes.STRING(1000)
        }
    },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: false,
        }
    )


    attendance.belongsTo(employeeModel, { foreignKey: "employeFK" })
    employeeModel.hasMany(attendance, { foreignKey: "employeFK" })

    return attendance
}