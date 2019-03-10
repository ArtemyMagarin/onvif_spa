import React from 'react';
// import brand from '../assets/logo-white-onvif.png';

const Navbar = (props) => {
	return (
		<nav className="navbar navbar-dark bg-primary mb-3">
		 	<a className="navbar-brand" href="#">
			    { /*<img src={brand} height={"30"} className={"d-inline-block align-top mr-4"} alt={""}/> */}
			    ONVIF Compliance Tester
			</a>
		</nav>
	)
}

export default Navbar;