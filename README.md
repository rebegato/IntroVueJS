# Vue-exProy1
Vue Example Project 1.

# Notes

## Key attribute

Note that it is recommended to use a special key attribute when rendering elements like this so that Vue can keep track of each node’s identity. We’ll add that in now, using our variant’s unique variantId property.

    <div class="color-box" v-for="(variant, index) in variants" 
            :key="variant.variantId"
    </div>

## Methods vs Computed properties

Computed properties are cached, meaning the result is saved until its dependencies change. So when quantity changes, the cache will be cleared and the **next time you access the value of inStock , it will return a fresh result, and cache that result.

With that in mind, it’s more efficient to use a computed property rather than a method for an expensive operation that you don’t want to re-run every time you access it.

It is also important to remember that you should not be mutating your data model from within a computed property. You are merely computing values based on other values. Keep these functions pure.

## Components

* Components are blocks of code, grouped together within a custom element
* Components make applications more manageable by breaking up the whole into reusuable parts that have their own structure and behavior
* Data on a component must be a function
* Props are used to pass data from parent to child
* We can specify requirements for the props a component is receiving
* Props are fed into a component through a custom attribute
* Props can be dynamically bound to the parent’s data
* Vue dev tools provide helpful insight about your components
