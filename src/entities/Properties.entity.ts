import {
    BaseEntity,
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomRoutesLogsEntity } from './CustomRoutesLogs.entity';
import { FileEntity } from './Files.entity';
import { IncidentLogEntity } from './IncidentLogs.entity';
import { RouteEntity } from './Routes.entity';
import { RouteLogEntity } from './RoutesLogs.entity';
import { TagEntity } from './Tags.entity';
import { WorkTimeEntity } from './WorkTime.entity';
import { PropertyPauseType, PropertyWTDisableOn } from '../types/property';

@Index('object_id_prkey', ['property_id'], { unique: true })
@Entity('properties', { schema: 'public' })
export class PropertyEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'property_id' })
    property_id!: number;

    @Column('text', { name: 'name' })
    name!: string;

    @Column('text', { name: 'notes', nullable: true })
    notes!: string | null;

    @Column('text', { name: 'region', nullable: true })
    region!: string | null;

    @Column('text', { name: 'street', nullable: true })
    street!: string | null;

    @Column('text', { name: 'postal_code', nullable: true })
    postal_code!: string | null;

    @Column('text', { name: 'city', nullable: true })
    city!: string | null;

    @Column('text', { name: 'house_number', nullable: true })
    house_number!: string | null;

    @Column('text', { name: 'country', nullable: true })
    country!: string | null;

    @Column('text', {
        name: 'timezone',
        default: 'Europe/Berlin',
    })
    timezone!: string;

    @Column('text', { name: 'archive_at', nullable: true })
    archive_at!: string | null;

    @Column('integer', { name: 'noti_incidents', default: false })
    noti_incidents!: number;

    @Column('integer', { name: 'noti_tags', default: false })
    noti_tags!: number;

    @Column('integer', { name: 'noti_routes', default: false })
    noti_routes!: number;

    @Column('integer', { name: 'show_routes', default: true })
    show_routes!: number;

    @Column('integer', { name: 'show_docs', default: false })
    show_docs!: number;

    @Column('integer', { name: 'show_task', default: true })
    show_task!: number;

    @Column('integer', { name: 'show_time', default: true })
    show_time!: number;

    @Column('integer', { name: 'show_incidents', default: true })
    show_incidents!: number;

    @Column('text', { name: 'wt_close_at', nullable: true })
    wt_close_at!: string | null;

    @Column('text', {
        name: 'wt_disable_on',
        default: '[]',
    })
    wt_disable_on!: PropertyWTDisableOn;

    @Column('text', {
        name: 'wt_pause',
        nullable: false,
        default: 'none',
    })
    wt_pause!: PropertyPauseType;

    @OneToMany(
        () => CustomRoutesLogsEntity,
        (customRoutesLogs) => customRoutesLogs.property,
        { nullable: false }
    )
    custom_routes_logs!: CustomRoutesLogsEntity[];

    @OneToMany(() => FileEntity, (files) => files.property)
    files!: FileEntity[];

    @OneToMany(() => IncidentLogEntity, (incidentLogs) => incidentLogs.property)
    incident_logs!: IncidentLogEntity[];

    @OneToMany(() => RouteEntity, (routes) => routes.property)
    routes!: RouteEntity[];

    @OneToMany(() => RouteLogEntity, (routesLogs) => routesLogs.property)
    routes_logs!: RouteLogEntity[];

    @OneToMany(() => TagEntity, (tags) => tags.property)
    tags!: TagEntity[];

    @OneToMany(() => WorkTimeEntity, (workTime) => workTime.property)
    work_times!: WorkTimeEntity[];
}
