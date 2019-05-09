// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Redirect } from "react-router-dom"; // this is used to redirect routes
// import { signUpUser } from "../../store/actions/authAction";

// class SignUp extends Component {
//   state = {
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: ""
//   };
//   handleChange = e => {
//     this.setState({
//       [e.target.id]: e.target.value
//     });
//   };
//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.signUpHandler(this.state);
//   };
//   render() {
//     const { auth, authError } = this.props;
//     if (auth.uid) return <Redirect to="/" />;
//     return (
//       <div className="container">
//         <form className="white" onSubmit={e => this.handleSubmit(e)}>
//           <h5 className="grey-text text-darken-3">Sign Up</h5>
//           <div className="input-field">
//             <label htmlFor="email">Email</label>
//             <input type="email" id="email" onChange={this.handleChange} />
//           </div>
//           <div className="input-field">
//             <label htmlFor="password">Password</label>
//             <input type="password" id="password" onChange={this.handleChange} />
//           </div>
//           <div className="input-field">
//             <label htmlFor="firstName">First Name</label>
//             <input type="text" id="firstName" onChange={this.handleChange} />
//           </div>
//           <div className="input-field">
//             <label htmlFor="lastName">Last Name</label>
//             <input type="text" id="lastName" onChange={this.handleChange} />
//           </div>
//           <div className="input-field">
//             <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
//           </div>
//           <div className="center red-text">
//             {authError ? <p>{authError}</p> : null}
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// const mapStateToProps = rootReducer => {
//   return {
//     auth: rootReducer.firebase.auth,
//     authError: rootReducer.auth.authError
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     signUpHandler: newUser => dispatch(signUpUser(newUser))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SignUp);