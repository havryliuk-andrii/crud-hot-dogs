import React from 'react'
import {NavLink} from 'react-router-dom'

import s from '../css/HotDogsList.module.css'
import hotDogImg from '../assets/hotDogAnon.jpg'
import EmptyListScreen from './EmptyListScreen';

const HotDogsList = (props) =>{
    
    const {hotDogs} =props;
    
    const hotDogsList = hotDogs ? hotDogs.length>0? 
        <div id={s.list}>{hotDogs.map((hotDog)=>{
            return(
                <div key={hotDog.id} className={s.hotDogWrapper}>
                    <div className={s.hotDogImg}><img src={hotDog.img ||hotDogImg} alt={hotDog.name}/></div>
                    <div className={s.hotDogBody}>
                        <div className={s.name}>{hotDog.name}</div>
                        <div className={s.description}>{hotDog.description}</div>
                        <div className={s.info}>
                            <div className={s.ingredients}>{hotDog.ingredients.map((ingredient=>{
                                return (
                                <div className={s.ingredient} key={ingredient.id}>
                                    <div className={s.ingredientName}>{ingredient.name}</div>
                                    <div className={s.ingredientMass}>{ingredient.mass} g.</div>
                                </div>
                                )
                            }))}</div>
                            <div className={s.costPerMass}>
                                <div className={s.mass}>MASS: {hotDog.mass} g.</div>
                                <div className={s.cost}>COST: {hotDog.cost} $</div>
                            </div>
                        </div>
                    </div>
                    <div className={s.hotDogFooter}>
                        <NavLink className={s.editLink} to={`/edit/${hotDog.id}`}><button className={s.edit} onClick={()=>props.editHandler(hotDog.id)}>Edit</button></NavLink>
                        <button className={s.delete} onClick={()=>props.deleteHandler(hotDog.id)}>Delete</button>
                    </div>
                </div>
            );
        })}
        </div>
        : <EmptyListScreen /> 
        :null;
    return (
        <section id ="hotDogsList">
            {hotDogsList}
        </section>
    )
}

export default HotDogsList