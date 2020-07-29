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
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation();

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
                            {t('signIn.title')}
                        </Typography>
                        <form className={formContainer} onSubmit={handleSubmit}>
                            <TextField
                                name="email"
                                label={t('signIn.labels.email')}
                                placeholder={t('signIn.placeholders.email')}
                                variant="outlined"
                                margin="normal"
                                required
                                autoFocus
                                type="email"
                                onChange={onChangeEmail}
                            />
                            <TextField
                                name="password"
                                label={t('signIn.labels.password')}
                                placeholder={t('signIn.placeholders.password')}
                                variant="outlined"
                                margin="normal"
                                required
                                type="password"
                                onChange={onChangePassword}
                            />
                            {/* this feature is not available */}
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label={t('signIn.labels.remember')}
                            /> */}
                            <span className={errorMessage}>{error}</span>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                {t('signIn.actions.signIn')}
                            </Button>
                            <Grid container>
                                {/* don't exist page */}
                                {/* <Grid item xs>
                                    <RouterLink className={link} to="#">
                                        {t('signIn.actions.forgotPassword')}
                                    </RouterLink>
                                </Grid> */}
                                <Grid item>
                                    <RouterLink className={link} to="/signup">
                                        {t('signIn.actions.goToSignUp')}
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