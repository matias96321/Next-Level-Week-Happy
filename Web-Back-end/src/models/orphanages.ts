import {Column,Entity,PrimaryGeneratedColumn,JoinColumn,OneToMany} from 'typeorm'
import './images'
import Images from './images';
import Image from './images';

@Entity('orphanages')
export default class Orphanege{
    
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string

    @Column()
    instructions: string

    @Column()
    opening_hours: string

    @Column()
    open_on_weekends: boolean

    @OneToMany(()=> Images, image => image.orphanege, {
        cascade:['update','insert']
    })
    @JoinColumn({name:'orphanage_id'})
    images: Images[]

}