import { useState } from 'react';
import {
    Modal,
    Box,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

const MAX_INT_VALUE = 2147483647;

const AddSubscriptionModal = ({ open, handleClose, handleSubmit }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [trial, setTrial] = useState(false);
    const [priceError, setPriceError] = useState('');

    const validatePrice = (value) => {
        const numValue = Number(value);
        if (numValue > MAX_INT_VALUE) {
            setPriceError('Price exceeds maximum allowed value');
            return false;
        }
        if (numValue < 0) {
            setPriceError('Price cannot be negative');
            return false;
        }
        setPriceError('');
        return true;
    };

    const handlePriceChange = (e) => {
        if (!trial) {
            const value = e.target.value;
            setPrice(value);
            validatePrice(value);
        }
    };

    const handleTrialChange = (e) => {
        const isTrialChecked = e.target.checked;
        setTrial(isTrialChecked);
        if (isTrialChecked) {
            setPrice('0');
            setPriceError('');
        }
    };

    const handleClickSubmit = (e) => {
        e.preventDefault();
        if (!trial && !validatePrice(price)) {
            return;
        }
        handleSubmit({
            name,
            price: trial ? 0 : Number(price),
            start_date: startDate,
            end_date: endDate,
            trial,
            status: 'ACTIVE',
        });
        setName('');
        setPrice('');
        setStartDate('');
        setEndDate('');
        setTrial(false);
        setPriceError('');
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#1e1b2e',
        border: '2px solid #2f2b3a',
        borderRadius: '8px',
        boxShadow: 24,
        p: 4,
    };

    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#ffffff3b',
            },
            '&:hover fieldset': {
                borderColor: '#fff',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#ffffff8a',
        },
        '& .MuiInputBase-input': {
            color: '#fff',
        },
        marginBottom: 2,
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
                <h2 className="text-white text-xl mb-4">
                    Add New Subscription
                </h2>
                <form onSubmit={handleClickSubmit} className="flex flex-col">
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        sx={inputStyle}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        value={trial ? '0' : price}
                        onChange={handlePriceChange}
                        required
                        error={!!priceError}
                        helperText={priceError}
                        disabled={trial}
                        inputProps={{
                            min: 0,
                            max: MAX_INT_VALUE,
                            step: '0.01',
                        }}
                        FormHelperTextProps={{
                            sx: { color: '#ef4444' },
                        }}
                        sx={{
                            ...inputStyle,
                            '& .Mui-disabled': {
                                '-webkit-text-fill-color': '#666 !important',
                                backgroundColor: '#2f2b3a',
                            },
                        }}
                    />
                    <TextField
                        label="Start Date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        InputLabelProps={{ shrink: true }}
                        sx={inputStyle}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        InputLabelProps={{ shrink: true }}
                        sx={inputStyle}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={trial}
                                onChange={handleTrialChange}
                                sx={{ color: '#fff' }}
                            />
                        }
                        label="Trial"
                        sx={{ color: '#fff', mb: 2 }}
                    />
                    <div className="flex gap-2">
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={!trial && !!priceError}
                            sx={{
                                bgcolor: '#6366f1',
                                '&:hover': { bgcolor: '#4f46e5' },
                                flex: 1,
                            }}
                        >
                            Add
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            sx={{
                                color: '#fff',
                                borderColor: '#fff',
                                '&:hover': { borderColor: '#fff' },
                                flex: 1,
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default AddSubscriptionModal;
