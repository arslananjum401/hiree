import { Sequelize, ModelDefined, DataTypes, Optional } from "sequelize";
interface userSchema {
    userId: string,
    email: string,
    username: string,
    imgUrl: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    gender: "male" | "female",
    role: string,
    DOB: Date
}
type NoteCreationAttributes = Optional<userSchema, 'firstName' | 'email'>;

// interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
//     // Some fields are optional when calling UserModel.create() or UserModel.build()
//     id: CreationOptional<number>;
//     name: string;
// }

export const userModel = (sequelize: Sequelize) => {
    const user: ModelDefined<userSchema, {}> = sequelize.define("user", {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        // imgUrl: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DOB: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: false,
        }
    )

    return user
}