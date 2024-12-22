import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ActorCard from "../actorCard";

function TrendingPeopleListPageTemplate({ people, title }) {
    const [sortCriteria, setSortCriteria] = useState("popularity_desc");

    // Update sorting criteria based on user selection
    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
    };

    // Sort people array based on the selected criteria
    const sortedPeople = [...people].sort((a, b) => {
        if (sortCriteria === "popularity_desc") {
            return b.popularity - a.popularity;
        } else if (sortCriteria === "popularity_asc") {
            return a.popularity - b.popularity;
        } else if (sortCriteria === "name_asc") {
            return a.name.localeCompare(b.name);
        } else if (sortCriteria === "name_desc") {
            return b.name.localeCompare(a.name);
        }
        return 0;
    });

    return (
        <>
            <FormControl
                variant="outlined"
                sx={{ marginBottom: 2, minWidth: 200 }}
            >
                <InputLabel>Sort By</InputLabel>
                <Select
                    label="Sort By"
                    value={sortCriteria}
                    onChange={handleSortChange}
                >
                    {/* the menu items are each selection in the menu to sort by */}
                    <MenuItem value="popularity_desc">
                        Popularity (Most to Least)
                    </MenuItem>
                    <MenuItem value="popularity_asc">
                        Popularity (Least to Most)
                    </MenuItem>
                    <MenuItem value="name_asc">Name (A to Z)</MenuItem>
                    <MenuItem value="name_desc">Name (Z to A)</MenuItem>
                </Select>
            </FormControl>

            <Grid container spacing={2} sx={{ padding: "20px" }}>
                <Grid item container spacing={2}>
                    {sortedPeople.map((person) => (
                        <Grid key={person.id} item xs={12} sm={6} md={4} lg={3}>
                            <ActorCard actor={person} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    );
}

export default TrendingPeopleListPageTemplate;
