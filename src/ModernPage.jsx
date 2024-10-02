import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    TextField,
    Card,
    CardContent,
    CardMedia,
    Input,
    styled,
} from '@mui/material';
import featherImage from './feather.png'; // Import your feather image
import mainImage from './first.jpeg'; // Import your main image
import './ModernPage.css';

// Styled upload button
const UploadButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#c7a07a',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#a57a4e',
    },
}));

const ModernPage = () => {
    const [selectedImage, setSelectedImage] = useState(null); // State for single image
    const [comment, setComment] = useState(''); // State for the comment
    const [previewImage, setPreviewImage] = useState(null); // State for the preview image

    // Handle image selection and preview
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file); // Store the selected file
            setPreviewImage(URL.createObjectURL(file)); // Generate a preview URL
        }
    };

    // Handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        if (!selectedImage || !comment.trim()) {
            alert("Please select an image and enter a comment.");
            return;
        }

        const formData = new FormData();
        formData.append('photo', selectedImage); // Append image with the field name 'photo' to match Multer
        formData.append('message', comment); // Append the comment

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.message) {
                alert(data.message); // Display success message
            }
        } catch (error) {
            console.error('Error uploading the image:', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4, backgroundColor: '#fdfce8', borderRadius: 2, padding: 2 }}>
            <Card variant="outlined" sx={{ backgroundColor: '#e2ceb1', borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" align="center" sx={{ color: '#5b4e41', marginBottom: 2 }}>
                        Սիրելի հյուրեր
                    </Typography>

                    <Typography variant="body1" align="center" paragraph sx={{ color: '#5b4e41' }}>
                        Կիսվեք մեզ հետ այս գեղեցիկ օրվա Ձեր էմոցիաներով և նկարներով:
                    </Typography>

                    {/* Preview image section */}
                    {previewImage && (
                        <Box textAlign="center" mb={2}>
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{
                                    maxWidth: '150px',
                                    maxHeight: '150px',
                                    borderRadius: '8px',
                                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </Box>
                    )}

                    <Box textAlign="center" mb={4}>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            sx={{ display: 'none' }}
                            id="upload-button"
                        />
                        <UploadButton variant="contained" component="label" htmlFor="upload-button">
                            Ներբեռնել նկար
                        </UploadButton>
                    </Box>

                    {/* Comment and submission form */}
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            label="Կիսվեք տպավորություններով..."
                            multiline
                            fullWidth
                            rows={4}
                            variant="outlined"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Կիսվել
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ModernPage;
