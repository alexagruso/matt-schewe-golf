import axios from "axios";
import type { PageServerLoad } from "./$types";
import type { Testimonial } from "@lib/server/schemas/testimonial";
import { HOST } from "$env/static/private";

export const load: PageServerLoad = async () => {
    try {
        const { data } = await axios.get(`${HOST}/api/testimonials`);

        return { testimonials: (data as Array<Testimonial>).reverse() };
    } catch (error) {
        console.error(error);
        console.error("ERROR: failed to load page data");
    }
};
