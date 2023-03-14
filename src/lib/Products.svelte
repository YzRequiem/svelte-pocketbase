<!-- Page qui affiche la liste des produits  -->

<script lang="ts">
    import { pb } from "./pocketbase";
    import { onMount } from "svelte";

    export let products = [] ;

    onMount(async () => {
        const records = await pb.collection('products').getFullList({
    sort: '-created',
        });
        products = records;
    });

</script>

<!-- On affiche la liste des produits -->

{#each products as product}
    <div class="">
        <h2>{product.name}</h2>
        <p>{product.price}</p>
    </div>
{/each}

