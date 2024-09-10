import React, { useState } from 'react';
import { Container, Typography, Tooltip, IconButton, Divider } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import { useBooks } from '../hooks/useBooks';
import BookList from './BookList';
import BookFormModal from './BookFormModal';
import BookDetailsModal from './BookDetailsModal';
import { Book } from '../types';

const BookManager: React.FC = () => {
    const { books, isLoading, mutate } = useBooks();
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [openFormModal, setOpenFormModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);

    const handleOpenForm = (book: Book | null = null) => {
        setSelectedBook(book);
        setOpenFormModal(true);
    };

    const handleOpenDetails = (book: Book) => {
        setSelectedBook(book);
        setOpenDetailsModal(true);
    };

    const handleCloseForm = () => {
        setSelectedBook(null);
        setOpenFormModal(false);
    };

    const handleCloseDetails = () => {
        setOpenDetailsModal(false);
    };

    const handleSuccess = () => {
        setSelectedBook(null);
        setOpenFormModal(false);
        mutate();
    };

    if (isLoading) return <Typography variant="h6">Loading...</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                Personal Library Manager
            </Typography>

            {/* Row for the Add Button */}
            <Grid2 container justifyContent="flex-end" alignItems="center" sx={{ mb: 2 }}>
                <Tooltip title="Add New Book" aria-label="add">
                    <IconButton color="primary" aria-label="add" onClick={() => handleOpenForm(null)}>
                        <AddIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Grid2>

            {/* Divider */}
            <Divider />

            {/* Book List */}
            <BookList books={books || []} onEdit={handleOpenForm} onViewDetails={handleOpenDetails} refreshBooks={mutate} />

            {/* Modal for Creating or Editing a Book */}
            <BookFormModal
                open={openFormModal}
                book={selectedBook}
                onClose={handleCloseForm}
                onSuccess={handleSuccess}
            />

            {/* Modal for Viewing Book Details */}
            <BookDetailsModal open={openDetailsModal} book={selectedBook} onClose={handleCloseDetails} />
        </Container>
    );
};

export default BookManager;
