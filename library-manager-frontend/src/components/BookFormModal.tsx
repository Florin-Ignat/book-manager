import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BookForm from './BookForm';
import { Book } from '../types';

interface BookFormModalProps {
    open: boolean;
    book: Book | null;
    onClose: () => void;
    onSuccess: () => void;
}

const BookFormModal: React.FC<BookFormModalProps> = ({ open, book, onClose, onSuccess }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: 300, sm: 400 },
                maxHeight: '90vh',  // Limit the modal height for scrollable content
                overflowY: 'auto',  // Enable scrolling inside the modal
                bgcolor: 'background.paper',
                boxShadow: 24,
                borderRadius: '10px',
                p: 4,
            }}>
                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>

                {/* Modal Title */}
                <Typography variant="h6" gutterBottom>
                    {book?.id ? 'Edit Book' : 'Add New Book'}
                </Typography>

                {/* Book Form */}
                <BookForm
                    initialValues={book || { id: '', title: '', author: '', genre: '', description: '', image: '' }}
                    onSuccess={onSuccess}
                />
            </Box>
        </Modal>
    );
};

export default BookFormModal;
