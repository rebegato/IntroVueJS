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

                <div>
                    <h2>Reviews</h2>
                    <p v-if="!reviews.length">There are no reviews yet.</p>
                    <ul>
                        <li v-for="review in reviews">
                            <p>{{ review.name }}</p>
                            <p>Rating: {{ review.rating }}</p>
                            <p>{{ review.review }}</p>
                            <p>Would you recommend this product? {{review.recommend}} </p>
                        </li>
                    </ul>
                </div>

                <product-review @review-submitted="addReview"></product-review>

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
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            reviews: []
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
        },
        addReview(productReview) {
            this.reviews.push(productReview);
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

Vue.component('product-review',{
    template: `
    <div class="product-review">
        <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
        </p>

        <form class="review-form" @submit.prevent="onSubmit">
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
        </p>
        
        <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
            </select>
        </p>
           
        <p> Would you recommend this product? </p>
        <input type="radio" id="yes" v-model="recommend" value="yes">
        <label for="yes">Yes</label><br>
        <input type="radio" id="no" v-model="recommend" value="no">
        <label for="no">No</label><br>

        <p>
            <input type="submit" value="Submit">  
        </p>    
        
        </form>
    </div>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = [];
            if(this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recommendation required.")
            }
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