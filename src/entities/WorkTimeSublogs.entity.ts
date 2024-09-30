import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkTimeEntity } from './WorkTime.entity';

@Index('work_time_sublogs_pkey', ['log_id'], { unique: true })
@Entity('work_time_sublogs', { schema: 'public' })
export class WorkTimeSublogEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'log_id' })
    log_id!: number;

    @Column('text', { name: 'state' })
    state!: string;

    @Column('text', { name: 'latitude', nullable: true })
    latitude!: string | null;

    @Column('text', { name: 'longitude', nullable: true })
    longitude!: string | null;

    @Column('text', { name: 'timestamp' })
    timestamp!: Date;

    @ManyToOne(() => WorkTimeEntity, (workTime) => workTime.work_time_sublogs, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'time_id' })
    time!: WorkTimeEntity;
}
