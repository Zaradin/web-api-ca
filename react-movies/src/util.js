import truncate from "lodash/truncate";
import { deepOrange, deepPurple } from "@mui/material/colors";

export function excerpt(string) {
    return truncate(string, {
        length: 400, // maximum 400 characters
        separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
    });
}

export const getRandomColor = () => {
    const colors = [
        deepOrange[500],
        deepPurple[500],
        "#00BCD4", // Teal
        "#4CAF50", // Green
        "#FF5722", // Deep Orange
        "#E91E63", // Pink
        "#2196F3", // Blue
        "#9C27B0", // Purple
        "#FFC107", // Amber
        "#FF9800", // Orange
        "#8BC34A", // Light Green
        "#009688", // Teal
        "#673AB7", // Deep Purple
        "#3F51B5", // Indigo
        "#00BCD4", // Cyan
        "#607D8B", // Blue Grey
        "#795548", // Brown
        "#607D8B", // Blue Grey
        "#CDDC39", // Lime
    ];

    return colors[Math.floor(Math.random() * colors.length)];
};
