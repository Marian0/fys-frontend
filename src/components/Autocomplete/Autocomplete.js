import React from "react";
import TextField from '@material-ui/core/TextField';

class Autocomplete extends React.Component {

    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }

    componentDidMount() {
        this.autocomplete = new window.google.maps.places.Autocomplete(
            this.autocompleteInput.current,
            {types: ["geocode"]}
        );
        this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
    }

    handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        this.props.onPlaceChanged(place);
    }

    render() {
        return (

            <TextField
                inputRef={this.autocompleteInput}
                id="autocomplete"
                placeholder="Enter your address"
                type="text"
                fullWidth
                margin="normal"
                variant="outlined"
            />
        );
    }
}

export default Autocomplete;

