import "./style.css";
import "vite/modulepreload-polyfill";

const app = document.querySelector("#app") as HTMLDivElement;

app.innerHTML = `
    <div>
        <h1>Hello</h1>
    </div>
`;
