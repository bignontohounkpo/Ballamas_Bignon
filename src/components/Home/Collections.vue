<template>
    <div class="container mx-auto p-5">
      <!-- Section Title -->
      <div class="text-center py-5">
        <p class="font-chillax font-semibold text-3xl uppercase">Our Collection</p>
        <p class="text-b-dark-gray-gray font-medium text-md">
          Our latest collection, where classic and contemporary styles converge in perfect harmony.
        </p>
      </div>
  
      <!-- Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-12  lg:grid-cols-12 gap-10 items-center py-5">
        <!-- Large Image (Appears first on mobile) -->
        <div class="order-1 md:order-2 md:col-span-8 bg-[url(/Images/manveste.svg)] bg-no-repeat bg-center bg-cover w-full h-100 rounded-2xl flex flex-col justify-center items-center text-white text-center p-10">
          <p class="collection font-bold font-chillax text-6xl text-white">CLASSIC MEN</p>
          <p class="text-md font-bold">We’re changing the way things get made</p>
        </div>
  
        <!-- Small Image -->
        <div class="order-2 md:order-1 md:col-span-4 bg-[url(/Images/manjacket.svg)] bg-no-repeat bg-center bg-cover w-full h-100 rounded-2xl relative">
          <!-- Button centered at the bottom -->
          <button class="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-5 py-2 font-semibold flex items-center gap-1 shadow-lg">
            <p>Learn More</p>
            <img src="/Icons/arrow.svg" alt="arrow" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .collection {
    color: transparent;
    -webkit-text-stroke: 0.5px #fff7f7;
  }
  </style>
  