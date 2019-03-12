import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {startAddService, startUpdateService} from "../../redux/actions/services";
import {showSnackbar} from "../../redux/actions/snackbar";
import Autocomplete from "../Autocomplete/Autocomplete";
import FYSApiClient from "../../remote/FYSApiClient";


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

class ServiceForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            description: "",
            country: "",
            address: "",
            zip_code: "",
            city: "",
            state: "",
            location: {
                lat: "",
                lng: ""
            }
        };

        if (props.match.params.id) {
            this.state.loading = true;

            FYSApiClient.getService(props.match.params.id).then((response) => {

                if (response.data.service) {
                    this.setState({
                        loading: false,
                        ...response.data.service
                    });
                }

            });
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    showPlaceDetails = (place) => {

        const newState = {};

        newState['location'] = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };

        newState['address'] = place.formatted_address;

        place.address_components.forEach(el => {

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
    };


    handleSubmit = (e) => {
        e.preventDefault();

        if (!this.state.id) {
            this.props.startAddService(this.state).then(response => {

                if (response.status !== 200) {
                    this.props.showSnackbar("Error: " + response.data.message || " The given data is invalid.");
                    console.log("ERROR: ", response);
                    return;
                }

                this.props.showSnackbar("Success!");
                this.props.history.push({pathname: "/"});

            });
            return;
        }

        this.props.startUpdateService(this.state.id, this.state).then(response => {

            if (response.status !== 200) {
                this.props.showSnackbar("Error: " + response.data.message || " The given data is invalid.");
                console.log("ERROR: ", response);
                return;
            }

            this.props.showSnackbar("Success!");
            this.props.history.push({pathname: "/"});

        });

    };

    render() {
        const {classes} = this.props;

        if (this.state.loading) {
            return <p>Loading...</p>;
        }

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
                <Autocomplete onPlaceChanged={this.showPlaceDetails.bind(this)}/>

                <TextField
                    key="address"
                    label="address"
                    name="address"
                    className={classes.textField}
                    value={this.state.address}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                    fullWidth
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
                    onChange={this.handleInputChange}
                />

                <TextField
                    key="state"
                    label="state"
                    name="state"
                    className={classes.textField}
                    value={this.state.state}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                />

                <TextField
                    key="zip_code"
                    label="zip_code"
                    name="zip_code"
                    className={classes.textField}
                    value={this.state.zip_code}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
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
                    onChange={this.handleInputChange}
                />

                <TextField
                    key="lat"
                    name="lat"
                    label="lat"
                    fullWidth
                    className={classes.textField}
                    value={this.state.location.lat}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                />

                <TextField
                    key="lng"
                    name="lng"
                    label="lng"
                    fullWidth
                    className={classes.textField}
                    value={this.state.location.lng}
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleInputChange}
                />

                <Button variant="contained" type="submit" color="primary" className={classes.button}>
                    Save
                </Button>

            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    startAddService: (service) => dispatch(startAddService(service)),
    startUpdateService: (id, service) => dispatch(startUpdateService(id, service)),
    showSnackbar: (message) => dispatch(showSnackbar(message))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(ServiceForm));
