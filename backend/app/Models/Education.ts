import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class Education extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: string;

  @column()
  public institute: string;

  @column()
  public degree: string;

  @column()
  public fieldOfStudy: string;
  @column()
  public start_date: string;
  @column()
  public end_date: string;
  @column()
  public description: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
