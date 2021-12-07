import React from 'react';

import './style.css';
import Board from "../../components/board/Board.jsx";
import * as UserHelpers from "../../helpers/UserHelpers.jsx";

class Container extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            color: "",
            size: "10"
        }
    }

    componentDidMount() {
        const connectedUserId = localStorage.getItem("id")
        if(connectedUserId !== null){
            UserHelpers.getUserById(connectedUserId).then((response) => {
                let currentUser = response.data;
                this.setState({color: currentUser.color});
                console.log(this.state.color);
            })
        }
    }

    handleSizeChange(newSize) {
        this.setState({
            size: newSize.target.value
        })
    }
    handleColorChange(newColor) {
        this.setState({
            color: newColor.target.value
        })
    }

    unlogging() {
    localStorage.removeItem("id")
    document.location.href = "/";
    }


    render() {

        return (
            <div className="container">
                <div className="tools-section">
                    <div className="color-picker-container">
                        Size : &nbsp;&nbsp;&nbsp;
                        <input type="color" value={this.state.color} onChange={this.handleColorChange.bind(this)}/>
                    </div>
                    <div className="size">
                        Size : &nbsp;&nbsp;&nbsp;
                        <select value={this.state.size} onChange={this.handleSizeChange.bind(this)}>
                            <option> 10 </option>
                            <option> 15 </option>
                            <option> 20 </option>
                            <option> 25 </option>
                            <option> 30 </option>
                        </select>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={() => this.unlogging()} className="btn btn-secondary btn-block">Disconnect</button>

                </div>

                <div className="board-container">
                    <Board color={this.state.color} size={this.state.size}/>
                </div>
            </div>
        )
    }
}

export default Container