import axios from 'axios';
import { Icon } from '@iconify/react';
import styled1 from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import {
  Box,
  Stack,
  Modal,
  Paper,
  Table,
  Select,
  MenuItem,
  // Button,
  TableRow,
  TableCell,
  Container,
  TableHead,
  TableBody,
  IconButton,
  Typography,
  TableContainer,
} from '@mui/material';

const PurchaseReceiptPage = () => {
  const StyledDiv = styled1.div`
    font-family: 'Prompt', sans-serif;
  `;
  const navigate = useNavigate();
  const [purchaseReceipts, setPurchaseReceipts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          'https://test-api-01.azurewebsites.net/api/supplier/suppliers'
        );
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchPurchaseReceipts = async () => {
      try {
        const response = await axios.get(
          'https://test-api-01.azurewebsites.net/api/purchaseitem/all'
        );
        // เรียงลำดับข้อมูลจากเวลาล่าสุด
        const sortedReceipts = response.data.sort(
          (a, b) => new Date(b.received) - new Date(a.received)
        );
        setPurchaseReceipts(sortedReceipts);
      } catch (error) {
        console.error('Error fetching purchase receipts:', error);
      }
    };
    fetchPurchaseReceipts();
  }, []);

  const handleOpenModal = (receipt) => {
    setSelectedReceipt(receipt);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedReceipt(null);
    setOpenModal(false);
  };

  return (
    <div>
      <Container>
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
            <Typography variant="h4">
              <StyledDiv>ข้อมูลใบสั่งซื้อ</StyledDiv>
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center" marginBottom={4}>
            <Paper>
              <Select
                onChange={(event) => navigate(event.target.value)}
                defaultValue="/purchase/report"
                inputProps={{ 'aria-label': 'select' }}
              >
                {/* <MenuItem value="/report/daily">รายงานยอดขาย 7 วันย้อนหลัง</MenuItem> */}
                {/* <MenuItem value="/report/cancelbill">รายงานการยกเลิกบิล</MenuItem> */}
                <MenuItem value="/report/salemenu">ประวัติการขายสินค้า</MenuItem>
                <MenuItem value="/report/payment">รายงานการขายจำแนกตามประเภทการชำระเงิน</MenuItem>
                <MenuItem value="/report/cost">รายชื่อวัตถุดิบราคาต้นทุนสูงสุด</MenuItem>
                <MenuItem value="/purchase/withdraw-out">รายงานเบิกวัตถุดิบ</MenuItem>
                <MenuItem value="/purchase/report">ประวัติใบสั่งซื้อ</MenuItem>
                {/* <MenuItem value="/report/popular-menu">ยอดขายที่ขายดีสุดตามเวลา</MenuItem> */}
              </Select>
            </Paper>
          </Stack>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID ใบสั่งซื้อ</TableCell>
                  <TableCell>วันที่</TableCell>
                  <TableCell>เวลา</TableCell>
                  <TableCell>จำนวนเงินทั้งหมด</TableCell>
                  <TableCell>ร้านค้าที่ซื้อ</TableCell>
                  <TableCell>รายละเอียด</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchaseReceipts.map((receipt) => (
                  <TableRow key={receipt._id}>
                    <TableCell>{receipt._id}</TableCell>
                    <TableCell>{new Date(receipt.received).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <TableCell>
                        {new Date(receipt.received).toLocaleTimeString('th-TH')}
                      </TableCell>
                    </TableCell>
                    <TableCell>{receipt.total}</TableCell>
                    <TableCell>
                      {suppliers.find((supplier) => supplier._id === receipt.supplier)?.name}
                    </TableCell>

                    <TableCell>
                      <IconButton onClick={() => handleOpenModal(receipt)}>
                        <Icon icon="zondicons:news-paper" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <h2>รายละเอียดใบสั่งซื้อ</h2>
          <p>ID ใบสั่งซื้อ {selectedReceipt && selectedReceipt._id}</p>
          <p>
            ร้านค้าที่ซื้อ:{' '}
            {selectedReceipt &&
              suppliers.find((supplier) => supplier._id === selectedReceipt.supplier)?.name}
          </p>
          <p>วันที่ {selectedReceipt && new Date(selectedReceipt.received).toLocaleDateString()}</p>
          <p>
            เวลา {selectedReceipt && new Date(selectedReceipt.received).toLocaleTimeString('th-TH')}
          </p>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'green' }}>
            ยอดรวม {selectedReceipt && selectedReceipt.total}
          </p>

          <h3 style={{ textAlign: 'center' }}>วัตถุดิบ</h3>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedReceipt &&
                  selectedReceipt.items.map((item) => (
                    <TableRow key={item.item._id}>
                      <TableCell>{item.item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unitPrice}</TableCell>
                      <TableCell>{item.quantity * item.unitPrice}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Modal>
    </div>
  );
};

export default PurchaseReceiptPage;
