import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { simpleField } from '../forms/Fields'
import styled from 'styled-components'

import s from '../css/EditHotDog.module.css'
import { required, maxLength, number, string, minValue } from '../forms/validation';
const maxLength20 = maxLength(20);
const minValue1 = minValue(1);

const createFilteredIngredientUI =(id,deleteIngredient)=>{
    return <div key ={id} className={s.ingredient}>

    <Field className={s.ingredientName}
         name={`in${id}`}
         component={simpleField}
         type='text'
         placeholder="name"
         validate={[required, maxLength20, string]}
     />

     <Field className={s.ingredientMass}
         name={`im${id}`}
         component={simpleField}
         type='number'
         placeholder="minm ass"
         validate={[required, number, minValue1]}
     />

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

let FilterHotDogForm = (props) => {
    const [ingredientsObjs,setIngredientsObjs] = useState([]);
    const [maxId,setMaxId] = useState(0);
    const formSubmit = (values) => {
        
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

            <Field name='hotDogName'
                component={simpleField}
                type='text'
                placeholder="Hot Dog Name"
                errorPos='right'
                validate={[maxLength20, string]}
            />

            <Field name='ingredientsCount'
                component={simpleField}
                type='text'
                placeholder="Filter by ingredients count"
                validate={[maxLength20, number]}
            />

            <FilteredIngredients 
                ingredientsObjs={ingredientsObjs} 
                deleteIngredient={deleteIngredient}/>

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