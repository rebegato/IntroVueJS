Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <div class="product-details">
            <h2> Product Details </h2>
            <ul>
                <li v-for="detail in details"> <p>{{ detail }}</p> </li>
            </ul>
        </div>
    `
})

Vue.component('product', {
    props:{
        premium: {
            type: Boolean,
            required: true 
        }
    },
    template : `
            <div class="product">

            <div class="product-image">
                <img v-bind:src="image" v-bind:alt="altText" />                
                <button :class="{ disabledButton: !inStock }" 
                    v-on:click="addToCart" :disabled="!inStock">Add to Cart</button>
                <button @click="removeFromCart">Remove from Cart</button>
            </div>

            <div class="product-info">
                <h1> {{ title }} </h1>
                <a :href="href" target="_blank">More products like this...</a>
                <br/>
                <p v-if="inStock > 10">In Stock</p>
                <p v-else-if="inStock <=10 && inStock > 0">Almost sold out!</p>
                <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
                <span v-show="onSale">On Sale!</span>
                <p> Shipping: {{ shipping }} </p>

                <product-details :details="details"></product-details>

                <h2> Colors </h2>
                <div class="color-box" v-for="(variant, index) in variants" 
                       :key="variant.variantId"
                       :style="{ backgroundColor: variant.variantColor }" 
                       @mouseover="updateProduct(index)">
                </div>

                <h2> Sizes </h2>
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>

            </div>

        </div>
    `,
    data() {
        return {
            brand: "Vue Mastery",
            product: "Socks",
            altText: "A pair of socks",
            href: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            selectVariant: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantQuantity: 10,
                    variantImage: "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
                    onSale: true
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantQuantity: 0,
                    variantImage: "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
                    onSale: false
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectVariant].variantId);
        },
        removeFromCart: function () {
            this.$emit('remove-from-cart', this.variants[this.selectVariant].variantId);
        },
        updateProduct(index) {
            this.selectVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product;
        },
        image() {
            return this.variants[this.selectVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectVariant].variantQuantity;
        },
        onSale() {
            return (this.variants[this.selectVariant].onSale) ? "On Sale!" : "";
        },
        shipping() {
            if(this.premium) {
                return "Free";
            } return 2.99;
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeFromCart(id){
            const index = this.cart.findIndex( e => e === id);
            if (index > -1) {
                this.cart.splice(index, 1);
            }
        }
    }
})