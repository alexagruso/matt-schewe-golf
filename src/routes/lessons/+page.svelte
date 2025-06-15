<script lang="ts">
    import { enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";
    import { page } from "$app/stores";
    import type { ActionData, PageServerData } from "./$types";

    let editID: string;

    let allowEmailSubmission = true;

    const resetEditForm = async () => {
        await invalidateAll();
        editID = "";
    };

    const handleEmail = () => {
        allowEmailSubmission = false;
    };

    export let data: PageServerData;
    export let form: ActionData;
</script>

<section class="col card">
    <div class="col intro">
        <h1 class="title">Lesson Rates</h1>
        <p class="subtitle">
            Matt offers several lesson packages, as well as discounts for youth lessons. To schedule a lesson, contact
            Matt directly or fill out the contact form.
        </p>
    </div>
    <div class="col content">
        <div class="table">
            <div class="thead col">
                <div class="tr row">
                    <div class="th package">Lesson Package</div>
                    <div class="th youth-price">Youth Price</div>
                    <div class="th adult-price">Adult Price</div>
                </div>
            </div>
            <div class="tbody col">
                {#if data.rates}
                    {#each data.rates as rate}
                        <div class="entry col">
                            <div class="tr row">
                                <div class="td package">{rate.name}</div>
                                <div class="td youth-price">
                                    {rate.youthPrice ? `$${rate.youthPrice.toLocaleString()}` : "--"}
                                </div>
                                <div class="td adult-price">${rate.adultPrice.toLocaleString()}</div>
                            </div>
                            {#if $page.data.currentSession}
                                <div class="col">
                                    <div class="actions row">
                                        <form action="?/delete&id={rate._id}" method="post" use:enhance>
                                            <button type="submit">Delete</button>
                                        </form>
                                        <button
                                            on:click={() => (editID === rate._id ? (editID = "") : (editID = rate._id))}
                                            >Edit</button>
                                    </div>
                                    {#if editID === rate._id}
                                        <form
                                            class="rate col"
                                            action="?/edit&id={rate._id}"
                                            method="post"
                                            on:submit={resetEditForm}
                                            use:enhance>
                                            <div class="input-group">
                                                <label for="name">Package Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    placeholder="e.g. 1 Half Hour Lesson"
                                                    value={rate.name} />
                                            </div>
                                            <div class="input-group">
                                                <label for="name">Youth Price</label>
                                                <input
                                                    type="number"
                                                    name="youth-price"
                                                    id="youth-price"
                                                    placeholder="e.g. 100"
                                                    value={rate.youthPrice} />
                                            </div>
                                            <div class="input-group">
                                                <label for="name">Adult Price</label>
                                                <input
                                                    type="number"
                                                    name="adult-price"
                                                    id="adult-price"
                                                    placeholder="e.g. 100"
                                                    value={rate.adultPrice} />
                                            </div>
                                            <button type="submit">Confirm Edit</button>
                                        </form>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                    {/each}
                {:else}
                    <div class="error">
                        <h2>Failed to load rates, please check back later.</h2>
                    </div>
                {/if}
            </div>
        </div>
        <h3 class="disclaimer">
            -- Indicates a lesson package that is unavailable. Lesson packages are non-refundable.
        </h3>
        {#if $page.data.currentSession}
            <form class="col rate-form" action="?/create" method="post" on:submit={invalidateAll} use:enhance>
                <div class="input-group">
                    <label for="name">Package Name</label>
                    <input type="text" name="name" id="name" placeholder="e.g. 1 Half Hour Lesson" required />
                </div>
                <div class="input-group">
                    <label for="name">Youth Price</label>
                    <input type="number" name="youth-price" id="youth-price" placeholder="e.g. 100" />
                </div>
                <div class="input-group">
                    <label for="name">Adult Price</label>
                    <input type="number" name="adult-price" id="adult-price" placeholder="e.g. 100" required />
                </div>
                <button type="submit">Create New Lesson Rate</button>
                {#if form?.createSuccess !== undefined}
                    <h2>{form?.createMessage}</h2>
                {/if}
            </form>
        {/if}
    </div>
</section>
<section class="col card contact">
    <div class="col content">
        <form class="col" action="?/email" method="post" on:submit={handleEmail} use:enhance>
            <div class="input-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" placeholder="e.g. John Smith" required />
            </div>
            <div class="row sender-contact">
                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="e.g. john@email.com" required />
                </div>

                <div class="input-group">
                    <label for="email">Phone</label>
                    <input type="tel" name="phone" id="phone" placeholder="e.g. (123) 456-7890" required />
                </div>
            </div>
            <div class="input-group">
                <label for="content">Message</label>
                <textarea name="content" id="content" placeholder="Message will be sent to Matt" required />
            </div>
            {#if allowEmailSubmission}
                <button type="submit">Send Email</button>
            {:else if form?.emailSuccess === true}
                <h2>Email successfully sent.</h2>
            {:else if form?.emailSuccess === false}
                <h2>Email failed to send, please try again later.</h2>
            {:else}
                <h2>Sending email...</h2>
            {/if}
        </form>
    </div>
    <div class="col intro">
        <h1 class="title">Contact</h1>
        <p class="subtitle">
            Matt can be contacted through email at <span class="highlight">matt@mattschewegolf.com</span> or by phone at
            <span class="highlight">(713) 291-8861</span>. Alternatively, he can be contacted by filling out and
            submitting the contact form.
        </p>
    </div>
</section>

<style lang="scss">
    .card {
        box-shadow: 0rem 0.25rem 1rem 0.25rem rgba(black, 0.25);

        color: $primary-1;
        margin: 0rem;

        &.contact {
            flex-direction: column-reverse;
        }
    }

    .intro {
        gap: 2rem;

        padding: 2rem;
        width: 100%;

        background-color: $accent-2;

        color: $primary-6;

        @include tablet-and-below {
            width: 100%;
        }
    }

    .title {
        font-size: $header-2;
        text-transform: uppercase;
    }

    .subtitle {
        font-size: $paragraph;
        font-weight: 400;

        @include desktop {
            max-width: 40%;
        }
    }

    .content {
        gap: 0.5rem;

        padding: 2rem;
        width: 100%;

        @include phone {
            padding: 2rem 0rem;
        }
    }

    .contact .content {
        @include phone {
            padding: 2rem;
        }
    }

    .thead,
    .tbody {
        box-shadow: 0rem 0.25rem 0.25rem 0rem rgba(black, 0.25);
    }

    .thead .tr {
        color: $primary-6;

        background-color: $primary-2;
    }

    .th {
        padding: 0.5rem;

        font-size: $header-5;
        text-align: center;
        text-transform: uppercase;
    }

    .td {
        font-size: $header-4;

        padding: 1rem;

        text-align: left;
    }

    .tbody .entry:nth-child(2n-1) {
        background-color: mix($primary-5, white, 50%);

        button:not(:hover) {
            background-color: mix($primary-5, white, 50%);
        }
    }

    .tr {
        align-items: center;

        .package {
            flex-grow: 1;
            width: 40%;
        }

        .youth-price {
            flex-grow: 1;
            width: 30%;
        }

        .adult-price {
            flex-grow: 1;
            width: 30%;
        }
    }

    .actions {
        padding: 0.5rem;
    }

    .disclaimer {
        font-size: $header-5;

        @include phone {
            padding: 1rem;
        }
    }

    .highlight {
        font-weight: 700;
        text-decoration: underline;
    }

    form {
        gap: 0.5rem;
    }

    .sender-contact {
        flex-grow: 1;
        justify-content: center;
        gap: 0.5rem;

        input {
            flex-grow: 1;

            min-width: 0%;
        }

        @include tablet-portrait-and-below {
            flex-direction: column;
        }
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
        min-height: 40vh;
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

        &:hover {
            background-color: $accent-2;
            cursor: pointer;

            color: $primary-6;
        }
    }

    .invalid-input {
        background-color: mix($primary-6, $accent-6, 75%);
    }

    .inactive {
        color: rgba($primary-6, 0);
    }

    .actions {
        gap: 0.5rem;
    }

    .rate {
        gap: 0.5rem;

        padding: 0.5rem;
    }

    label {
        color: $accent-2;
    }

    .input-group {
        display: flex;
        gap: 0.5rem;
        flex-direction: column;
        flex-grow: 1;
    }

    .rate-form {
        gap: 0.5rem;
    }

    .form-id {
        display: none;
    }

    h2 {
        color: $accent-2;
    }
</style>
