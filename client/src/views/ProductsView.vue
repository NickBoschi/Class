<script setup lang="ts">
    import { computed, reactive, ref, watch } from "vue";
    import { RouterLink } from "vue-router";
    import { getProducts, type Product } from "../stores/products";
    import { addProductToCart } from "@/stores/cart";

    const products = reactive(getProducts());

    const search = ref("");

    function addToCart(product: Product) {
        addProductToCart(product);
    }

    // const results = ref(products);

    // function searchProducts() {
    //     results.value = products.filter((product) => { 
    //         return product.title.toLowerCase().includes(search.value.toLowerCase());
    //     });
    // }

    // watch(search, searchProducts);

</script>

<template>
    <div>
        <div>
            <input class="input" type="text" placeholder="Search" v-model="search" />
        </div>
        <div class="products">
            <RouterLink class="product" v-for="product in products" :key="product.id" :to="`/product/${product.id}`" v-show="product.title.toLowerCase().includes(search.toLowerCase())">
                <div class="product-image">
                    <img :src="product.thumbnail" :alt="product.title" />
                </div>
                <div class="product-info">
                    <p>{{ product.title }}</p>
                    <p>{{ product.description }}</p>
                    <button class="button is-small is-primary is-rounded add" @click.prevent="addToCart(product)">+</button>
                    <p class="price">
                        <span class="currency">$</span>
                        <span class="amount">{{ product.price }}</span>
                    </p>
                </div>
            </RouterLink>
        </div>
    </div>
</template>


<style scoped>
    .products {
        display: flex;
        flex-wrap: wrap;
        background-color: aliceblue;
    }

    .product {
        flex-basis: 10em;
        margin: 1em;
        padding: 1em;
        border: 1px solid black;
        border-radius: 5px;
        background-color: white;
    }

    .product-info {
        font-size: small;
    }

    .price {
        display: flex;
        align-items: flex-start;
    }

    .amount {
        font-size: x-large;
    }

    .add {
        float: right;
    }

</style>