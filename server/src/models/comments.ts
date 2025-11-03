import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface CommentAttributes {
    id: number
    content: string,
    userId: number,
    ticketId: number,
    status: 'hidden' | 'visible',
}

type CommentCreationAttribute = Optional<CommentAttributes, 'id'>;

export class Comment extends Model<CommentAttributes, CommentCreationAttribute> implements CommentAttributes {
    public id !: number;
    public content !: string;
    public userId !: number;
    public ticketId !: number;
    public status !: 'hidden' | 'visible';
}


export function CommentFactory(sequelize: Sequelize): typeof Comment {
    
    Comment.init(
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey: true
            },
            content:{
                type: DataTypes.STRING,
                allowNull: false
            },
            userId:{
                type: DataTypes.INTEGER,
                allowNull:false
            },
            ticketId:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM('hidden', 'visible'),
                allowNull: false,
                defaultValue: 'visible',
            },
        },
        {
            tableName: 'comments',
            sequelize,
            timestamps: true, // default is true, but you can make it explicit
        }
    )

    return Comment
}