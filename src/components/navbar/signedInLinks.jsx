// import React from "react";
// import { NavLink } from "react-router-dom";
// import { connect } from "react-redux";
// // import { signOut } from "../../store/actions/authAction";

// const SignedInLinks = props => {
//   const { initials } = props;
//   return (
//     <div>
//       <ul className="right">
//         <li>
//           <NavLink to="/create">New Project</NavLink>
//         </li>
//         <li>
//           <a onClick={props.signOutHandler}>Log Out</a>
//         </li>
//         <li>
//           <NavLink to="/" className="btn btn-floating pink lighten-1">
//             {initials}
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   );
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     signOutHandler: () => dispatch(signOut())
//   };
// };
// const mapStateToProps = rootReducer => {
//   return {
//     initials: rootReducer.firebase.profile.initials
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SignedInLinks);