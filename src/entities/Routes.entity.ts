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
import { RouteTagRelEntity } from './RoutesTagsRel.entity';

@Index('fki_routes_property', ['property_id'], {})
@Index('route_primkey', ['route_id'], { unique: true })
@Entity('routes', { schema: 'public' })
export class RouteEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'route_id' })
    route_id!: number;

    @Column('integer', { name: 'property_id' })
    property_id!: number;

    @ManyToOne(() => PropertyEntity, (properties) => properties.routes, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'property_id' })
    property!: PropertyEntity;

    @OneToMany(() => RouteConfigEntity, (routesConfig) => routesConfig.route)
    routes_configs!: RouteConfigEntity[];

    @OneToMany(() => RouteTagRelEntity, (routesTagsRel) => routesTagsRel.route)
    routes_tags_rels!: RouteTagRelEntity[];
}
