import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IPoint {
  type: 'Point';
  coordinates: [number, number];
}

@Entity()
export class Store {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  lat: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  lng: number;

  @Column({
    type: 'point',
    spatialFeatureType: 'Point',
    srid: 5181,
    nullable: true,
  })
  latlng: IPoint;
}
