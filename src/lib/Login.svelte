<script lang="ts">
    /**
     * Pour log un user 
     * 1. On importe le currentUser et pb de pocketbase
     * 2. On crée une variable name et password
     * 3. On crée une fonction login qui va appeler la fonction authWithPassword de pocketbase
     * 4. On crée une fonction signup qui va appeler la fonction create de pocketbase
     * 5. On crée une fonction signOut qui va appeler la fonction clear de pocketbase
     * 6. On crée un if else qui va afficher le nom de l'user si il est auth sinon un formulaire
     * 7. On crée un event listener sur le bouton signup qui va appeler la fonction signup
     * 8. On crée un event listener sur le bouton login qui va appeler la fonction login
     * 9. On crée un event listener sur le bouton signout qui va appeler la fonction signout
    */
    import { currentUser, pb } from "./pocketbase";
  import Products from "./Products.svelte";

    let username: string;
    let password: string;
    let email: string;

    // On peut utiliser async await pour attendre que la fonction soit finie
    
    async function login() {
        await pb.collection('users').authWithPassword(username, password, email);
    }


    async function signUp() {
        try 
        {const data = {
            username,
            password,
            email,
            passwordConfirm: password,
            name: 'hi mom'
        };

        const createdUser = await pb.collection('users').create(data);

        await login();
        }   
        catch (e) {
            console.log(e);
        }
    }

    function signOut() {
        pb.authStore.clear();
    }

</script>

<!-- On peut se connecter a la valeur actuelle de current user grace au $ de svelte -->

 {#if $currentUser} <!-- Si user est auth on affiche le nom de l'user -->
    <p>
        Signed as {$currentUser.username}
        <button on:click={signOut}>Sign out </button>
        <Products />
    </p>
    {:else} <!-- Si user n'est pas auth  -->
        <form 
            class="py-20 flex flex-col gap-5"
            on:submit="{(e) => e.preventDefault()}"
        >
            <input 
                type="email"
                placeholder="Email"  
                bind:value={email}
            >

            <input 
                type="text"
                placeholder="Username"  
                bind:value={username}  
            >
            <input 
                type="password"
                placeholder="Password"
                bind:value={password}
            >

            <button on:click={signUp} >Sign Up </button>
            <button on:click={login}>Login</button>
        </form>
{/if}