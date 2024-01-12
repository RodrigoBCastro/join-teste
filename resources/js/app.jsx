import React from 'react';
import ReactDOM from 'react-dom';
import HomeScreen from './HomeScreen';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';

if (document.getElementById('app')) {
    const path = window.location.pathname;

    let Component;
    switch (path) {
        case '/produto':
            Component = ProductManagement;
            break;
        case '/categoria':
            Component = CategoryManagement;
            break;
        default:
            Component = HomeScreen;
    }

    ReactDOM.render(<Component />, document.getElementById('app'));
}
