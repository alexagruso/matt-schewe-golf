import { Model, Schema, model } from "mongoose";

export interface Testimonial {
    _id: string;
    content: string;
    name: string;
    position: number;
}

const testimonialSchema = new Schema<Testimonial>({
    content: { type: String, required: true },
    name: { type: String, require: true },
    position: { type: Number, require: false },
});

let testimonials: Model<Testimonial>;

try {
    testimonials = model<Testimonial>("testimonials");
} catch (_) {
    try {
        testimonials = model<Testimonial>("testimonials", testimonialSchema);
    } catch (error) {
        console.error(error);
        console.error("ERROR: failed to initialize testimonial model");
    }
}

export { testimonials };
