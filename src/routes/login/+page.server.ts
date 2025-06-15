import bcrypt from "bcryptjs";
import { isUser, users, type User } from "@lib/server/schemas/user";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import { isSession, sessions, type Session, createSession } from "@lib/server/schemas/session";

export const actions: Actions = {
    login: async (event) => {
        try {
            const data = Object.fromEntries(await event.request.formData());

            if (!isUser(data)) {
                return fail(400, { error: "Invalid input" });
            }

            const user: User | null = await users.findOne({ username: data.username });

            if (!user) {
                return fail(404, { error: "User does not exist" });
            }

            if (!(await bcrypt.compare(data.password, user.password))) {
                return fail(401, { error: "Incorrect password" });
            }

            const oldSession = JSON.parse(event.cookies.get("Session") ?? "{}") as Session;

            if (isSession(oldSession)) {
                if (oldSession.user == user.username) {
                    return fail(409, { error: "User is already logged in" });
                } else {
                    await sessions.deleteOne(oldSession);
                    event.cookies.delete("Session", { path: "/" });
                }
            }

            const newSession = createSession(user.username);

            await sessions.insertMany(newSession);
            event.cookies.set("Session", JSON.stringify(newSession), { path: "/" });
        } catch (error) {
            console.error(error);
            console.error("ERROR: failed to login");

            return fail(500, { error: "Failed to login, try again later" });
        }

        throw redirect(302, "/");
    },
};
