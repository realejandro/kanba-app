import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface ClientAttributes {
    id: number,
    name: string,
    email: string,
    phoneNumber: string,
    description: string,
    clientType: 'Company' | 'Person',
    current: boolean 
}


export class Client extends Model<ClientAttributes, Optional<ClientAttributes, 'id' >>  implements ClientAttributes {
    public id !: number;
    public name !: string;
    public email !: string;
    public phoneNumber!: string;
    public description !: string;
    public clientType !: 'Company' | 'Person';
    public current !: boolean;
}

export function ClientFactory( sequelize:Sequelize ): typeof Client {
    Client.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement:true,
                primaryKey:true        
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phoneNumber:{
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            clientType:{
                type: DataTypes.ENUM('Company', 'Person'),
                allowNull: false,
                defaultValue: 'Company',
            },
            current:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            tableName: 'clients',
            sequelize,
            timestamps: true, // default is true, but you can make it explicit
        }
    )

    return Client
    
}