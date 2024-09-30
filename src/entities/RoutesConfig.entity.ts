import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RouteEntity } from './Routes.entity';
import { RouteLogEntity } from './RoutesLogs.entity';

@Index('fki_routes_times_routes', ['route_id'], {})
@Index('routes_times_pkey', ['time_id'], { unique: true })
@Entity('routes_config', { schema: 'public' })
export class RouteConfigEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'time_id' })
    time_id!: number;

    @Column('integer', { name: 'route_id' })
    route_id!: number;

    @Column('text', { name: 'first_run' })
    first_run!: Date;

    @Column('text', { name: 'last_run', nullable: true })
    last_run!: Date | null;

    @Column('text', { name: 'start_time' })
    start_time!: string;

    @Column('integer', { name: 'duration_run' })
    duration_run!: number;

    @Column('integer', { name: 'frequency', default: 1 })
    frequency!: number;

    @Column('text', { name: 'repeat_type' })
    repeat_type!: string;

    @Column('integer', { name: 'weekdays', array: true })
    weekdays!: number[];

    @Column('integer', { name: 'monthdays', array: true })
    monthdays!: number[];

    @Column('text', { name: 'type_freedays' })
    type_freedays!: string;

    @Column('text', { name: 'name' })
    name!: string;

    @Column('text', {
        name: 'notes_user',
        nullable: true,
    })
    notes_user!: string | null;

    @Column('text', {
        name: 'notes_intern',
        nullable: true,
    })
    notes_intern!: string | null;

    @Column('integer', { name: 'repeat_frequency', default: 1 })
    repeat_frequency!: number;

    @ManyToOne(() => RouteEntity, (routes) => routes.routes_configs, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'route_id' })
    route!: RouteEntity;

    @OneToMany(() => RouteLogEntity, (routesLogs) => routesLogs.time)
    routes_logs!: RouteLogEntity[];
}
