import "./style.css";
import { Article } from "./types/dataTypes";

const testBtn = document.querySelector("#test") as HTMLButtonElement;

testBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("/api/articles");
        const data: Article[] = await response.json();
        console.log(data);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
});
