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
import { PropertyEntity } from './Properties.entity';
import { RouteConfigEntity } from './RoutesConfig.entity';
import { RouteLogPropsEntity } from './RoutesLogsProps.entity';
import { RouteLogTagsEntity } from './RoutesLogsTags.entity';

@Index('fki_routes_logs_properties', ['property_id'], {})
@Index('routes_logs_pkey', ['route_log_id'], { unique: true })
@Index('fki_routes_logs_routes_times', ['time_id'], {})
@Entity('routes_logs', { schema: 'public' })
export class RouteLogEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'route_log_id' })
    route_log_id!: number;

    @Column('integer', { name: 'time_id' })
    time_id!: number;

    @Column('text', { name: 'start_ts' })
    start_ts!: Date;

    @Column('text', { name: 'end_ts' })
    end_ts!: Date;

    @Column('integer', { name: 'attempts_finished', default: 0 })
    attempts_finished!: number;

    @Column('integer', { name: 'attempts_total', default: 0 })
    attempts_total!: number;

    @Column('boolean', { name: 'done', default: false })
    done!: boolean;

    @Column('integer', { name: 'property_id' })
    property_id!: number;

    @Column('boolean', { name: 'noti_sended', default: false })
    noti_sended!: boolean;

    @ManyToOne(() => PropertyEntity, (properties) => properties.routes_logs, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'property_id' })
    property!: PropertyEntity;

    @ManyToOne(
        () => RouteConfigEntity,
        (routesConfig) => routesConfig.routes_logs,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'time_id' })
    time!: RouteConfigEntity;

    @OneToMany(
        () => RouteLogPropsEntity,
        (routesLogsProps) => routesLogsProps.route_log
    )
    routes_logs_props!: RouteLogPropsEntity[];

    @OneToMany(
        () => RouteLogTagsEntity,
        (routesLogsTags) => routesLogsTags.route_log
    )
    routes_logs_tags!: RouteLogTagsEntity[];
}
