import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import styled1 from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
// import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';
import navConfigUser from './config-navigation-user';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const StyledDiv = styled1.div`
    font-family: 'Prompt', sans-serif;
  `;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://test-api-01.azurewebsites.net/api/authen', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.status === 'ok') {
          setUser(result.decoded.user);
        } else {
          localStorage.removeItem('token');
          Swal.fire({
            icon: 'error',
            title: 'กรุณา Login ก่อน',
            text: result.message,
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [navigate]);

  // const imageUrl = user?.image
  //   ? `https://cafe-project-server11.onrender.com/images-user/${user.image}`
  //   : null;

  const upLg = useResponsive('up', 'lg');

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={user?.image?.url} alt="User Photo" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">
          <StyledDiv>
            {user?.firstname} {user?.lastname}
          </StyledDiv>
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <StyledDiv>{user?.role}</StyledDiv>
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {user?.role === 'เจ้าของร้าน'
        ? navConfig.map((item) => <NavItem key={item.title} item={item} />)
        : navConfigUser.map((item) => <NavItem key={item.title} item={item} />)}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = item.path === pathname;

  const handleToggle = () => {
    setOpen(!open);
  };

  //   return (
  //     <ListItemButton
  //       component={RouterLink}
  //       href={item.path}
  //       sx={{
  //         minHeight: 44,
  //         borderRadius: 0.75,
  //         typography: 'body2',
  //         color: 'text.secondary',
  //         textTransform: 'capitalize',
  //         fontWeight: 'fontWeightMedium',
  //         ...(active && {
  //           color: 'primary.main',
  //           fontWeight: 'fontWeightSemiBold',
  //           bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
  //           '&:hover': {
  //             bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
  //           },
  //         }),
  //       }}
  //     >
  //       <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
  //         {item.icon}
  //       </Box>

  //       <Box component="span">{item.title} </Box>
  //     </ListItemButton>
  //   );
  // }

  return (
    <>
      <ListItemButton
        onClick={item.subItems ? handleToggle : () => navigate(item.path)}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'text.secondary',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightMedium',
          ...(active && {
            color: 'primary.main',
            fontWeight: 'fontWeightSemiBold',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            },
          }),
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          {item.icon}
        </Box>

        <Box component="span" sx={{ flexGrow: 1 }}>
          {item.title}
        </Box>

        {item.subItems && (
          <Box
            component="span"
            sx={{
              display: 'flex',
              alignItems: 'center',
              transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.2s',
            }}
          >
            {open ? (
              <Icon icon="mdi:arrow-down-drop-circle" />
            ) : (
              <Icon icon="mdi:arrow-down-drop-circle" />
            )}
          </Box>
        )}
      </ListItemButton>
      {item.subItems && open && (
        <Box sx={{ pl: 4 }}>
          {item.subItems.map((subItem) => (
            <NavItem key={subItem.title} item={subItem} />
          ))}
        </Box>
      )}
    </>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
