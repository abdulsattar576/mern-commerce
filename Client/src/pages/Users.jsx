 import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Skeleton,
  useTheme
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  FiberManualRecord as StatusIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

const Users = () => {
  const { users, loading } = useSelector((state) => state.adminReducer);
  const theme = useTheme();

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'PPpp');
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          User Management
        </Typography>
        <Chip 
          label={`${users?.length || 0} users`} 
          color="primary" 
          variant="outlined"
          size="small"
        />
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead sx={{ backgroundColor: theme.palette.grey[50] }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Joined</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" width="60%" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                </TableRow>
              ))
            ) : users && users.length > 0 ? (
              users.map((user) => (
                <TableRow 
                  key={user._id} 
                  hover
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {getInitials(user.fullName)}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          {user.fullName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {user._id.substring(0, 8)}...
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon color="action" fontSize="small" />
                      {user.email}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={<StatusIcon fontSize="small" sx={{ color: user.isActive ? 'success.main' : 'error.main' }} />}
                      label={user.isActive ? 'Active' : 'Inactive'}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: user.isActive ? 'success.main' : 'error.main',
                        color: user.isActive ? 'success.main' : 'error.main'
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                      <CalendarIcon color="action" fontSize="small" />
                      {formatDate(user.createdAt)}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No users found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Users;