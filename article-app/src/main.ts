import "./style.css";

const testBtn = document.querySelector("#test") as HTMLButtonElement;

interface Test {
    test: string;
}

testBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("/api/test");
        const data: Test = await response.json();
        console.log(data.test);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
});
