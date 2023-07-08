import { Component } from "react";


class ItemID extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            uid: props.id
        };
    }
    render() {
        return (
            <div>
                <p>ID {this.state.uid}</p>
            </div>
        );
    }
}
export default ItemID;