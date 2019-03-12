import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {startAddService} from "../../redux/actions/services";
import Autocomplete from "../Autocomplete/Autocomplete";


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

const fields = [
    'title',
    'description',
];


class ServiceForm extends React.Component {

    constructor(props) {
        super(props);

        const state = {
            country: "",
            route: "",
            street_number: "",
            zip_code: "",
            city: "",
            state: "",
            lat: "",
            lng: ""
        };

        fields.forEach(f => state[f] = props.service ? props.service[f] : '');

        this.state = state;

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    showPlaceDetails(place) {

        const newState = {};

        newState['lat'] = place.geometry.location.lat();
        newState['lng'] = place.geometry.location.lng();

        place.address_components.forEach(el => {

            if (el.types.includes('street_number')) {
                newState['street_number'] = el.long_name;
            }

            if (el.types.includes('route')) {
                newState['route'] = el.long_name;
            }

            if (el.types.includes('locality')) {
                newState['city'] = el.long_name;
            }


            if (el.types.includes('administrative_area_level_1')) {
                newState['state'] = el.long_name;
            }

            if (el.types.includes('country')) {
                newState['country'] = el.long_name;
            }

            if (el.types.includes('postal_code')) {
                newState['zip_code'] = el.long_name;
            }
        });

        this.setState(newState);
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.startAddService(this.state);
    };

    render() {
        const {classes} = this.props;

        return (
            <form onSubmit={this.handleSubmit}>

                <h2>Service Info</h2>
                <TextField
                    key="title"
                    label="title"
                    name="title"
                    fullWidth
                    className={classes.textField}
                    value={this.state.title}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                />

                <TextField
                    key="description"
                    label="description"
                    name="description"
                    fullWidth
                    multiline={true}
                    className={classes.textField}
                    value={this.state.description}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                />

                <h2>Location</h2>
                <Autocomplete onPlaceChanged={this.showPlaceDetails.bind(this)} />

                <TextField
                    key="street_number"
                    label="street_number"
                    name="street_number"
                    className={classes.textField}
                    value={this.state.street_number}
                    margin="normal"
                    variant="outlined"
                    disabled
                />

                <TextField
                    key="route"
                    label="route"
                    name="route"
                    className={classes.textField}
                    value={this.state.route}
                    margin="normal"
                    variant="outlined"
                    disabled
                />

                <TextField
                    key="city"
                    label="city"
                    name="city"
                    fullWidth
                    className={classes.textField}
                    value={this.state.city}
                    margin="normal"
                    variant="outlined"
                    disabled
                />

                <TextField
                    key="state"
                    label="state"
                    name="state"
                    className={classes.textField}
                    value={this.state.state}
                    margin="normal"
                    variant="outlined"
                    disabled
                />

                <TextField
                    key="zip_code"
                    label="zip_code"
                    name="zip_code"
                    className={classes.textField}
                    value={this.state.zip_code}
                    margin="normal"
                    variant="outlined"
                    disabled
                />

                <TextField
                    key="country"
                    name="country"
                    label="country"
                    fullWidth
                    className={classes.textField}
                    value={this.state.country}
                    margin="normal"
                    variant="outlined"
                    disabled
                />

                <TextField
                    key="lat"
                    name="lat"
                    label="lat"
                    fullWidth
                    className={classes.textField}
                    value={this.state.lat}
                    margin="normal"
                    variant="outlined"
                    disabled
                />

                <TextField
                    key="lng"
                    name="lng"
                    label="lng"
                    fullWidth
                    className={classes.textField}
                    value={this.state.lng}
                    margin="normal"
                    variant="outlined"
                    disabled
                />



                <Button variant="contained" type="submit" color="primary" className={classes.button}>
                    Save
                </Button>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    startAddService: (service) => dispatch(startAddService(service))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(ServiceForm));
