import axios from 'axios';
import { Icon } from '@iconify/react';
import styled1 from 'styled-components';
// import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import Iconify from 'src/components/iconify';

// import AppTasks from '../app-tasks';
// import AppNewsUpdate from '../app-news-update';
// import AppOrderTimeline from '../app-order-timeline';
import AppSaleYear from '../app-sale-year';
import SalesByTimeChart from '../sale-by-time-chart'; // ไฟล์นี้เราเพิ่มเติมขึ้นมาเพื่อแสดง Line Chart

import AppCurrentVisits from '../app-current-visits';
// import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const StyledDiv = styled1.div`
  font-family: 'Prompt', sans-serif;
`;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [numberOfOrders, setNumberOfOrders] = useState(0);
  const [weeklySales, setWeeklySales] = useState(0);
  const [mostPurchasedMenuItems, setMostPurchasedMenuItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  // const [setPreviousWeeklySales] = useState(0);
  const [setDailySales] = useState({});
  const [totalProfit, setTotalProfit] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);
  const [weekSales, setWeekSales] = useState([]);
  const [yearlySales, setYearlySales] = useState([]);

  useEffect(() => {
    const fetchYearlySales = async () => {
      try {
        const response = await axios.get(
          'https://test-api-01.azurewebsites.net/api/saleorder/dashboard/salesByYear'
        );
        setYearlySales(response.data);
      } catch (error) {
        console.error('Error fetching yearly sales:', error);
      }
    };

    fetchYearlySales();
  }, []);

  useEffect(() => {
    const fetchWeekSales = async () => {
      try {
        const response = await axios.get(
          'https://test-api-01.azurewebsites.net/api/saleorder/dashboard/salesByWeek'
        );
        setWeekSales(response.data);
      } catch (error) {
        console.error('Error fetching weekly sales:', error);
      }
    };

    fetchWeekSales();
  }, []);

  useEffect(() => {
    const fetchMonthlySales = async () => {
      try {
        const response = await axios.get(
          'https://test-api-01.azurewebsites.net/api/saleorder/dashboard/salesByMonth'
        );
        setMonthlySales(response.data);
      } catch (error) {
        console.error('Error fetching monthly sales:', error);
      }
    };

    fetchMonthlySales();
  }, []);

  useEffect(() => {
    const fetchTotalProfit = async () => {
      try {
        const response = await axios.get(
          'https://test-api-01.azurewebsites.net/api/saleorder/dashboard/total-profit'
        );
        setTotalProfit(response.data.totalProfit);
      } catch (error) {
        console.error('Error fetching total profit:', error);
      }
    };

    fetchTotalProfit();
  }, []);

  useEffect(() => {
    async function fetchWeeklyTotal() {
      try {
        const response = await axios.get(
          'https://test-api-01.azurewebsites.net/api/saleorder/dashboard/weeklyTotal'
        );
        setDailySales(response.data.dailySales);
      } catch (error) {
        console.error('Error fetching weekly total:', error);
      }
    }

    fetchWeeklyTotal();
  }, [setDailySales]);

  // useEffect(() => {
  //   async function fetchWeeklyTotal() {
  //     try {
  //       const response = await axios.get(
  //         'https://test-api-01.azurewebsites.net/api/saleorder/dashboard/weeklyTotal'
  //       );
  //       setDailySales(response.data.dailySales);
  //     } catch (error) {
  //       console.error('Error fetching weekly total:', error);
  //     }
  //   }

  //   async function fetchPreviousWeeklyTotal() {
  //     try {
  //       const response = await axios.get(
  //         'https://test-api-01.azurewebsites.net/api/saleorder/dashboard/previousWeeklyTotal'
  //       );
  //       setPreviousWeeklySales(response.data.totalSales);
  //     } catch (error) {
  //       console.error('Error fetching previous weekly total:', error);
  //     }
  //   }

  //   fetchWeeklyTotal();
  //   fetchPreviousWeeklyTotal();
  // }, [setPreviousWeeklySales, setDailySales]);

  // const chartData = {
  //   labels: Object.keys(dailySales),
  //   series: [
  //     {
  //       name: 'ยอดขาย',
  //       type: 'line',
  //       fill: 'solid',
  //       data: Object.values(dailySales),
  //     },
  //   ],
  // };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'https://test-api-01.azurewebsites.net/api/inventoryitems/dashboard/all'
        );
        setItemCount(response.data.itemCount);
      } catch (error) {
        console.error('Error fetching item count:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchMostPurchasedMenuItems() {
      try {
        const response = await axios.get(
          'https://test-api-01.azurewebsites.net/api/saleorder/dashboard/mostPurchasedMenuItems'
        );
        setMostPurchasedMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching most purchased menu items:', error);
      }
    }

    fetchMostPurchasedMenuItems();
  }, []);

  useEffect(() => {
    async function fetchWeeklySales() {
      try {
        const response = await axios.get(
          'https://test-api-01.azurewebsites.net/api/saleorder/dashboard/dailySales'
        );
        setWeeklySales(response.data.totalSales);
      } catch (error) {
        console.error('Error fetching weekly sales:', error);
      }
    }

    fetchWeeklySales();
  }, []);

  useEffect(() => {
    async function fetchSaleOrders() {
      try {
        const response = await axios.get(
          'https://test-api-01.azurewebsites.net/api/saleorder/dashboard/saleOrders'
        );
        setNumberOfOrders(response.data.numberOfOrders);
      } catch (error) {
        console.error('Error fetching sale orders:', error);
      }
    }

    fetchSaleOrders();
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const timeString = currentTime.toLocaleTimeString('th-TH', {
    hour12: false,
  });
  // const percentageChange = ((weeklySales - previousWeeklySales) / previousWeeklySales) * 100;
  // const thaiWeekNames = [
  //   'วันจันทร์',
  //   'วันอังคาร',
  //   'วันพุธ',
  //   'วันพฤหัสบดี',
  //   'วันศุกร์',
  //   'วันเสาร์',
  //   'วันอาทิตย์',
  // ];

  const thaiMonths = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ];

  // สร้าง object ที่เปลี่ยนเลขเดือนเป็นชื่อเดือนภาษาไทย
  const thaiMonthNames = Object.fromEntries(
    Array.from({ length: 12 }, (_, i) => [i + 1, thaiMonths[i]])
  );

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {/* สวัสดี 👋 */}
        {/* <br /> */}
        <StyledDiv>
          เวลาปัจจุบันคือ {timeString} <Icon icon="twemoji:alarm-clock" />
        </StyledDiv>
      </Typography>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="ยอดขายวันนี้ (บาท)"
            total={weeklySales}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/shopping-bag.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="กำไร (บาท) วันนี้"
            total={totalProfit.toFixed(2)}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/profits.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="จำนวนออเดอร์ทั้งหมด (รายการ)"
            total={numberOfOrders} // ใช้จำนวนออเดอร์ที่ได้รับจากเซิร์ฟเวอร์
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/order.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="จำนวนวัตถุดิบทั้งหมด"
            total={itemCount}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/inventory.png" />}
          />
        </Grid>
        {/* <Grid xs={12}>
          <AppWebsiteVisits
            title="ยอดขาย 7 วันหลังสุด"
            chart={{
              labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
              colors: [], // Add your colors here if needed
              series: [{ name: 'Sales', data: [100, 200, 150, 300, 250, 180, 220] }],
              options: {}, // Add any additional options here
            }}
          />
        </Grid> */}
        <Grid xs={12}>
          <SalesByTimeChart />
        </Grid>
        <Grid xs={12}>
          <AppSaleYear />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="สินค้าขายดีสุด"
            chart={{
              series: mostPurchasedMenuItems.map((item) => ({
                label: item.name,
                value: item.quantity,
              })),
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={7}>
          <AppConversionRates
            title="ยอดขายรายเดือน"
            // subheader="(+43%) than last year"
            chart={{
              series: monthlySales.map((month) => ({
                label: thaiMonthNames[month._id],
                value: month.totalSales,
              })),
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="ยอดขายตามสัปดาห์"
            chart={{
              series: weekSales.map((week) => ({
                label: `สัปดาห์ที่ ${week._id}`,
                value: week.totalSales,
              })),
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={7}>
          <AppConversionRates
            title="ยอดขายตามปี"
            // subheader="(+43%) than last year"
            chart={{
              series: yearlySales.map((year) => ({
                label: year._id.year,
                value: year.totalSales,
              })),
            }}
          />
        </Grid>
        {/* 
        
        
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="ยอดขายรายเดือน"
            chart={{
              series: monthlySales.map((month) => ({
                label: thaiMonthNames[month._id],
                value: month.totalSales,
              })),
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="ยอดขายรายปี"
            chart={{
              series: yearlySales.map((year) => ({
                label: year._id.year,
                value: year.totalSales,
              })),
            }}
          />
        </Grid>
        
        
        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>



        {/* <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
