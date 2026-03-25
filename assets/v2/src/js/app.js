import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import "../css/app.css";
import dialogModal from "./alpine/dialog.js";
import horizontalPager from "./alpine/horizontal-pager.js";
import partnerMarquee from "./alpine/partner-marquee.js";

window.Alpine = Alpine;
Alpine.plugin(intersect);
Alpine.data("dialogModal", dialogModal);
Alpine.data("horizontalPager", horizontalPager);
Alpine.data("partnerMarquee", partnerMarquee);

Alpine.start();
