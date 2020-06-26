var app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
        altText: "A pair of socks",
        href: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        inStock: false,
        inventory: -1,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "Green"
            },
            {
                variantId: 2235,
                variantColor: "Blue"
            }
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
     }
})