import React, { Component } from "react";
import AppHeader from "../Frame/AppHeader";



class Login2 extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false // Indicates in progress state of login form
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {


    }

    login = (e) => {


    }

    render() {



        return (

            <div className="row">
                <AppHeader></AppHeader>
                <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                    <form  className="container">
                        <div className="card">
                            <div className="card-header">
                                <h2>User Login</h2>
                            </div>
                            <div className="card-body">
                                <div className="form-group text-start">
                                    <label>User Name <span className="errmsg"></span></label>
                                    <input type="text" value={this.state.username}  className="form-control"></input>
                                </div>
                                <div className="form-group text-start">
                                    <label>Password <span className="errmsg"></span></label>
                                    <input type="password" value={this.state.password}  className="form-control"></input>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="" >
                                    <button type="submit" className="btn btn-primary w-100">Login</button>
                                </div>
                                 
                            </div>
                        </div>
                    </form>
                </div>
                <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                    <form  className="container">
                        <div className="card">
                            <div className="card-header">
                                <h2>User Login</h2>
                            </div>
                            <div className="card-body">
                                <div className="form-group text-start">
                                    <label>User Name <span className="errmsg"></span></label>
                                    <input type="text" value={this.state.username}  className="form-control"></input>
                                </div>
                                <div className="form-group text-start">
                                    <label>Password <span className="errmsg"></span></label>
                                    <input type="password" value={this.state.password}  className="form-control"></input>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="" >
                                    <button type="submit" className="btn btn-primary w-100">Login</button>
                                </div>
                                 
                            </div>
                        </div>
                    </form>
                </div>
                <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                    <form  className="container">
                        <div className="card">
                            <div className="card-header">
                                <h2>User Login</h2>
                            </div>
                            <div className="card-body">
                                <div className="form-group text-start">
                                    <label>User Name <span className="errmsg"></span></label>
                                    <input type="text" value={this.state.username}  className="form-control"></input>
                                </div>
                                <div className="form-group text-start">
                                    <label>Password <span className="errmsg"></span></label>
                                    <input type="password" value={this.state.password}  className="form-control"></input>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="" >
                                    <button type="submit" className="btn btn-primary w-100">Login</button>
                                </div>
                                 
                            </div>
                        </div>
                    </form>
                </div>
                <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                    <form  className="container">
                        <div className="card">
                            <div className="card-header">
                                <h2>User Login</h2>
                            </div>
                            <div className="card-body">
                                <div className="form-group text-start">
                                    <label>User Name <span className="errmsg"></span></label>
                                    <input type="text" value={this.state.username}  className="form-control"></input>
                                </div>
                                <div className="form-group text-start">
                                    <label>Password <span className="errmsg"></span></label>
                                    <input type="password" value={this.state.password}  className="form-control"></input>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="" >
                                    <button type="submit" className="btn btn-primary w-100">Login</button>
                                </div>
                                 
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        );
    }
}

export default Login2;