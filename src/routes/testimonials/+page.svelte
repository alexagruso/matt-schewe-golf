<script lang="ts">
    import { enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";
    import { page } from "$app/stores";
    import type { PageProps } from "./$types";

    let editID: string = $state("");

    const resetEditForm = async () => {
        await invalidateAll();
        editID = "";
    };

    let { data, form }: PageProps = $props();
</script>

{#if $page.data.currentSession}
    <section class="col card">
        <div class="accent">
            <h1>Create new testimonial</h1>
        </div>
        <form class="col create-form" action="?/create" method="post" use:enhance>
            <div class="input-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" placeholder="e.g. John Smith" required />
            </div>
            <div class="input-group">
                <label for="name">Content</label>
                <textarea name="content" id="content" placeholder="e.g. Matt is a great teacher..." required></textarea>
            </div>
            <button type="submit">Create New Testimonial</button>
            {#if form?.createSuccess !== undefined}
                <h2>{form?.createMessage}</h2>
            {/if}
        </form>
    </section>
{:else}
    <h1>Student Testimonials:</h1>
{/if}

{#if data.testimonials?.length === 0}
    <h2 class="empty">No testimonials yet...</h2>
{:else if data.testimonials}
    {#each data.testimonials as testimonial}
        <section class="col card entry">
            <div class="col accent">
                <h2>{testimonial.name}</h2>
            </div>
            <div class="col content">
                <p>{testimonial.content}</p>
            </div>
            {#if $page.data.currentSession}
                <div class="row actions">
                    <form action="?/delete&id={testimonial._id}" method="post" use:enhance>
                        <button type="submit">Delete</button>
                    </form>
                    <button onclick={() => (editID === testimonial._id ? (editID = "") : (editID = testimonial._id))}
                        >Edit</button>
                    <form action="?/setpos&id={testimonial._id}&pos=1" onsubmit={invalidateAll} method="post">
                        <button class:active={testimonial.position === 1}>1</button>
                    </form>
                    <form action="?/setpos&id={testimonial._id}&pos=2" onsubmit={invalidateAll} method="post">
                        <button class:active={testimonial.position === 2}>2</button>
                    </form>
                    <form action="?/setpos&id={testimonial._id}&pos=3" onsubmit={invalidateAll} method="post">
                        <button class:active={testimonial.position === 3}>3</button>
                    </form>
                </div>
            {/if}
            {#if editID === testimonial._id}
                <form
                    class="rate col edit-form"
                    action="?/edit&id={testimonial._id}"
                    method="post"
                    onsubmit={resetEditForm}
                    use:enhance>
                    <div class="input-group">
                        <label for="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="e.g. John Smith"
                            value={testimonial.name}
                            required />
                    </div>
                    <div class="input-group">
                        <label for="name">Content</label>
                        <textarea
                            name="content"
                            id="content"
                            value={testimonial.content}
                            placeholder="e.g. Matt is a great teacher..."
                            required />
                    </div>
                    <button type="submit">Confirm Edit</button>
                </form>
            {/if}
        </section>
    {/each}
{:else}
    <h2>Failed to load testimonials...</h2>
{/if}

<div class="col content"></div>

<style lang="scss">
    .edit-form {
        gap: 0.5rem;

        padding: 1rem;
    }

    .actions {
        gap: 0.5rem;

        padding: 1rem;
    }

    .content {
        align-items: start;
        gap: 2rem;

        padding: 2rem;

        p {
            font-size: $paragraph;
            font-weight: 500;
            text-align: justify;
            color: $primary-1;
            white-space: pre-wrap;
        }

        @include tablet-and-below {
            .link {
                align-self: center;
            }
        }
    }

    .accent {
        gap: 1rem;

        padding: 2rem;

        background-color: $accent-2;

        h1,
        h2 {
            font-size: $header-2;
            text-transform: uppercase;
            color: $primary-6;
        }

        p {
            font-size: $paragraph;
            font-weight: 400;
            color: $primary-6;
        }
    }

    .card {
        gap: 0.5rem;

        box-shadow: 0rem 0.25rem 1rem 0.25rem rgba(black, 0.25);
    }

    .create-form {
        gap: 0.5rem;

        padding: 2rem;
    }

    h1 {
        align-self: center;

        color: $primary-1;
    }

    h2 {
        &.empty {
            align-self: center;
        }

        font-size: $header-5;
        color: $primary-3;
    }

    h3 {
        font-size: $header-4;
        font-weight: 500;
        color: $primary-6;
    }

    label {
        color: $accent-2;
    }

    input,
    textarea {
        transition: all 100ms;

        border: 0.1875rem solid $accent-2;
        border-radius: 1.125rem;
        padding: 0.75rem 2rem;

        background-color: $primary-6;
        outline: none;

        font-size: $header-5;
        color: $accent-2;

        &:focus {
            background-color: mix($primary-6, $accent-6, 75%);
        }

        &::placeholder {
            font-size: $header-5;
            color: rgba($accent-2, 75%);
        }
    }

    textarea {
        min-height: 30vh;
        resize: vertical;
    }

    button {
        align-self: flex-start;

        transition: all 100ms;

        border: 0.1875rem solid $accent-2;
        border-radius: 1.125rem;
        padding: 0.75rem 2rem;

        background-color: $primary-6;

        font-size: $header-5;
        color: $accent-2;

        &:hover,
        &.active {
            background-color: $accent-2;
            cursor: pointer;

            color: $primary-6;
        }
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>
