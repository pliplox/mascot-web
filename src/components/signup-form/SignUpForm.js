import React, { useState } from 'react';
import { func, bool, string } from 'prop-types';
import {
  TextField,
  makeStyles,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Container,
  Card,
  CardContent,
  CircularProgress
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { randomAnimalImage } from '../../utils/random';

const MIN_CHAR = 'Mínimo 6 caracteres';

const useStyles = makeStyles(theme => ({
  formContainer: { display: 'flex', flexDirection: 'column', margin: theme.spacing(5) },
  formField: { margin: theme.spacing(3) },
  title: { textAlign: 'center' },
  paperStyle: { marginTop: theme.spacing(5), backgroundColor: 'rgba(255,255,255,0.7)' },
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
  signInLink: { textDecoration: 'none' },
  errorMessage: { color: '#B21A2F', textAlign: 'center' }
}));

const SignUpForm = ({ onSubmit, loading, error }) => {
  const {
    formContainer,
    formField,
    title,
    paperStyle,
    container,
    signInLink,
    errorMessage
  } = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, register } = useForm();

  if (error) {
    // eslint-disable-next-line no-param-reassign
    loading = false;
  }

  return (
    <div className={container}>
      <Container component="main" maxWidth="xs">
        <Card className={paperStyle}>
          <CardContent>
            <Typography component="h1" variant="h5" className={title}>
              Regístrate
            </Typography>
            <form autoComplete="off" className={formContainer} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                name="username"
                placeholder="Ingresa tu nombre de usuario"
                inputRef={register}
                required
                variant="outlined"
                label="Nombre de usuario"
                className={formField}
                helperText={MIN_CHAR}
              />
              <TextField
                name="email"
                placeholder="Ingresa tu correo"
                inputRef={register}
                required
                variant="outlined"
                label="Correo"
                type="email"
                className={formField}
              />
              <TextField
                name="password"
                placeholder="Ingresa tu contraseña"
                inputRef={register}
                required
                variant="outlined"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                helperText={MIN_CHAR}
                className={formField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <span className={errorMessage}>{error}</span>
              <Button
                color="primary"
                variant="contained"
                className={formField}
                type="submit"
                disabled={loading}
                endIcon={loading && <CircularProgress size={25} />}
              >
                Registrarte
              </Button>
            </form>
            <RouterLink className={signInLink} to="/signin">
              Ya tienes una cuenta? Ingresa aquí
            </RouterLink>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

SignUpForm.defaultProps = {
  error: null,
  loading: false
};

SignUpForm.propTypes = {
  error: string,
  loading: bool,
  onSubmit: func.isRequired
};

export default SignUpForm;
