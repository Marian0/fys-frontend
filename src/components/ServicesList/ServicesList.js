import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import {startSetServices} from "../../redux/actions/services";
import store from '../../redux/store';


store.dispatch(startSetServices());

const ServiceList = (props) => (
    <Fragment>
        <h1>ServiceList</h1>
        {props.services.map((service) => (
            <h3 key={service.id}>{service.title}</h3>
        ))}
    </Fragment>
);

const mapStateToProps = (state) => ({
    services: state.services
});

export default connect(mapStateToProps)(ServiceList);
