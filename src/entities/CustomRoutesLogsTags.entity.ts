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

@Index('custom_routes_logs_tags_pkey', ['logs_id'], { unique: true })
@Entity('custom_routes_logs_tags', { schema: 'public' })
export class CustomRoutesLogsTagsEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'logs_id' })
    logs_id!: number;

    @Column('text', { name: 'type' })
    type!: string;

    @Column('text', { name: 'timestamp' })
    timestamp!: Date;

    @Column('integer', { name: 'tag_id', nullable: true })
    tag_id!: number | null;

    @Column('text', { name: 'longitude', nullable: true })
    longitude!: string | null;

    @Column('text', { name: 'latitude', nullable: true })
    latitude!: string | null;

    @ManyToOne(
        () => CustomRoutesLogsEntity,
        (customRoutesLogs) => customRoutesLogs.custom_routes_logs_tags,
        { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
    )
    @JoinColumn([
        {
            name: 'custom_route_log_id',
        },
    ])
    custom_route_log!: CustomRoutesLogsEntity;
}
