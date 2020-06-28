var app = new Vue({
    el: '#app',
    data: {
        brand: "Vue Mastery",
        product: "Socks",
        altText: "A pair of socks",
        href: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        selectVariant:0,
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
        cart: 0
        },
        methods: {
            addToCart: function () {
                this.cart += 1;
            },
            removeFromCart: function() {
                this.cart -= 1;
            },
            updateProduct(index) {
                this.selectVariant = index;
            }
        },
        computed:{
            title() {
                return this.brand + " " + this.product;
            },
            image() {
                return this.variants[this.selectVariant].variantImage;
            },
            inStock(){
                return this.variants[this.selectVariant].variantQuantity;
            },
            onSale() {
                return (this.variants[this.selectVariant].onSale)? "On Sale!":""; 
            }
        }
})