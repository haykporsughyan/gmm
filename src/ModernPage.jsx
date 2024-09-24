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
    const [images, setImages] = useState([]); // State to hold multiple images
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);

    // Handle multiple image uploads
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImages]); // Append new images
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (comment.trim()) {
            setCommentsList([...commentsList, comment]);
            setComment('');
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
                                WebkitTextFillColor: 'transparent',
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
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <CardMedia
                                key={index}
                                component="img"
                                image={image}
                                alt={`Uploaded ${index + 1}`}
                                sx={{
                                    width: '100%', // Full width for each image
                                    height: 'auto',
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    marginBottom: 2, // Adds space between images
                                }}
                            />
                        ))
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
                    {commentsList.map((c, index) => (
                        <Card key={index} variant="outlined" sx={{ marginBottom: 1, backgroundColor: '#fdfce8' }}>
                            <CardContent>
                                <Typography variant="body2">{c}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Card>
        </Container>
    );
};

export default ModernPage;
