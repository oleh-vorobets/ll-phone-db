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
import { TagEntity } from './Tags.entity';

@Index('routes_logs_tags_pkey', ['logs_id'], { unique: true })
@Index('fki_routes_logs_tags', ['route_log_id'], {})
@Index('fki_routes_logs_tags_tags', ['tag_id'], {})
@Entity('routes_logs_tags', { schema: 'public' })
export class RouteLogTagsEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'logs_id' })
    logs_id!: number;

    @Column('text', { name: 'type' })
    type!: string;

    @Column('integer', { name: 'tag_id' })
    tag_id!: number;

    @Column('text', { name: 'img', nullable: true })
    img!: string | null;

    @Column('text', { name: 'longitude', nullable: true })
    longitude!: string | null;

    @Column('text', { name: 'latitude', nullable: true })
    latitude!: string | null;

    @Column('text', { name: 'timestamp' })
    timestamp!: Date;

    @Column('integer', { name: 'route_log_id' })
    route_log_id!: number;

    @ManyToOne(
        () => RouteLogEntity,
        (routesLogs) => routesLogs.routes_logs_tags,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'route_log_id' })
    route_log!: RouteLogEntity;

    @ManyToOne(() => TagEntity, (tags) => tags.routes_logs_tags, {
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
    })
    @JoinColumn({ name: 'tag_id' })
    tag!: TagEntity;
}
