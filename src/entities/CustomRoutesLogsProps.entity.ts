import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomRoutesLogsEntity } from './CustomRoutesLogs.entity';

@Index('custom_routes_logs_props_pkey', ['logs_id'], { unique: true })
@Entity('custom_routes_logs_props', { schema: 'public' })
export class CustomRoutesLogsPropsEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'logs_id' })
    logs_id!: number;

    @Column('text', { name: 'type', nullable: true })
    type!: string | null;

    @Column('text', { name: 'longitude', nullable: true })
    longitude!: string | null;

    @Column('text', { name: 'latitude', nullable: true })
    latitude!: string | null;

    @Column('text', { name: 'timestamp' })
    timestamp!: Date;

    @ManyToOne(
        () => CustomRoutesLogsEntity,
        (customRoutesLogs) => customRoutesLogs.custom_routes_logs_props,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
    )
    @JoinColumn([
        {
            name: 'custom_route_log_id',
        },
    ])
    custom_route_log!: CustomRoutesLogsEntity;
}
