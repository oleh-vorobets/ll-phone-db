import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RouteLogEntity } from './RoutesLogs.entity';

@Index('analytics_logs_pkey', ['logs_id'], { unique: true })
@Index('fki_routes_logs_props', ['route_log_id'], {})
@Entity('routes_logs_props', { schema: 'public' })
export class RouteLogPropsEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'logs_id' })
    logs_id!: number;

    @Column('text', { name: 'type' })
    type!: string;

    @Column('integer', { name: 'route_log_id' })
    route_log_id!: number;

    @Column('text', { name: 'timestamp' })
    timestamp!: Date;

    @Column('text', { name: 'longitude', nullable: true })
    longitude!: string | null;

    @Column('text', { name: 'latitude', nullable: true })
    latitude!: string | null;

    @Column('text', { name: 'msg', nullable: true })
    msg!: string | null;

    @ManyToOne(
        () => RouteLogEntity,
        (routesLogs) => routesLogs.routes_logs_props,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'route_log_id' })
    route_log!: RouteLogEntity;
}
