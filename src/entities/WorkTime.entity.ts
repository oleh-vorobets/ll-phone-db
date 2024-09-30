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
import { WorkTimeSublogEntity } from './WorkTimeSublogs.entity';

@Index('work_time_pkey', ['time_id'], { unique: true })
@Entity('work_time', { schema: 'public' })
export class WorkTimeEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'time_id' })
    time_id!: number;

    @Column('text', { name: 'start_ts' })
    start_ts!: Date;

    @Column('text', { name: 'end_ts', nullable: true })
    end_ts!: Date | null;

    @Column('text', { name: 'start_longitude', nullable: true })
    start_longitude!: string | null;

    @Column('text', { name: 'start_latitude', nullable: true })
    start_latitude!: string | null;

    @Column('text', { name: 'end_longitude', nullable: true })
    end_longitude!: string | null;

    @Column('text', { name: 'end_latitude', nullable: true })
    end_latitude!: string | null;

    @Column('bigint', { name: 'pause_ms', nullable: true })
    pause_ms!: number | null;

    @Column('bigint', { name: 'work_ms', nullable: true })
    work_ms!: number | null;

    @Column('bigint', { name: 'total_ms', nullable: true })
    total_ms!: number | null;

    @ManyToOne(() => PropertyEntity, (properties) => properties.work_times, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'property_id' })
    property!: PropertyEntity;

    @OneToMany(
        () => WorkTimeSublogEntity,
        (workTimeSublogs) => workTimeSublogs.time
    )
    work_time_sublogs!: WorkTimeSublogEntity[];
}
