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
import { CustomRoutesLogsPropsEntity } from './CustomRoutesLogsProps.entity';
import { CustomRoutesLogsTagsEntity } from './CustomRoutesLogsTags.entity';

@Index('custom_routes_logs_pkey', ['custom_route_log_id'], { unique: true })
@Entity('custom_routes_logs', { schema: 'public' })
export class CustomRoutesLogsEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'custom_route_log_id' })
    custom_route_log_id!: number;

    @Column('text', { name: 'start_ts' })
    start_ts!: Date;

    @Column('text', { name: 'end_ts', nullable: true })
    end_ts!: Date | null;

    @Column('text', { name: 'device_id' })
    device_id!: string;

    @ManyToOne(
        () => PropertyEntity,
        (properties) => properties.custom_routes_logs,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            nullable: false,
        }
    )
    @JoinColumn({ name: 'property_id' })
    property!: PropertyEntity;

    @OneToMany(
        () => CustomRoutesLogsPropsEntity,
        (customRoutesLogsProps) => customRoutesLogsProps.custom_route_log
    )
    custom_routes_logs_props!: CustomRoutesLogsPropsEntity[];

    @OneToMany(
        () => CustomRoutesLogsTagsEntity,
        (customRoutesLogsTags) => customRoutesLogsTags.custom_route_log
    )
    custom_routes_logs_tags!: CustomRoutesLogsTagsEntity[];
}
