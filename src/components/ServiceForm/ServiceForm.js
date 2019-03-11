import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {startAddService} from "../../redux/actions/services";


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
    'address',
    'city',
    'state',
    'location',
    'zip_code'
];


class ServiceForm extends React.Component {

    constructor(props) {
        super(props);

        const state = {};

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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.startAddService(this.state);
    };

    render() {
        const {classes} = this.props;

        return (
            <form onSubmit={this.handleSubmit}>

                {fields.map(f => (
                    <TextField
                        key={f}
                        label={f}
                        name={f}
                        fullWidth
                        className={classes.textField}
                        value={this.state[f]}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleInputChange}
                    />
                ))}

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
