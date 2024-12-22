import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import CardActions from "@mui/material/CardActions";
import actorImgPlaceholder from "../../images/actor-image-place-holder.png";
import TheatersIcon from "@mui/icons-material/Theaters";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import PopularIcon from "@mui/icons-material/TrendingUp";

const ActorCard = ({ actor }) => {
    return (
        <Card>
            <CardHeader
                title={actor.name}
                sx={{
                    textWrap: "nowrap",
                }}
            />

            <CardMedia
                sx={{ height: 500 }}
                component="img"
                image={
                    actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : actorImgPlaceholder
                }
                alt={actor.name}
            />

            <CardContent>
                {actor.character ? (
                    <Grid container>
                        <Grid size={{ xs: 10 }}>
                            <Typography variant="h6" component="p">
                                <TheatersIcon fontSize="small" />
                                {actor.character}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 2 }}>
                            <Typography variant="h6" component="p">
                                {actor.gender === 1 ? (
                                    <WomanIcon fontSize="large" />
                                ) : actor.gender === 2 ? (
                                    <ManIcon fontSize="large" />
                                ) : null}
                            </Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container>
                        <Grid size={{ xs: 6 }}>
                            <Typography variant="h6" component="p">
                                <TheatersIcon fontSize="small" />
                                {"  "} {actor.known_for_department}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <Typography variant="h6" component="p">
                                <PopularIcon fontSize="small" />
                                {"  "} {actor.popularity}{" "}
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </CardContent>
            <CardActions disableSpacing>
                <Link to={`/actor/${actor.id}`}>
                    <Button variant="outlined" size="medium" color="primary">
                        More Info ...
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};
export default ActorCard;
