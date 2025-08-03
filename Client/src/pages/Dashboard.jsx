 import React from 'react';
import { useSelector } from 'react-redux';
import { 
  People as PeopleIcon,
  ShoppingBasket as ProductsIcon,
  AttachMoney as RevenueIcon,
  CheckCircle as ActiveUsersIcon,
  TrendingUp as TrendIcon,
  ChevronRight
} from '@mui/icons-material';
import { 
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Chip,
  Link
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BarChart, PieChart } from '@mui/x-charts';

const Dashboard = () => {
  const { users } = useSelector((state) => state.adminReducer);
  const { products } = useSelector(state => state.ProductReducer);

  // Statistics data
  const totalUsers = users?.length || 0;
  const totalProducts = products?.length || 0;
  const activeUsers = users?.filter(user => user.isActive).length || 0;
  const recentProducts = products?.slice(0, 4) || [];
  const recentUsers = users?.slice(0, 5) || [];
  const totalRevenue = products?.reduce((sum, product) => sum + (product.price * (product.sold || 0)), 0) || 0;
  const monthlyGrowth = 12.5;

  // Chart data
  const salesData = {
    xAxis: [{ 
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      scaleType: 'band' 
    }],
    series: [{ 
      data: [12, 19, 3, 5, 2, 3],
      color: '#6366F1'
    }],
    height: 300
  };

  const userActivityData = {
    series: [
      {
        data: [
          { value: activeUsers, label: 'Active', color: '#10B981' },
          { value: totalUsers - activeUsers, label: 'Inactive', color: '#E5E7EB' },
        ],
      },
    ],
    height: 300,
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="fontWeightBold">
          Dashboard Overview
        </Typography>
        <Chip 
          icon={<TrendIcon fontSize="small" />} 
          label="Updated just now" 
          color="success" 
          size="small" 
          variant="outlined"
        />
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            change={monthlyGrowth}
            icon={<RevenueIcon />}
            color="#8B5CF6"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Users"
            value={totalUsers.toLocaleString()}
            change={5.2}
            icon={<PeopleIcon />}
            color="#3B82F6"
            link="/admin/users"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Products"
            value={totalProducts.toLocaleString()}
            change={8.7}
            icon={<ProductsIcon />}
            color="#10B981"
            link="/admin/products"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Users"
            value={activeUsers.toLocaleString()}
            change={3.1}
            icon={<ActiveUsersIcon />}
            color="#6366F1"
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
            <CardHeader
              title="Sales Overview"
              action={
                <IconButton size="small">
                  <ChevronRight />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <BarChart
                {...salesData}
                slotProps={{
                  legend: {
                    hidden: true,
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
            <CardHeader title="User Activity" />
            <Divider />
            <CardContent>
              <PieChart
                {...userActivityData}
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RecentItemsTable
            title="Recent Products"
            items={recentProducts}
            columns={[
              { header: 'Name', accessor: 'name' },
              { header: 'Price', accessor: 'price', format: value => `$${value}` },
              { header: 'Status', accessor: 'status', format: value => (
                <Chip label={value || 'Active'} size="small" color={value === 'Inactive' ? 'default' : 'success'} />
              )}
            ]}
            link="/admin/products"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecentItemsTable
            title="Recent Users"
            items={recentUsers}
            columns={[
              { header: 'Name', accessor: 'fullName' },
              { header: 'Email', accessor: 'email' },
              { header: 'Status', accessor: 'isActive', format: value => (
                <Chip 
                  label={value ? 'Active' : 'Inactive'} 
                  size="small" 
                  color={value ? 'success' : 'default'} 
                />
              )}
            ]}
            link="/admin/users"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// Custom Metric Card Component
const MetricCard = ({ title, value, change, icon, color, link }) => {
  const StyledAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: color + '20',
    color: color,
    width: 48,
    height: 48,
  }));

  const content = (
    <Card elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h5" component="div" sx={{ mt: 1 }}>
              {value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendIcon
                fontSize="small"
                color={change >= 0 ? 'success' : 'error'}
                sx={{ 
                  transform: change >= 0 ? 'rotate(0deg)' : 'rotate(180deg)',
                  mr: 0.5 
                }}
              />
              <Typography 
                variant="caption" 
                color={change >= 0 ? 'success.main' : 'error.main'}
              >
                {Math.abs(change)}% from last month
              </Typography>
            </Box>
          </Box>
          <StyledAvatar>
            {React.cloneElement(icon, { fontSize: 'medium' })}
          </StyledAvatar>
        </Box>
      </CardContent>
    </Card>
  );

  return link ? (
    <Link href={link} underline="none">
      {content}
    </Link>
  ) : content;
};

// Recent Items Table Component
const RecentItemsTable = ({ title, items, columns, link }) => {
  return (
    <Card elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
      <CardHeader
        title={title}
        action={
          link && (
            <Link href={link}>
              <IconButton size="small">
                <ChevronRight />
              </IconButton>
            </Link>
          )
        }
      />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {column.header}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 ? (
              items.map((item, itemIndex) => (
                <TableRow key={itemIndex} hover>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.format ? column.format(item[column.accessor]) : item[column.accessor]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default Dashboard;