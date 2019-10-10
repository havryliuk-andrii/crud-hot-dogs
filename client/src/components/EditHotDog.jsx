import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { simpleField } from '../forms/Fields'


import s from '../css/EditHotDog.module.css'
import { editHotDog } from '../redux/api';
import { required, maxLength, number, string, minValue } from '../forms/validation';

const maxLength20 = maxLength(20);
const minValue1 = minValue(1);

const Ingredient =({id,deleteIngredient,disableDelBtn})=>{
    return <div className={s.ingredient}>

       <Field className={s.ingredientName}
            name={`in${id}`}
            component={simpleField}
            type='text'
            placeholder="input ingredient"
            validate={[required, maxLength20, string]}
        />

        <Field className={s.ingredientMass}
            name={`im${id}`}
            component={simpleField}
            type='number'
            placeholder="mass"
            validate={[required, number, minValue1]}
        />

        {!disableDelBtn&&<button onClick={()=>deleteIngredient(id)} className={s.delete} type="button" >Delete</button>}

    </div>
}
const IngredientsList =(props)=>{     
    const ingredientsListUI = props.ingredients.map(ingr =>(
        <Ingredient id={ingr.id} key={ingr.id} deleteIngredient={props.deleteIngredient} disableDelBtn={props.disableDelBtn}/>
    ))
    return (
            <div className={s.ingredients}>
                {ingredientsListUI}
            </div>        
        );
}

let HotDogEditForm = (props) => {
    const formSubmit = (values) => {
        let _values ={...values};
        removedIds.forEach(remId=>{
            delete _values[`in${remId}`];
            delete _values[`im${remId}`];
        })
        editHotDog(_values,props.hotDogId);
    }
    
    let [maxId,setMaxId] = useState(Math.max(...props.ingredients.map(i=>i.id)));
    const [disableDelBtn, setDisableDelBtn] = useState(false);
    const [ingredientsList, setIngredientsList] = useState(props.ingredients)
    const [removedIds,setRemovedIds] = useState([]);

    const deleteIngredient=(id)=>{
        let _ings = [...ingredientsList];
        _ings=_ings.filter(ing=>ing.id!=id);
        if(_ings.length<2) setDisableDelBtn(true);
        setIngredientsList(_ings);
        
        let _remIds = [...removedIds];
        _remIds.push(id);
        console.log(_remIds);
        setRemovedIds(_remIds);

    }

    const AddNewIngredient =()=>{
        let _ings = [...ingredientsList];
        _ings.push({id:maxId+1,mass:0,name:""});
        setDisableDelBtn(false);
        setIngredientsList(_ings);
        setMaxId(max=>max+1);
    }

    return (
        <form id={s.hotDogCreateForm} onSubmit={props.handleSubmit(formSubmit)}>

            <Field name='hotDogName'
                component={simpleField}
                type='text'
                placeholder="input hot dog's name"
                errorPos='right'
                validate={[required, maxLength20, string]}
            />

            <Field name='description'
                component={simpleField}
                type='text'
                placeholder="input description"
                validate={[required, maxLength20, string]}
            />

            
            <IngredientsList ingredients = {ingredientsList} deleteIngredient ={deleteIngredient} disableDelBtn={disableDelBtn}/>
            
            <button onClick={AddNewIngredient} type="button" id={s.add}>Add</button>

            <div className={s.formControls}>
                <button className={s.clearBtn} type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>Remove Changes</button>
                <button className={s.createBtn} type="submit" disabled={props.submitting}>Save</button>
            </div>

        </form>
    )
}

HotDogEditForm = reduxForm({ form: "HotDogEditForm" })(HotDogEditForm);

const EditHotDog = (props) => {
    const { hotDog } = props;
    const ingredientMasses = hotDog.ingredients.map(i=>i.mass);
    const ingredientNames= hotDog.ingredients.map(i=>i.name);
    const ingredientsIds = hotDog.ingredients.map(i=>i.id);
    let initVals = {
        hotDogName: hotDog.name,
        description: hotDog.description,
    };
    for(let i =0;i<ingredientsIds.length;i++){
        initVals[`in${ingredientsIds[i]}`] = ingredientNames[i];
        initVals[`im${ingredientsIds[i]}`] = ingredientMasses[i];
    }
    return (
        <div id={s.createHotDog}>
            <h1>Edit a hot dog to your taste!</h1>
            <div className={s.formWrapper}>
                <HotDogEditForm initialValues={initVals} ingredients={hotDog.ingredients} hotDogId={hotDog.id} />
            </div>
        </div>
    )
}

export default EditHotDog