import { testimonials } from "@lib/server/schemas/testimonial";
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { guardEndpoint } from "@lib/server/authentication/guards";

export const GET: RequestHandler = async () => {
    try {
        const data = await testimonials.find();
        return json(data);
    } catch (error) {
        console.error(error);
        console.error("ERROR: failed to get testimonials");

        return new Response("Failed to get testimonials", { status: 500 });
    }
};

export const POST: RequestHandler = async (event) => {
    try {
        if (!(await guardEndpoint(event))) {
            return new Response("Not authorized to access this endpoint", { status: 401 });
        }

        const newTestimonial = await event.request.json();
        await testimonials.insertMany(newTestimonial);

        return new Response("Successfully created new testimonial");
    } catch (error) {
        console.error(error);
        console.error("ERROR: failed to create new testimonial");

        return new Response("Failed to create new testimonial", { status: 500 });
    }
};

export const DELETE: RequestHandler = async (event) => {
    try {
        if (!(await guardEndpoint(event))) {
            return new Response("Not authorized to access this endpoint", { status: 401 });
        }

        const { id } = await event.request.json();
        await testimonials.deleteOne({ _id: id });

        return new Response("Successfully deleted testimonial");
    } catch (error) {
        console.error(error);
        console.error("ERROR: failed to delete testimonial");

        return new Response("Failed to delete testimonial", { status: 500 });
    }
};
