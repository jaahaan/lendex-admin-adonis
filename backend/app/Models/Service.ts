import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public parent_id: number;

  @column()
  public icon: string;

  @column()
  public title: string;

  @column()
  public order_no: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
