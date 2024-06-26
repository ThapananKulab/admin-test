import axios from 'axios';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';
import styled1 from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Box,
  Grid,
  Paper,
  Button,
  Select,
  MenuItem,
  Container,
  TextField,
  IconButton,
  InputLabel,
  Typography,
  FormControl,
} from '@mui/material';

import './style.css';

const RawForm = () => {
  const StyledDiv = styled1.div`
  font-family: 'Prompt', sans-serif;
`;
  const [name, setName] = useState('');
  const [realquantity, setRealquantity] = useState('');
  const [quantityInStock, setQuantityInStock] = useState('');
  const [type, setType] = useState('');
  const [unit, setUnit] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [initialName, setInitialName] = useState('');
  const [editableStock, setEditableStock] = useState(false);
  const [previousQuantityInStock, setPreviousQuantityInStock] = useState('');
  const [initialRealquantity, setInitialRealquantity] = useState('');
  const [initialQuantityInStock, setInitialQuantityInStock] = useState('');
  const [initialUnit, setInitialUnit] = useState('');
  const [initialUnitPrice, setInitialUnitPrice] = useState('');
  const [initialType, setInitialType] = useState('');

  const navigate = useNavigate();
  const { rawId } = useParams();

  const handleZeroButtonClick = () => {
    if (quantityInStock !== '0') {
      setPreviousQuantityInStock(quantityInStock); // บันทึกค่าปัจจุบันก่อนเปลี่ยน
      setQuantityInStock('0');
    } else {
      setQuantityInStock(previousQuantityInStock || ''); // กลับไปใช้ค่าเดิม หรือเป็นสตริงว่างถ้าไม่มีค่าเดิม
    }
  };

  useEffect(() => {
    if (rawId) {
      axios
        .get(`https://test-api-01.azurewebsites.net/api/inventoryitems/${rawId}`)
        .then((response) => {
          setName(response.data.name);
          setInitialName(response.data.name);
          setRealquantity(response.data.realquantity);
          setInitialRealquantity(response.data.realquantity);
          setQuantityInStock(response.data.quantityInStock.toString());
          setInitialQuantityInStock(response.data.quantityInStock.toString());
          setUnit(response.data.unit);
          setInitialUnit(response.data.unit);
          setInitialType(response.data.type);
          setType(response.data.type);
          setUnitPrice(response.data.unitPrice.toString());
          setInitialUnitPrice(response.data.unitPrice.toString());
        })
        .catch((error) => console.error('Error fetching inventory item:', error));
    }
  }, [rawId]);

  const units = [
    { value: 'กรัม', label: 'กรัม' },
    { value: 'มิลลิลิตร', label: 'มิลลิลิตร' },
    { value: 'ชิ้น', label: 'ชิ้น' },
    { value: 'ซอง', label: 'ซอง' },
  ];

  const types = [
    { value: 'ถุง', label: 'ถุง' },
    { value: 'กระปุก', label: 'กระปุก' },
    { value: 'ทั่วไป', label: 'ทั่วไป' },
    { value: 'กระป๋อง', label: 'กระป๋อง' },
    { value: 'แก้ว', label: 'แก้ว' },
    { value: 'ขวด', label: 'ขวด' },
    { value: 'ถัง', label: 'ถัง' },
    // Note: 'ทั่วไป' is repeated in your enum, consider if this is intentional or a mistake.
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name === initialName &&
      type === initialType && // Added this line to include the type in the comparison
      realquantity.toString() === initialRealquantity.toString() &&
      quantityInStock.toString() === initialQuantityInStock.toString() &&
      unit === initialUnit &&
      unitPrice.toString() === initialUnitPrice.toString()
    ) {
      toast.warn('ไม่มีการเปลี่ยนแปลง', {
        autoClose: 3000,
      });
      return;
    }

    // แสดง SweetAlert2 ยืนยันการเปลี่ยนแปลง
    Swal.fire({
      title: 'คุณแน่ใจไหม?',
      text: 'ต้องการแก้ไขข้อมูลนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        // ถ้าผู้ใช้คลิก "Yes", ดำเนินการแก้ไข
        updateInventoryItem();
      }
    });
  };

  const updateInventoryItem = async () => {
    const inventoryData = {
      name,
      type,
      unit,
      realquantity: Number(realquantity),
      quantityInStock: Number(quantityInStock),
      unitPrice: Number(unitPrice),
    };

    await axios.patch(
      `https://test-api-01.azurewebsites.net/api/inventoryitems/update/${rawId}`,
      inventoryData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    toast.success('แก้ไขวัตถุดิบสำเร็จ', {
      autoClose: 1000,
    });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4 }}>
          <StyledDiv>แก้ไขวัตถุดิบ</StyledDiv>
        </Typography>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="ชื่อวัตถุดิบ"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth variant="outlined" required sx={{ mb: 2 }}>
                <Select value={type} onChange={(e) => setType(e.target.value)} label="Type">
                  {types.map((typeOption) => (
                    <MenuItem key={typeOption.value} value={typeOption.value}>
                      {typeOption.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                type="number"
                value={realquantity}
                onChange={(e) => setRealquantity(e.target.value)}
                label="ปริมาณตามฉลาก"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                <TextField
                  type="number"
                  value={quantityInStock}
                  onChange={(e) => {
                    if (!editableStock) {
                      setPreviousQuantityInStock(e.target.value); // อัปเดตค่าก่อนหน้าทุกครั้งที่มีการเปลี่ยนแปลง
                    }
                    setQuantityInStock(e.target.value);
                  }}
                  label="ปริมาณใน Stock"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={!editableStock}
                />
                <IconButton color="primary" onClick={() => setEditableStock(!editableStock)}>
                  {editableStock ? (
                    <Icon icon="icon-park-outline:change-date-sort" />
                  ) : (
                    <Icon icon="icon-park-solid:change-date-sort" />
                  )}
                </IconButton>
                {/* ปุ่มใหม่สำหรับตั้งค่า quantityInStock เป็นศูนย์ */}
                {editableStock && (
                  <IconButton color="secondary" onClick={handleZeroButtonClick}>
                    <Icon
                      icon={
                        quantityInStock !== '0' ? 'mdi:numeric-0-box-outline' : 'mdi:backup-restore'
                      }
                    />
                  </IconButton>
                )}
              </Box>
              <FormControl fullWidth variant="outlined" required sx={{ mb: 2 }}>
                <InputLabel>หน่วยนับ</InputLabel>
                <Select value={unit} onChange={(e) => setUnit(e.target.value)} label="Unit">
                  {units.map((unitOption) => (
                    <MenuItem key={unitOption.value} value={unitOption.value}>
                      {unitOption.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                type="number"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                label="ราคาต่อหน่วย"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" gap={2} sx={{ mt: 3 }}>
            {/* ปุ่มที่ 1 */}
            <Button
              onClick={() => navigate('/invent')}
              variant="contained"
              color="error"
              size="large"
              sx={{
                minWidth: '200px', // ปรับความกว้างขั้นต่ำให้มากขึ้นหากต้องการ
                height: '56px',
                fontSize: '1.75rem',
                padding: '6px 8px', // ลด padding ข้างในปุ่มลงเล็กน้อย
              }}
            >
              <Icon icon="material-symbols:cancel-outline" sx={{ fontSize: '1.75rem' }} />
            </Button>
            {/* ปุ่มที่ 2 */}
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                minWidth: '200px', // ปรับความกว้างขั้นต่ำให้มากขึ้นหากต้องการ
                height: '56px',
                fontSize: '1.75rem',
                padding: '6px 8px', // ลด padding ข้างในปุ่มลงเล็กน้อย
              }}
            >
              <Icon icon="formkit:submit" sx={{ fontSize: '1.75rem' }} />
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default RawForm;
