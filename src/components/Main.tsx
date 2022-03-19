
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserProfileAsync, selectUser, selectUserStatus, userLoading, userLogout } from '../reducer/user/userSlice';
import AppBar from './AppBar';
import AppDrawer from './AppDrawer';
import { Editor } from './Editor';
import { Favorites } from './Favorites';
import { Finder } from './Finder';

const Main = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserProfileAsync())
  }, [])

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = (open: boolean) => {
    setOpen(!open);
  };
  const handleLogout = () => {
    dispatch(userLogout())
  }
  const user = useAppSelector(selectUser);
  const userStatus = useAppSelector(selectUserStatus);
  const setUserStatus = () => {
    dispatch(userLoading())
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar userStatus={userStatus} setUserStatus={setUserStatus} handleLogout={handleLogout} user={user} isOpen={open} toggleDrawer={toggleDrawer} />
        <AppDrawer user={user} isOpen={open} toggleDrawer={toggleDrawer} />
        <Box component="main" sx={{
          backgroundColor: (theme) => theme.palette.mode === 'light'
            ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: '100vh', overflow: 'auto',
        }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Finder />} ></Route>
              <Route path="/new" element={<Editor />} ></Route>
              <Route path="/favorites" element={<Favorites />} ></Route>
            </Routes>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Main
