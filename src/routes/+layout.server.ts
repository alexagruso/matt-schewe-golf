import mongoose from "mongoose";
import { building } from "$app/environment";
import { MONGODB_URI } from "$env/static/private";
import { sessions } from "@lib/server/schemas/session";
import type { LayoutServerLoad } from "./$types";

if (!building) {
    try {
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.error(error);
        console.error("ERROR: failed to connect to MongoDB");
    }
}

export const load: LayoutServerLoad = async (event) => {
    const sessionCookie = event.cookies.get("Session");
    let currentSession = null;

    if (sessionCookie) {
        currentSession = JSON.parse(sessionCookie);
    }

    try {
        if (!(await sessions.findOne(currentSession))) {
            event.cookies.delete("Session", { path: "/" });
            return {};
        }
    } catch (error) {
        console.error(error);
        console.error("ERROR: failed to load layout server data");
    }

    return { currentSession };
};
