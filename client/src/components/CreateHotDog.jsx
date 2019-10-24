import React, {useState} from 'react'
import { Field, reduxForm } from 'redux-form'

import { simpleField, createSimpleField } from '../forms/Fields'
import s from '../css/CreateHotDog.module.css'
import { addHotDog } from '../redux/api';
import { required, maxLength, number, string, minValue } from '../forms/validation';
const maxLength20 = maxLength(20);
const minValue1= minValue(1);

const UploadFile = ({ input: {value: omitValue, ...inputProps }, meta: omitMeta, ...props }) => (
    <input type='file' {...inputProps} {...props} />
  );

let HotDogCreateForm=(props)=>{

    const ingredient=(id)=>(
        <div className={s.ingredient} key ={id}>
            {createSimpleField(`in${id}`,'text',"input ingredient",[required,maxLength20,string],s.ingredientName)}
            {createSimpleField(`im${id}`,'number',"mass",[required,number,minValue1],s.ingredientMass)}
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
            {createSimpleField(`hotDogName`,'text',"input hot dog's name",[required,maxLength20,string])}
            {createSimpleField(`description`,'text',"input description",[required,maxLength20,string])}

            <Field component={UploadFile} name='image' accept='.jpg' />

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