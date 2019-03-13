import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {startRemoveService, startSetServices} from "../../redux/actions/services";
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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';


const kmSelector = [
    1, 2, 5, 10, 25, 50, 100
];

class ServiceList extends React.Component {

    state = {
        labelWidth: 0,
        distanceKm: "",
        location: false,
        location_error: "",
    };


    getLocation = () => {
        const geolocation = window.navigator.geolocation;

        return new Promise((resolve, reject) => {
            if (!geolocation) {
                reject(new Error('Not Supported'));
            }

            geolocation.getCurrentPosition(
                (position) => resolve(position),
                () => reject(new Error('Permission denied'))
            );
        });
    };

    getServices = () => {

        const params = {};

        if (this.state.distanceKm) {
            params['distanceKm'] = this.state.distanceKm;
        }

        if (this.state.location) {
            params['lat'] = this.state.location.lat;
            params['lng'] = this.state.location.lng;
        }

        this.props.startSetServices(params);
    };

    componentDidMount() {

        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });

        this.getLocation().then(response => {

            this.setState({
                location: {
                    lat: response.coords.latitude,
                    lng: response.coords.longitude
                }
            });

        }).catch(error => {

            this.setState({
                location: false,
                location_error: error.toString()
            });

        }).finally(() => {
            this.getServices()
        });

    }


    handleChange = event => {
        this.setState({distanceKm: event.target.value});

        this.props.startSetServices({
            lat: this.state.location.lat,
            lng: this.state.location.lng,
            distanceKm: event.target.value
        });
    };


    render() {
        return (
            <Fragment>
                <h1>ServiceList</h1>

                <Grid container spacing={24}>
                    <Grid item xs>
                        <FormControl
                            fullWidth
                            variant="outlined">
                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-age-simple"
                            >
                                Distance (Km)
                            </InputLabel>
                            <Select
                                value={this.state.distanceKm}
                                onChange={this.handleChange}
                                fullWidth
                                input={
                                    <OutlinedInput
                                        labelWidth={this.state.labelWidth}
                                        name="distanceKm"
                                        id="distanceKm"
                                    />
                                }
                            >
                                <MenuItem value="">
                                    <em>Anywhere</em>
                                </MenuItem>
                                {kmSelector.map(t => <MenuItem key={t} value={t}>{t}km</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" type="submit" color="primary"
                                onClick={() => this.getServices()}>
                            Reload
                        </Button>
                    </Grid>
                </Grid>

                {this.state.location === false && this.state.location_error === '' && <p>Getting your location...</p>}
                {this.state.location !== false && <p>Your coordinates: {JSON.stringify(this.state.location)}</p>}
                {this.state.location_error !== '' && <p>Error getting location: {this.state.location_error}</p>}

                <List>
                    {this.props.services.map((service) => (
                        <ListItem key={service.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    {service.title[0].toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={service.title}
                                secondary={service.description.substr(0, 30)}
                            />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Edit" component={Link} to={`services/${service.id}/edit`}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton aria-label="Delete"
                                            onClick={() => this.props.startRemoveService(service.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    services: state.services
});

const mapDispatchToProps = dispatch => ({
    startRemoveService: (id) => dispatch(startRemoveService(id)),
    startSetServices: (params) => dispatch(startSetServices(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);
