import React from 'react';

import Directory from "../../components/directory/directory.jsx"
import './homepage.scss'

// arror function can return in () directly instead of writing return()
const HomePage = () => (
    <div className='homepage'>
        <Directory />
    </div>
);

export default HomePage;