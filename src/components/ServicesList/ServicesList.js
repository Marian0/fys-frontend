import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {startRemoveService, startSetServices} from "../../redux/actions/services";
import store from '../../redux/store';
import {Link} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


store.dispatch(startSetServices());

const ServiceList = (props) => (
    <Fragment>
        <h1>ServiceList</h1>
        <List>
            <Button variant="contained" type="submit" color="primary" onClick={() => props.startSetServices()}>
                Reload
            </Button>
            {props.services.map((service) => (
                <ListItem key={service.id}>
                    <ListItemAvatar>
                        <Avatar>
                            {service.title[0].toUpperCase()}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={service.title}
                        secondary={service.description.substr(0,30)}
                    />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Edit" component={Link} to={`services/${service.id}/edit`} >
                            <EditIcon/>
                        </IconButton>
                        <IconButton aria-label="Delete" onClick={() => props.startRemoveService(service.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    </Fragment>
);

const mapStateToProps = (state) => ({
    services: state.services
});

const mapDispatchToProps = dispatch => ({
    startRemoveService: (id) => dispatch(startRemoveService(id)),
    startSetServices: () => dispatch(startSetServices()),
});

export default connect(mapStateToProps, mapDispatchToProps  )(ServiceList);
