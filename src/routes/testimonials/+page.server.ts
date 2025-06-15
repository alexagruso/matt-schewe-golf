import axios from "axios";
import type { Actions, PageServerLoad } from "./$types";
import { HOST } from "$env/static/private";
import { testimonials, type Testimonial } from "@lib/server/schemas/testimonial";

export const load: PageServerLoad = async () => {
    try {
        const { data } = await axios.get(`${HOST}/api/testimonials`);

        return { testimonials: (data as Array<Testimonial>).reverse() };
    } catch (error) {
        console.error(error);
        console.error("ERROR: failed to load page data");
    }
};

export const actions: Actions = {
    edit: async (event) => {
        try {
            const data = Object.fromEntries(await event.request.formData());
            const id = event.url.searchParams.get("id");

            await testimonials.updateOne(
                { _id: id },
                {
                    name: data.name,
                    content: data.content,
                },
            );

            return { editSuccess: true };
        } catch (error) {
            console.error(error);
            console.error("ERROR: failed to edit testimonial");

            return { editSuccess: false };
        }
    },

    create: async (event) => {
        try {
            const data = Object.fromEntries(await event.request.formData());

            await axios.post(`${HOST}/api/testimonials`, {
                name: data.name,
                content: data.content,
            });

            return { createSuccess: true, createMessage: "Successfully created new testimonial" };
        } catch (error) {
            console.error(error);
            console.error("ERROR: failed to create new testimonial");

            return { createSuccess: false, createMessage: "Failed to create new testimonial, try again later" };
        }
    },

    delete: async (event) => {
        try {
            const id = event.url.searchParams.get("id");
            await axios.delete(`${HOST}/api/testimonials`, { data: { id } });

            return { deleteSuccess: true };
        } catch (error) {
            console.error(error);
            console.error("ERROR: failed to delete testimonial");

            return { deleteSuccess: false };
        }
    },

    setpos: async (event) => {
        try {
            const id = event.url.searchParams.get("id");
            const position = event.url.searchParams.get("pos");

            const otherId = await testimonials.findOne({ position });

            if (otherId) {
                await testimonials.updateOne(
                    { _id: id },
                    {
                        position,
                    },
                );

                await testimonials.updateOne(
                    { _id: otherId._id.toString() },
                    {
                        position: null,
                    },
                );
            } else {
                await testimonials.updateOne(
                    { _id: id },
                    {
                        position,
                    },
                );
            }

            return { editSuccess: true };
        } catch (error) {
            console.error(error);
            console.error("ERROR: failed to change testimonial position");

            return { editSuccess: false };
        }
    },
};
