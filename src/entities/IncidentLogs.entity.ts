import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyEntity } from './Properties.entity';

@Index('incident_logs_pkey', ['logs_id'], { unique: true })
@Index('fki_incident_logs_properties', ['property_id'], {})
@Entity('incident_logs', { schema: 'public' })
export class IncidentLogEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'logs_id' })
    logs_id!: number;

    @Column('text', {
        name: 'path',
        nullable: true,
        default: '[]',
    })
    path!: string[] | null;

    @Column('text', { name: 'text', nullable: true })
    text!: string | null;

    @Column('text', { name: 'timestamp', nullable: false })
    timestamp!: Date;

    @Column('text', { name: 'longitude', nullable: true })
    longitude!: string | null;

    @Column('text', { name: 'latitude', nullable: true })
    latitude!: string | null;

    @Column('integer', { name: 'property_id', nullable: false })
    property_id!: number;

    @ManyToOne(() => PropertyEntity, (properties) => properties.incident_logs, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'property_id', referencedColumnName: 'property_id' })
    property!: PropertyEntity;
}
