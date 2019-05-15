import React from 'react';

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-dark bg-primary mb-3">
            <a className="navbar-brand" href="#">
                { /*<img src={brand} height={"30"} className={"d-inline-block align-top mr-4"} alt={""}/> */}
                ONVIF Compliance Tester
            </a>
            <ul className="navbar-nav mr-auto">
            </ul>
            <div className="form-inline my-2 my-lg-0 mr-5">
              <p className="mb-0 mr-3 text-light">{`${props.user.name} ${props.user.surname}`}</p>
              <a className="text-light" href="/logout">Logout</a>
            </div>
        </nav>
    )
}

export default Navbar;
