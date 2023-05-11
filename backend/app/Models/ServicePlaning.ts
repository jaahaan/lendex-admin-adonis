import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Service from "./Service";

export default class ServicePlaning extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public service_id: number;

  @column()
  public type: string;

  @column()
  public price: string;

  @column()
  public facilities: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Service)
  public service: BelongsTo<typeof Service>;
}
