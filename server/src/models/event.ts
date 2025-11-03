import { DataTypes, Model, Optional, Sequelize } from "sequelize";


interface EventAttributes {
    id: number,
    title: string,
    notes: string,
    start: Date,
    end: Date,
}

export class Event extends Model<EventAttributes, {}> implements EventAttributes {
   public id!: number;
   public title!: string;
   public notes!: string;
   public start!: Date; 
   public end!: Date;

}

export function EventFactory(sequelize: Sequelize): typeof Event {
    
    Event.init(
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey: true
            },
            title:{
                type: DataTypes.STRING,
                allowNull: false
            },
            notes:{
                type: DataTypes.STRING,
                allowNull:false
            },
            start:{
                type: DataTypes.DATE,
                allowNull: false
            },
            end: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        },
        {
            tableName: "events",
            sequelize,
            timestamps: true
        }
    )

    return Event

}