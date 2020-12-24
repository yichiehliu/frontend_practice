import React from 'react';

import './homepage.styles.scss'
// arror function can return in () directly instead of writing return()
const HomePage = () => (
        <div className='homepage'>
            <div className='directory-menu'>
                <div className='menu-item'>
                    <div className='content'>
                        <h1 className='title'>Hats</h1>
                        <span className='subtitle'>shop now</span>
                    </div>
                </div>
                <div className='menu-item'>
                    <div className='content'>
                        <h1 className='title'>JACKETS</h1>
                        <span className='subtitle'>shop now</span>
                    </div>
                </div>
                <div className='menu-item'>
                    <div className='content'>
                        <h1 className='title'>SNEAKERS</h1>
                        <span className='subtitle'>shop now</span>
                    </div>
                </div>
                <div className='menu-item'>
                    <div className='content'>
                        <h1 className='title'>WOMENS</h1>
                        <span className='subtitle'>shop now</span>
                    </div>
                </div>
                <div className='menu-item'>
                    <div className='content'>
                        <h1 className='title'>MANS</h1>
                        <span className='subtitle'>shop now</span>
                    </div>
                </div>
            </div>
        </div>
    );

export default HomePage;