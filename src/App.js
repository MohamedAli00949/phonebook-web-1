import React, {useState} from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import AuthForm from './components/AuthForm/AuthForm';
import Home from './components/Home/Home';

const App = () => {
    const [currentId, setCurrentId] = useState(0);
    const [editContact, setEditContact] = useState(false);
    const [addContact, setAddContact] = useState(false);
    const [closeForm, setCloseForm] = useState(false);

    const handleAddContact = () => {
        setCurrentId(0); 
        setAddContact(true)
        setCloseForm(false);
    };

    const handleEditContact = () => {
        setEditContact(true);
        setCloseForm(false);
    }

    
    const stringToColor = (string) => {
        let hash = 0;
        let i;

        for(i = 0; i < string?.length; i++ ) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for(i = 0; i < 3; i++ ) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }

        return color;
    }

    const nameAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name?.split(' ')[0][0]}`
        }
    }

    return (
        <BrowserRouter>
            <Container maxWidth="lg" style={{paddingInline: '3px'}}>
                <NavBar 
                    addContact={handleAddContact} nameAvatar={nameAvatar}
                    currentId={currentId} setCurrentId={setCurrentId}
                    handleEditContact={handleEditContact} 
                />
                <Switch>
                    <Route path="/" exact component={() => <Home 
                        currentId={currentId} setCurrentId={setCurrentId} nameAvatar={nameAvatar}
                        handleAddContact={handleAddContact} handleEditContact={handleEditContact} 
                        setCloseForm={setCloseForm} closeForm={closeForm} addContact={addContact} 
                        setEditContact={setEditContact} editContact={editContact}
                        />} 
                    />
                    <Route path="/auth" exact component={AuthForm} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
}
export default App;