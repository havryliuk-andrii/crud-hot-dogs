import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { simpleField } from '../forms/Fields'


import s from '../css/EditHotDog.module.css'
import { editHotDog } from '../redux/api';
import { required, maxLength, number, string, minValue } from '../forms/validation';

const maxLength20 = maxLength(20);
const minValue1 = minValue(1);

let HotDogEditForm = (props) => {
    const ingredient = (id) => (
        <div className={s.ingredient}>

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

            {/* <button className={s.delete} type="button" onClick={}>Delete</button> */}

        </div>
    )
    const initIngredients = props.ingredients.map((i) => ingredient(i.id))
    const initIngredientsId = Math.max(props.ingredients.map((i) => i.id));
    let [ingredientId, setIngredientId] = useState(initIngredientsId);
    let [ingredients, setIngredients] = useState(initIngredients);

    const formSubmit = (values) => {
        editHotDog(values,props.hotDogId);
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

            <div className={s.ingredients}>
                {ingredients}
            </div>

            {/* <button onClick={addIngredient} type="button" id={s.add}>Add</button> */}

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