import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RouteEntity } from './Routes.entity';
import { TagEntity } from './Tags.entity';

@Index('routes_tags_rel_pkey', ['rel_id'], { unique: true })
@Index('fki_routes_tags_rel_routes', ['route_id'], {})
@Index('fki_routes_tags_rel_tags', ['tag_id'], {})
@Entity('routes_tags_rel', { schema: 'public' })
export class RouteTagRelEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'rel_id' })
    rel_id!: number;

    @Column('integer', { name: 'sequence' })
    sequence!: number;

    @Column('integer', { name: 'route_id' })
    route_id!: number;

    @Column('integer', { name: 'tag_id' })
    tag_id!: number;

    @Column('boolean', { name: 'duty', default: false })
    duty!: boolean;

    @ManyToOne(() => RouteEntity, (routes) => routes.routes_tags_rels, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'route_id' })
    route!: RouteEntity;

    @ManyToOne(() => TagEntity, (tags) => tags.routes_tags_rels, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'tag_id' })
    tag!: TagEntity;
}
