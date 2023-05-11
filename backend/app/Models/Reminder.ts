import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class Reminder extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;
  @column()
  public description: string;
  @column()
  public date: string;
  @column()
  public time: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
