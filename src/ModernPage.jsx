import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    TextField,
    Card,
    CardContent,
    Input,
    styled,
} from '@mui/material';
import featherImage from './feather.png'; // Import your feather image
import mainImage from './first.jpeg'; // Import your main image
import './ModernPage.css';
import axios from 'axios';

// Styled upload button with larger size
const UploadButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#c7a07a',
    color: '#fff',
    fontSize: '18px', // Increase font size
    padding: '12px 24px', // Increase padding
    '&:hover': {
        backgroundColor: '#a57a4e',
    },
}));

const ModernPage = () => {
    const [images, setImages] = useState([]); // State to hold multiple images
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);
    const [uploadedImagePaths, setUploadedImagePaths] = useState([]); // For storing uploaded image paths
    const [file, setFile] = useState();
    const [previewImage, setPreviewImage] = useState(null); // State for previewing uploaded image

    // Handle multiple image uploads
    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files);
        setFile(files[0]);

        // Set preview image
        if (files[0]) {
            setPreviewImage(URL.createObjectURL(files[0]));
        }
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (comment.trim()) {
            try {
                const formData = new FormData();
                formData.append('photo', file);
                formData.append('message', comment);
                const response = await axios.post('https://gmtt.dooors.co/api/upload', formData);

                const data = response.data;
                if (data.message) {
                    alert('շնորհակալություն մեր օրը հիշարժան դարձնելու համար');
                }

                // Store image URLs or paths from server in state
                setUploadedImagePaths(data.imageUrls || []);
                setCommentsList([...commentsList, comment]); // Append new comment to list
                setComment(''); // Reset the comment input
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        }
    };

    // Feather creation effect
    const createFeather = () => {
        const feather = document.createElement('img');
        feather.src = featherImage;
        feather.className = 'feather';
        feather.style.left = Math.random() * 100 + 'vw';
        feather.style.animationDuration = Math.random() * 4 + 4 + 's';
        feather.style.opacity = Math.random() * 0.5 + 0.5;
        document.body.appendChild(feather);

        setTimeout(() => {
            feather.remove();
        }, 8000);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            createFeather();
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4, backgroundColor: '#fdfce8', borderRadius: 2, padding: 2 }}>
            <Card variant="outlined" sx={{ backgroundColor: '#e2ceb1', borderRadius: 2 }}>
                <CardContent style={{ borderRadius: '10%' }}>
                    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                        <Box sx={{ flexGrow: 1, height: 2, backgroundColor: '#c7a07a', marginRight: 1 }} />
                        <Typography
                            variant="h4"
                            align="center"
                            sx={{
                                background: 'linear-gradient(to right, #c7a07a, #e2ceb1)',
                                WebkitBackgroundClip: 'text',
                            }}
                        >
                            Սիրելի հյուրեր
                        </Typography>
                        <Box sx={{ flexGrow: 1, height: 2, backgroundColor: '#c7a07a', marginLeft: 1 }} />
                    </Box>

                    <Typography variant="body1" align="center" paragraph sx={{ color: '#5b4e41' }}>
                        Մենք շատ ուրախ ենք, որ մեզ համար այսպիսի կարևոր նշանակություն ունեցող օրը մեր կողքին եք...
                    </Typography>

                    {/* Main Image Section with hover zoom */}
                    <Box
                        component="img"
                        sx={{
                            width: '100%',
                            borderRadius: 1,
                            boxShadow: 3,
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                            marginBottom: 2,
                        }}
                        src={mainImage}
                    />

                    <Typography variant="body1" align="center" paragraph sx={{ color: '#5b4e41' }}>
                        Անչափ շնորհակալ կլինենք, եթե կիսվեք մեզ հետ այս գեղեցիկ օրվա Ձեր էմոցիաներով, բարեմաղթանքներով, և Ձեր կողմից արված գեղեցիկ նկարներով:
                    </Typography>
                    <Typography variant="body1" align="center" paragraph sx={{ color: '#5b4e41' }}>
                        Սիրով Գագիկ և Միլենա ❤️
                    </Typography>
                </CardContent>
            </Card>

            <Box textAlign="center" mb={4} mt={2}>
                <Box sx={{ borderBottom: '1px solid #c7a07a', marginBottom: 2 }} /> {/* Separator */}
            </Box>

            {/* Image Upload Section */}
            <Box textAlign="center" mb={4}>
                <Card variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', backgroundColor: '#e2ceb1' }}>
                    {previewImage ? (
                        <>
                            <Typography variant="body2" sx={{ color: '#5b4e41', mb: 2 }}>
                                Շնորհակալություն լուսանկարի համար
                            </Typography>
                            {/* Display the uploaded image preview */}
                            <Box
                                component="img"
                                src={previewImage}
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 1,
                                    boxShadow: 2,
                                    marginBottom: 2,
                                }}
                                alt="Uploaded preview"
                            />
                        </>
                    ) : (
                        ''
                    )}
                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        sx={{ display: 'none' }}
                        id="upload-button" // Link to the UploadButton
                    />
                    <UploadButton variant="contained" component="label" htmlFor="upload-button">
                        Ներբեռնել նկար
                    </UploadButton>
                </Card>
            </Box>

            {/* Comment Section */}
            <Card variant="outlined" sx={{ padding: 2, backgroundColor: '#e2ceb1', borderRadius: 2 }}>
                <form onSubmit={handleCommentSubmit}>
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

                <Box mt={2}>
                    {commentsList.length ? 'Շնորհակալություն մաղթանքների համար' : ''}
                </Box>
            </Card>
        </Container>
    );
};

export default ModernPage;
