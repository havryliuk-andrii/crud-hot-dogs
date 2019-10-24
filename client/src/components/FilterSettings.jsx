import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { simpleField, createSimpleField } from '../forms/Fields'
import styled from 'styled-components'

import s from '../css/EditHotDog.module.css'
import { required, maxLength, number, string, minValue } from '../forms/validation';
import {optionalFiltration} from '../redux/api'
const maxLength20 = maxLength(20);
const minValue1 = minValue(1);

const createFilteredIngredientUI =(id,deleteIngredient)=>{
    return <div key ={id} className={s.ingredient}>

        {createSimpleField(`in${id}`,'text',"name",[required, maxLength20, string],s.ingredientName)}
        {createSimpleField(`im${id}`,'number',"min mass",[required, number, minValue1],s.ingredientMass)}

     <button onClick={()=>deleteIngredient(id)} className={s.delete} type="button" >Delete</button>

 </div>
}
const Ingredients = styled.div`
    span{
        display:block;
        font-size:.7rem;
        margin-bottom:.6rem;
}
`
const FilteredIngredients =(props)=>{ 
    const {ingredientsObjs,deleteIngredient} = {...props};
    const noFilteredIngredients = <div>No filtered ingredients</div>
    
    return <Ingredients className={s.ingredients}>

        <span>Ingredients:</span>
        
        {ingredientsObjs.length>0
        ?ingredientsObjs.map(ingObj=>{
            return createFilteredIngredientUI(ingObj.id,deleteIngredient)
        })
        :noFilteredIngredients}
        
    </Ingredients>
}

const MinMaxFields = styled.div`
    display:grid;
    gap: 1rem;
`
const MinMaxField = styled.div`
    display:grid;
    grid-template: 1fr / 1fr 1fr;
    gap: .5rem;
`

let FilterHotDogForm = (props) => {
    const [ingredientsObjs,setIngredientsObjs] = useState([]);
    const [maxId,setMaxId] = useState(0);
    
    const formSubmit = (values) => {
        optionalFiltration(values)
    }

    const AddNewIngredient = () => {
        const newIngObj = {id:maxId};
        const _ingsObjs = [...ingredientsObjs]; 
        _ingsObjs.push(newIngObj);
        setIngredientsObjs(_ingsObjs)
        setMaxId(c=>c+1);
    }
    const deleteIngredient = (id) => {
        setIngredientsObjs(ings=>ings.filter(ing=>ing.id!==id));
    }
    
    return (
        <form id={s.hotDogCreateForm} onSubmit={props.handleSubmit(formSubmit)}>

            {createSimpleField(`hotDogName`,'text',"Hot Dog Name",[maxLength20, string])}
            {createSimpleField(`countOfIngs`,'text',"Filter by ingredients count",[maxLength20, number])}

            <MinMaxFields>
                <MinMaxField>
                    {createSimpleField(`minCost`,'number',"min cost",[maxLength20, number])}
                    {createSimpleField(`maxCost`,'number',"max cost",[maxLength20, number])}
                </MinMaxField>

                <MinMaxField>
                    {createSimpleField(`minMass`,'number',"min mass",[maxLength20, number])}
                    {createSimpleField(`maxMass`,'number',"max mass",[maxLength20, number])}
                </MinMaxField>                
            </MinMaxFields>

            <FilteredIngredients ingredientsObjs={ingredientsObjs} deleteIngredient={deleteIngredient}/>

            <button onClick={AddNewIngredient} type="button" id={s.add}>Add</button> 

            <div className={s.formControls}>
                <button className={s.clearBtn} type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>Remove Changes</button>
                <button className={s.createBtn} type="submit" disabled={props.submitting}>SEARCH</button>
            </div>

        </form>
    )
}

FilterHotDogForm = reduxForm({ form: "FilterHotDogForm" })(FilterHotDogForm);

const FilterHotDog = (props) => {

    return (
        <div id={s.createHotDog}>
            <h1>Edit a hot dog to your taste!</h1>
            <div className={s.formWrapper}>
                <FilterHotDogForm />
            </div>
        </div>
    )
}

export default FilterHotDog