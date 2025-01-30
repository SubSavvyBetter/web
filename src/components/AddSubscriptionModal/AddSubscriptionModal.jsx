import { useState } from 'react';
import {
    Modal,
    Box,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

const AddSubscriptionModal = ({ open, handleClose, handleSubmit }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [trial, setTrial] = useState(false);

    const handleClickSubmit = (e) => {
        e.preventDefault();
        handleSubmit({
            name,
            price: Number(price),
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
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        sx={inputStyle}
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
                                onChange={(e) => setTrial(e.target.checked)}
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
