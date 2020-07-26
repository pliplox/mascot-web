import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { randomAnimalImage } from '../../utils/random';
import {
    makeStyles,
    Card,
    CardContent,
    FormControlLabel,
    Button,
    TextField,
    Checkbox,
    Grid,
    Typography,
    Container,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        backgroundImage: randomAnimalImage(),
        backgroundColor: '#0e0e0e',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        height: '100vh',
        minHeight: '100vh',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.between('md', 'lg')]: {
            backgroundImage: randomAnimalImage('md')
        },
        [theme.breakpoints.between('sm', 'md')]: {
            backgroundImage: randomAnimalImage('sm')
        },
        [theme.breakpoints.between('xs', 'sm')]: {
            backgroundImage: randomAnimalImage('xs')
        }
    },
    paperStyle: {
        marginTop: theme.spacing(5),
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(5)
    },
    title: {
        textAlign: 'center'
    },
    link: {
        textDecoration: 'none',
        fontSize: 13,
    },
    errorMessage: {
        color: '#B21A2F',
        textAlign: 'center',
        marginBottom: theme.spacing(3),
    },
}));

const SignInForm = ({ onSubmit, error }) => {
    const {
        container,
        paperStyle,
        formContainer,
        title,
        link,
        errorMessage
    } = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, password);
    }

    return (
        <div className={container}>
            <Container component="main" maxWidth="xs" >
                <Card className={paperStyle}>
                    <CardContent>
                        <Typography component="h1" variant="h5" className={title}>
                            Ingresar
                        </Typography>
                        <form className={formContainer} onSubmit={handleSubmit}>
                            <TextField
                                name="email"
                                label="Correo electrónico"
                                placeholder="Ingresa tu correo"
                                variant="outlined"
                                margin="normal"
                                required
                                autoFocus
                                type="email"
                                onChange={onChangeEmail}
                            />
                            <TextField
                                name="password"
                                label="Contraseña"
                                placeholder="Ingresa tu contraseña"
                                variant="outlined"
                                margin="normal"
                                required
                                type="password"
                                onChange={onChangePassword}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Recordar"
                            />
                            <span className={errorMessage}>{error}</span>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Entrar
                            </Button>
                            <Grid container>
                                {/* <Grid item xs>
                                    <RouterLink className={link} to="#">
                                        ¿Se te olvidó tu contraseña?
                                    </RouterLink>
                                </Grid> */}
                                <Grid item>
                                    <RouterLink className={link} to="/signup">
                                        ¿No tienes una cuenta? Regístrate
                                    </RouterLink>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}
export default SignInForm;