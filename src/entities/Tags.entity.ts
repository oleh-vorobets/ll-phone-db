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
import { RouteLogTagsEntity } from './RoutesLogsTags.entity';
import { RouteTagRelEntity } from './RoutesTagsRel.entity';
import { PropertyEntity } from './Properties.entity';

@Index('fki_tag_property', ['property_id'], {})
@Index('tag_id_key', ['tag_id'], { unique: true })
@Entity('tags', { schema: 'public' })
export class TagEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'tag_id' })
    tag_id!: number;

    @Column('text', { name: 'name' })
    name!: string;

    @Column('integer', { name: 'state', nullable: true, default: true })
    state!: number | null;

    @Column('text', { name: 'notes_intern', nullable: true })
    notes_intern!: string | null;

    @Column('text', { name: 'notes_user', nullable: true })
    notes_user!: string | null;

    @Column('text', { name: 'tag_chip_id', nullable: true })
    tag_chip_id!: string | null;

    @Column('integer', { name: 'property_id' })
    property_id!: number;

    @Column('integer', { name: 'archived', default: false })
    archived!: number;

    @Column('text', {
        name: 'chip_connected_at',
        nullable: true,
    })
    chip_connected_at!: Date | null;

    @OneToMany(() => RouteLogTagsEntity, (routesLogsTags) => routesLogsTags.tag)
    routes_logs_tags!: RouteLogTagsEntity[];

    @OneToMany(() => RouteTagRelEntity, (routesTagsRel) => routesTagsRel.tag)
    routes_tags_rels!: RouteTagRelEntity[];

    @ManyToOne(() => PropertyEntity, (properties) => properties.tags, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'property_id' })
    property!: PropertyEntity;
}
