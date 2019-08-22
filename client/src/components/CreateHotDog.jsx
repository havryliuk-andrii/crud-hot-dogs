import React, {useState} from 'react'
import { Field, reduxForm } from 'redux-form'
import {simpleField} from '../forms/Fields'

import s from '../css/CreateHotDog.module.css'
import { addHotDog } from '../redux/api';
import { required, maxLength, number, string, minValue } from '../forms/validation';

const maxLength20 = maxLength(20);
const minValue1= minValue(1);

let HotDogCreateForm=(props)=>{

    const ingredient=(id)=>(
        <div className={s.ingredient}>

            <Field className={s.ingredientName} 
                   name={`in${id}`} 
                   component ={simpleField} 
                   type = 'text' 
                   placeholder="input ingredient"
                   validate={[required,maxLength20,string]}
            />

            <Field className={s.ingredientMass} 
                   name={`im${id}`} 
                   component ={simpleField} 
                   type = 'number' 
                   placeholder="mass"
                   validate={[required,number,minValue1]}
            />

        </div>
    )

    let[ingredientId,setIngredientId]=useState(0);
    let [ingredients,setIngredients] = useState([ingredient(ingredientId)]);

    const addIngredient=()=>{
        setIngredientId(++ingredientId);
        setIngredients(ingredients=>[...ingredients,ingredient(ingredientId)])
    };

    const formSubmit=(values)=>{
       addHotDog(values);
    }

    
    
    return(
        <form id={s.hotDogCreateForm} onSubmit={props.handleSubmit(formSubmit)}>

            <Field name='hotDogName' 
                   component ={simpleField} 
                   type = 'text'
                   placeholder="input hot dog's name"
                   errorPos='right'
                   validate={[required,maxLength20,string]}
            />

            <Field name='description' 
                   component ={simpleField} 
                   type = 'text' 
                   placeholder="input description" 
                   validate={[required,maxLength20,string]}
            />

            <div className={s.ingredients}>
                {ingredients}
            </div>

            <button onClick={addIngredient} type="button" id={s.add}>Add</button>

            <div className={s.formControls}>
                <button className={s.clearBtn} type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>Clear</button>
                <button className={s.createBtn} type="submit" disabled ={props.submitting}>Create</button>
            </div>

        </form>
    )
}

HotDogCreateForm = reduxForm({form:"HotDogCreateForm"})(HotDogCreateForm);

const CreateHotDog = (props) =>{
    return (
        <div id={s.createHotDog}>
            <h1>Make a hot dog to your taste!</h1>
              <div className={s.formWrapper}>
                <HotDogCreateForm />
              </div>
        </div>
    )
}

export default CreateHotDog