import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { makeStyles, Paper, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  main: {
    [theme.breakpoints.up(1201)]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      width: '100vw',
      maxWidth: '2140px',
      height: '100vh',
    },
    [theme.breakpoints.down(1200)]: {
      display: 'grid',
      gridTemplateRows: '1fr 1fr',
      width: '100vw',
      height: '100vh',
    },
  },
  formContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px'
  },
  form: {
    [theme.breakpoints.up(1361)]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 15px 2px #3f51b5',
      borderRadius: '16px',
      height: 'fit-content',
      width: 'fit-content',
      minWidth: '350px',
      maxWidth: '460px',
      margin: '0 32px',
      padding: '54px',
      '&:hover': {
        boxShadow: '0 0 40px 2px #3f51b5',
      }
    },
    [theme.breakpoints.between(600, 1361)]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 15px 2px #3f51b5',
      borderRadius: '16px',
      height: 'fit-content',
      width: 'fit-content',
      minWidth: '350px',
      maxWidth: '460px',
      padding: '54px',
      '&:hover': {
        boxShadow: '0 0 40px 2px #3f51b5',
      }
    },
    [theme.breakpoints.between(470, 600)]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 15px 2px #3f51b5',
      borderRadius: '16px',
      height: 'fit-content',
      width: 'fit-content',
      maxWidth: '460px',
      padding: '44px',
      '&:hover': {
        boxShadow: '0 0 40px 2px #3f51b5',
      }
    },
    [theme.breakpoints.down(470)]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 15px 2px #3f51b5',
      borderRadius: '16px',
      height: 'fit-content',
      width: 'fit-content',
      padding: '34px',
      '&:hover': {
        boxShadow: '0 0 40px 2px #3f51b5',
      }
    },
  },
  welcome: {
    fontSize: '22px',
    margin: '6px',
    textAlign: 'center',
    marginBottom: '24px'
  },
  inputData: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '8px'
  },
  leftBlock: {
    [theme.breakpoints.up(1200)]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '100px'
    },
    [theme.breakpoints.down(1200)]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '44px 200px'
    },
    [theme.breakpoints.down(890)]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '44px 140px'
    },
    [theme.breakpoints.down(580)]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '44px'
    },
  },
  EnterSessionButton: {
    width: '100%',
    height: '54px',
    margin: '8px 0',
    background: '#3f51b5',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    '&:active': {
      transform: 'scale(0.98)'
    },
    '&:hover': {
      opacity: '0.93'
    }
  },
  CreateSessionButton: {
    width: '100%',
    height: '54px',
    background: '#30ab5a',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    '&:active': {
      transform: 'scale(0.98)'
    },
    '&:hover': {
      opacity: '0.93'
    }
  }
}));

const EnterSession = () => {
  const classes = useStyles();
  let history = useHistory();

  const handleEnterSession = (event) => {
    event.preventDefault();

    const user = {
      userName: (document.getElementById('name')).value,
    }

    if (!user.userName) {
      alert('Insira seu nome e a ID da sessão para entrar na sessão.');
    } else {
      setTimeout(() => history.push('/session'), 150);
    }
  };

  return (
    <main className={classes.main}>
      <div className={classes.leftBlock}>
        <img width='200px' height='200px' src='./logo.png' alt='ARMain logo'></img>
        <h2 style={{ fontWeight: '400' }}>Entre em uma sessão remota ou crie uma. Desfrute da realidade aumentada para uma ótima manutenção.</h2>
      </div>
      <div className={classes.formContainer}>
        <Paper className={classes.form}>
          <Typography className={classes.welcome}>Bem-vindo(a) ao ARMain</Typography>
          <div className={classes.inputData}>
            <TextField
              id='name'
              label='Seu nome'
              variant='outlined'
              color='primary'
              margin='dense' />
            <TextField
              id='sessionID'
              label='ID da sessão'
              variant='outlined'
              color='primary'
              margin='dense'
            />
          </div>

          <button className={classes.EnterSessionButton} type='submit' onClick={handleEnterSession}>Entrar na sessão</button>
          <button className={classes.CreateSessionButton} type='submit' onClick={() => history.push('/create-session')}>Criar uma sessão</button>
        </Paper>
      </div>
    </main>
  );
}

export default withRouter(EnterSession);