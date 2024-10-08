import React from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import { Book } from '../types';

interface BookDetailsModalProps {
    open: boolean;
    book: Book | null;
    onClose: () => void;
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ open, book, onClose }) => {
    if (!book) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: 300, sm: 400 },
                maxHeight: '90vh',  // Limit modal height for scrollable content
                overflowY: 'auto',  // Enable vertical scrolling if needed
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

                {/* Modal Content */}
                <Typography variant="h6" gutterBottom>
                    {book.title}
                </Typography>

                {/* Display image if available, with max width and height constraints */}
                {book.image && (
                    <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                        <img
                            src={book.image}
                            alt={book.title}
                            style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '10px', objectFit: 'contain' }}
                        />
                    </Box>
                )}

                <Typography variant="subtitle1" gutterBottom>
                    Author: {book.author}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    Genre: {book.genre}
                </Typography>

                {/* Description Text */}
                <Typography
                    variant="body2"
                    sx={{
                        whiteSpace: 'normal',  // Allow text to wrap
                        wordBreak: 'break-word',  // Ensure long words break correctly
                        overflowWrap: 'break-word',
                    }}
                    gutterBottom
                >
                    {book.description}
                </Typography>

            </Box>
        </Modal>
    );
};

export default BookDetailsModal;
