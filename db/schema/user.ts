import { Sequelize, ModelDefined, DataTypes, Optional } from "sequelize";
export interface userSchema {
    userId: string,
    email: string,
    username: string,
    imgUrl: string,
    firstName: string,
    lastName: string,
    countryCode: string,
    phoneNumber: string,
    gender: "male" | "female",
    role: string,
    DOB: Date,
    password: string
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
        },
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },

        countryCode: {
            type: DataTypes.STRING,
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        gender: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
        },
        DOB: {
            type: DataTypes.DATE,
        }
    },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: false,
            indexes: [
                {
                    unique: true,
                    fields: ['email', "username"]
                }
            ]
        }
    )

    return user
}