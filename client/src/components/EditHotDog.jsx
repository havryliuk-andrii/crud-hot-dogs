import React, { useState,useReducer } from 'react'
import { Field, reduxForm } from 'redux-form'
import { simpleField } from '../forms/Fields'


import s from '../css/EditHotDog.module.css'
import { editHotDog } from '../redux/api';
import { required, maxLength, number, string, minValue } from '../forms/validation';

const maxLength20 = maxLength(20);
const minValue1 = minValue(1);

const Ingredients = ({ings}) => {
    console.log("---Ingredients---")
    const delFunc = (id) =>{
        if(state.count==1){
            dispatch({type:"DISABLE_BTN"});
        }
        dispatch({type:"DELETE_INGREDIENT",payload:{
                id:id
            }
        });
    }
    const initState = { 
        count: ings.length,
        ingredients:ings,
        isBtnDisable:false
    };
    const reducer = (state, action) => {
        switch (action.type) {
            case 'inc':
                return {...state, count:state.count+1};
            case 'dec':
                return {...state, count:state.count-1};
            case 'DISABLE_BTN':
                return {...state, isBtnDisable:true};
            case 'DELETE_INGREDIENT':
                return {...state, count:--state.count, ingredients:[...state.ingredients.filter(i=>i.id!=action.payload.id)]};
            default:
                throw new Error();
        }
    }
    const [state,dispatch] = useReducer(reducer,initState);
    
    
    return (
        ings.map(i=>{
            return <Ingredient key={i.id} id={i.id} isBtnDisable={state.isBtnDisable} delFunc={delFunc}/>
        })
    );
}

const Ingredient = ({id,btnDisable,delFunc}) => {
    return (
    <div className={s.ingredient} key={id}>
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

        {!btnDisable&&<button className={s.delete} type="button" onClick={()=>delFunc(id)}>Delete</button>}

    </div>)
}

let HotDogEditForm = (props) => {
    console.log("---HotDogEditForm---")
    const [removedIds,removeId] = useState([]);
    
    const ingsIds = props.ingredients.map((i) => i.id); 
    const initIngredientsId = Math.max(...ingsIds);
    let [ingredientId, setIngredientId] = useState(initIngredientsId);
        
    const formSubmit = (values) => {
        removedIds.forEach(id=>{
            delete values[`im${id}`];
            delete values[`in${id}`];
        })
        editHotDog(values,props.hotDogId);
    }

    const addIngredient = ()=>{
        setIngredientId(++ingredientId);
        // setIngredients([...ingredients,ingredient(ingredientId)]);
        // dispatch({type:"inc"})
    };

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

            <Ingredients ings={props.ingredients} />

            <button onClick={addIngredient} type="button" id={s.add}>Add</button>

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