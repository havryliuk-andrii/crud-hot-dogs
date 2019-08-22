import React from 'react'
import { connect } from 'react-redux';

import Preloader from '../components/Preloader';


const withPreloader = (Component) => {
    const PreloadedComponent = (props) => props.isFetching ? <Preloader /> : <Component />;
    return PreloadedComponent;
}


export default withPreloader