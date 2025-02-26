<template>
  <section class="hero-section container place-content-center text-center py-5 ">
    <div
      class="place-content-center text-center herosection grig grid-cols-2 md:grid-cols-1 bg-b-gray rounded-3xl text-white">
      <p class="text-sm py-1">We bring new fashion to the world</p>
      <p class="font-chillax font-bold text-3xl">
        DISCOVER THE LATEST FASHION TRENDS <br />
        HERE
      </p>
      <p class=" py-1 text-sm">
        Discover a world of fashion with our meticulously curated outfits. Shop
        now to <br />
        update your wardrobe with chic and stylish outfits.
      </p>
      <div class="flex text-b-black   text-sm justify-center py-2">
        <button class="bg-white rounded-full px-4 py-2 font-semibold "> Start Shopping</button>
        <button class="bg-white rounded-full px-2 py-2"> <img src="/Icons/arrow.svg" alt=" arrow"
            class="h-6 w-6"></button>
      </div>

    </div>
    <div class=" py-5">
      <p class="font-chillax text-b-black font-bold   text-md">
        Discover the latest trends in summer fashion. Shop now and refresh your wardrobe <br> with our stylish summer
        shirts.
      </p>
    </div>

  </section>
</template>

<script>
export default {};
</script>

<style>
.herosection {
  background-image: url("/Images/jordan.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 400px;
}
</style>
