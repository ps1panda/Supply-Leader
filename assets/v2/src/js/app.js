import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import "../css/app.css";
import dialogModal from "./alpine/dialog.js";

window.Alpine = Alpine;
Alpine.plugin(intersect);
Alpine.data("dialogModal", dialogModal);

Alpine.start();
