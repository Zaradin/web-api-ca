import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { addMovieReview } from "../../api/movies-api";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ratings = [
    {
        value: 5,
        label: "Excellent",
    },
    {
        value: 4,
        label: "Good",
    },
    {
        value: 3,
        label: "Average",
    },
    {
        value: 2,
        label: "Poor",
    },
    {
        value: 0,
        label: "Terrible",
    },
];

const styles = {
    root: {
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
    },
    form: {
        width: "100%",
        "& > * ": {
            marginTop: 2,
        },
    },
    textField: {
        width: "40ch",
    },
    submit: {
        marginRight: 2,
    },
    snack: {
        width: "50%",
        "& > * ": {
            width: "100%",
        },
    },
};

const ReviewForm = ({ movie }) => {
    const [rating, setRating] = useState(3);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            author: "",
            review: "",
            rating: "3",
        },
    });

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleSnackClose = () => {
        setOpen(false);
        navigate("/movies/favorites");
    };

    const onSubmit = async (data) => {
        data.rating = rating;
        try {
            // Convert movie.id to a string
            const movieId = String(movie.id);

            // Use movieId when calling addMovieReview
            await addMovieReview(movieId, data.author, data.review, rating);
            //setOpen(true);
            toast.success("Review added successfully! 🎉", {
                duration: 2000,
            });
            navigate(`/reviews/${movieId}`, {
                state: { movie, author: data.author, review: data.review },
            });
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <Box component="div" sx={styles.root}>
            <Typography component="h2" variant="h3">
                Write a review
            </Typography>

            <Snackbar
                sx={styles.snack}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={handleSnackClose}
            >
                <MuiAlert
                    severity="success"
                    variant="filled"
                    onClose={handleSnackClose}
                >
                    <Typography variant="h4">
                        Thank you for submitting a review
                    </Typography>
                </MuiAlert>
            </Snackbar>

            <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="author"
                    control={control}
                    rules={{ required: "Name is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="author"
                            label="Author's name"
                            name="author"
                            autoFocus
                        />
                    )}
                />
                {errors.author && (
                    <Typography variant="h6" component="p">
                        {errors.author.message}
                    </Typography>
                )}
                <Controller
                    name="review"
                    control={control}
                    rules={{
                        required: "Review cannot be empty.",
                        minLength: {
                            value: 10,
                            message: "Review is too short",
                        },
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="review"
                            value={value}
                            onChange={onChange}
                            label="Review text"
                            id="review"
                            multiline
                            minRows={10}
                        />
                    )}
                />
                {errors.review && (
                    <Typography variant="h6" component="p">
                        {errors.review.message}
                    </Typography>
                )}

                <Controller
                    control={control}
                    name="rating"
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            id="select-rating"
                            select
                            variant="outlined"
                            label="Rating Select"
                            value={rating}
                            onChange={handleRatingChange}
                            helperText="Don't forget your rating"
                        >
                            {ratings.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                <Box sx={styles.buttons}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={styles.submit}
                    >
                        Submit
                    </Button>
                    <Button
                        type="reset"
                        variant="contained"
                        color="secondary"
                        sx={styles.submit}
                        onClick={() => {
                            reset({
                                author: "",
                                review: "",
                            });
                        }}
                    >
                        Reset
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default ReviewForm;
