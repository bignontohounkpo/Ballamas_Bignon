<template>
    <section class="bg-b-black text-white py-4 footer ">
        <div class="container py-5">
            <div class="grid  lg:grid-cols-2  justify-between md:grid-cols-1 sm:grid-cols-1 pl-2">
                <div>
                    <p class="navbare-logo text-3xl text-white font-chillax">BALLAMAS</p>
                    <p class=" justify-center text-md font-medium">Subscribe to our newsletter for upcoming
                        products and best discount for all <br> items</p>
                    <div class="flex gap-4">

                        <input type="email" name="email" id="email" placeholder=" your email"
                            class="text-white p-2 rounded-full border-1 border-white">
                        <button type="submit"
                            class="bg-white text-black p-2 rounded-full">Subscribe</button>
                    </div>

                </div>
                <div class="grid grid-cols-3 gap-2">
                    <div>
                        <h4 class="text-xl font-achivo">Product</h4>
                        <p class="text-gray-200">Jacket </p>
                        <p class="font-achivo text-gray-200">T-Shirt</p>
                        <p class="text-gray-200">jacket</p>
                        <p class="text-gray-200">Shoes</p>
                        <p class="text-gray-200">Sunglasses</p>
                    </div>
                    <div>
                        <h4 class="text-xl font-achivo">Categories</h4>
                        <p class="text-gray-200">Man </p>
                        <p class="text-gray-200">Woman</p>
                        <p class="text-gray-200">Kids</p>
                        <p class="text-gray-200">Gift</p>
                        <p class="text-gray-200">New Arrival</p>
                    </div>
                    <div>
                        <h4 class="text-xl font-achivo">Our Social Media</h4>
                        <p class="text-gray-200">Instagram </p>
                        <p class="text-gray-200">Facebook</p>
                        <p class="text-gray-200 ">Twitter</p>
                        <p class="text-gray-200">Youtube</p>
                    </div>
                </div>
            </div>
        </div>
        <p class="text-center text-gray-500 text-md">© 2024 BALLAMAS. All rights reserved.</p>
    </section>
</template>

<script setup>

</script>

<style>
.navbare-logo {
    color: transparent !important;
    -webkit-text-stroke: 0.5px #fff7f7 !important;
}
</style>