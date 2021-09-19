import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import useStyles from './styles';
import NavBar from './components/NavBar/NavBar';
import AuthForm from './components/AuthForm/AuthForm';
import Home from './components/Home/Home';

const App = () => {
    const classes = useStyles();

    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={AuthForm} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
}
export default App;