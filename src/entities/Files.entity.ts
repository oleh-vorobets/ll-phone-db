import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PropertyEntity } from './Properties.entity';

@Index('files_pkey', ['file_id'], { unique: true })
@Entity('files', { schema: 'public' })
export class FileEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'file_id' })
    file_id!: number;

    @Column('text', { name: 'title', nullable: true })
    title!: string | null;

    @Column('text', { name: 'timestamp', nullable: true })
    timestamp!: Date | null;

    @Column('text', { name: 'type' })
    type!: string;

    @Column('text', { name: 'preview_path', nullable: true })
    preview_path!: string | null;

    @Column('text', { name: 'path', nullable: true })
    path!: string | null;

    @ManyToOne(() => PropertyEntity, (properties) => properties.files, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'property_id' })
    property!: PropertyEntity | null;
}
