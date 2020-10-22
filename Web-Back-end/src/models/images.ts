import {Column,Entity,PrimaryGeneratedColumn, ManyToOne,JoinColumn} from 'typeorm'
import Orphanege from './orphanages'


@Entity()
export default class Images{

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    path: string

    @ManyToOne(() => Orphanege, orphange => orphange.images)
    @JoinColumn({name: 'orphanage_id'})
    orphanege: Orphanege
}