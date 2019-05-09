// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { signIn } from "../../store/actions/authAction";
// import { Redirect } from "react-router-dom"; // this is used to redirect routes

// class SignIn extends Component {
//   state = {
//     email: "",
//     password: ""
//   };

//   handleChange = e => {
//     this.setState({
//       [e.target.id]: e.target.value
//     });
//   };
//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.signInHandler(this.state);
//   };
//   render() {
//     const { authError, auth } = this.props;
//     if (auth.uid) return <Redirect to="/" />;
//     return (
//       <div className="container">
//         <form className="white" onSubmit={this.handleSubmit}>
//           <h5 className="grey-text text-darken-3">Sign In</h5>
//           <div className="input-field">
//             <label htmlFor="email">Email</label>
//             <input type="email" id="email" onChange={this.handleChange} />
//           </div>
//           <div className="input-field">
//             <label htmlFor="password">Password</label>
//             <input type="password" id="password" onChange={this.handleChange} />
//           </div>
//           <div className="input-field">
//             <button className="btn pink lighten-1 z-depth-0">Login</button>
//           </div>
//           <div className="center red-text">
//             {/* Conditionally rendering if auth error is there show message else null */}
//             {authError ? <p>{authError}</p> : null}
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     signInHandler: credentials => dispatch(signIn(credentials))
//   };
// };

// const mapStateToProps = rootReducer => {
//   return {
//     authError: rootReducer.auth.authError,
//     auth: rootReducer.firebase.auth
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SignIn);