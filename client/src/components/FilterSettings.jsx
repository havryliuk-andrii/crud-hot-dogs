import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { simpleField } from '../forms/Fields'


import s from '../css/EditHotDog.module.css'
import { required, maxLength, number, string, minValue } from '../forms/validation';
const maxLength20 = maxLength(20);

let FilterHotDogForm = (props) => {
    const formSubmit = (values) => {
        
    }
    
    return (
        <form id={s.hotDogCreateForm} onSubmit={props.handleSubmit(formSubmit)}>

            <Field name='hotDogName'
                component={simpleField}
                type='text'
                placeholder="Filter by name"
                errorPos='right'
                validate={[required, maxLength20, string]}
            />

            <Field name='description'
                component={simpleField}
                type='text'
                placeholder="Filter by ingredients"
                validate={[required, maxLength20, string]}
            />
            
            {/* <button onClick={AddNewIngredient} type="button" id={s.add}>Add</button> */}

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