<script>
	import { onMount } from "svelte";
	import fontList from "./font.json"; // Import the JSON file containing font names
  
	let fonts = fontList.fonts; // Extract the font list from the JSON
	let inputText = "እያንዳንዱ፡ሰው፡የዘር፡የቀለም፡የጾታ፡የቋንቋ፡የሃይማኖት"; // Default text
	let fontSize = 36; // Set default font size
	let isGridView = true; // State to toggle between list and grid view
	let tempInput = "";

	// Update `inputText` when user types
	function handleInput(event) {
    inputText = event.target.value;
  }
  let textColor = "#ffffff"; // Default text color
  let bgColor = "#202124"; // Default background color
  let buttonColor = "#FFFFFF"; // Default button color

  // Function to calculate random color based on luminosity
  function randomizeColorForContrast(baseColor) {
  // Convert a hex color to RGB
  function hexToRgb(hex) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }

  // Calculate relative luminance
  function getLuminance({ r, g, b }) {
    const toLinear = (c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  }

  // Generate a contrasting color
  const baseRgb = hexToRgb(baseColor);
  const baseLum = getLuminance(baseRgb);

  // If the base color is light, generate a dark color, and vice versa
  const isLight = baseLum > 0.5;
  const contrastRgb = {
    r: isLight ? Math.floor(Math.random() * 128) : Math.floor(128 + Math.random() * 127),
    g: isLight ? Math.floor(Math.random() * 128) : Math.floor(128 + Math.random() * 127),
    b: isLight ? Math.floor(Math.random() * 128) : Math.floor(128 + Math.random() * 127),
  };

  // Convert RGB to Hex
  const rgbToHex = ({ r, g, b }) =>
    `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

  return rgbToHex(contrastRgb);
}


  // Update button color
  function updateButtonColor() {
    bgColor = randomizeColorForContrast(bgColor);
	textColor = randomizeColorForContrast(bgColor);
  }

  
  
	// Dynamically generate @font-face rules and inject them into the document
	onMount(() => {
	  fonts.forEach((font) => {
		const style = document.createElement("style");
		style.innerHTML = `
		  @font-face {
			font-family: '${font.replace(/\.[^/.]+$/, "")}';
			src: url('/fonts/${font}') format('truetype');
		  }
		`;
		document.head.appendChild(style);
	  });
	});
  
	// Handle the font size change
	const changeFontSize = (event) => {
	  fontSize = event.target.value;
	};
  
	// Handle the font download
	const downloadFont = (font) => {
	  const link = document.createElement("a");
	  link.href = `/fonts/${font}`; // Path to the font file in the public folder
	  link.download = font; // Set the file name for download
	  link.click(); // Trigger the download
	};
  
	// Toggle between grid and list view
	const toggleLayout = () => {
	  isGridView = !isGridView;
	};
  </script>




  
  <!-- Navbar for Font and Size Control -->
  <div class="sticky top-[75%] lg:top-1 z-50 p-1 bg-[#404349] sm:block mx-5 lg:mx-16 rounded-md glass ">
	<div class="flex flex-wrap items-center justify-center">
	  <!-- Main Container -->
	  <div class="flex items-center justify-center pl-4 space-x-4 ">
		<!-- Text Input for User Input -->
		
		

		<div class="flex flex-col-reverse items-center justify-center gap-1 sm:flex-row sm:w-auto">
			<div class="flex flex-col items-center gap-3 md:flex-row">
		  <input
			type="text"
			placeholder="Type something..."
			bind:value={tempInput}
			on:input={handleInput}
			class="p-2  lg:w-[30rem] border border-gray-300 rounded-md bg-[#626262cc] text-stone-200  sm:w-96 focus:border-[#404349] focus:outline-none mb-5 sm:mb-0"
		  />
		  <!-- Font Size Slider -->
		  <div class="flex flex-row items-center justify-center hidden gap-2 md:block ">
			<input
			  type="range"
			  min="10"
			  max="72"
			  step="1"
			  bind:value={fontSize}
			  on:input={changeFontSize}
			  class="  bg-[#242529] slider"
			/>
			<span class="text-white"><span id="fontSize">{fontSize} px</span>
		  </div>
		</div>
		 
		  <div class="flex flex-row items-center scale-[0.85]">
			<div class="relative flex flex-row items-center justify-center mx-2">
				<label for="nativeColorPicker1" class="absolute mr-2 ">Text</label>
				<input
				id="nativeColorPicker1"
				type="color"
				bind:value={textColor}
				class="w-20 h-12 border-0 rounded"
			  />
			</div>
			<div class="relative flex flex-row items-center justify-center p-4 ">
				<label for="nativeColorPicker2" class="absolute mr-2 " style="color: {textColor}" >Background</label>
				<input
				id="nativeColorPicker2"
				type="color"
				bind:value={bgColor}
				class="h-12 border-0 rounded w-28"
			  />
			</div>
			<div class="relative flex flex-row items-center justify-center px-2 scale-[0.85]">
				
				<button
				id="button"
				on:click={updateButtonColor}
				class="h-16 px-4 py-2 font-bold text-black border-2 border-gray-300 rounded shadow-md w-28 hover:shadow-lg"
				
			  ><label for="button" class="" style="color: {textColor}" >Randomize Colors</label></button>
			</div>



</div>

		
		

		</div>
		<!-- Toggle Button for Layout -->
		<button
		  class="hidden px-4 py-2 text-white rounded-md lg:block -left-60"
		  on:click={toggleLayout}
		><div class="">
		{#if isGridView}
		<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 2V0H18V2H4ZM4 6V4H18V6H4ZM4 10V8H18V10H4ZM1 2C0.716667 2 0.479167 1.90417 0.2875 1.7125C0.0958333 1.52083 0 1.28333 0 1C0 0.716667 0.0958333 0.479167 0.2875 0.2875C0.479167 0.0958333 0.716667 0 1 0C1.28333 0 1.52083 0.0958333 1.7125 0.2875C1.90417 0.479167 2 0.716667 2 1C2 1.28333 1.90417 1.52083 1.7125 1.7125C1.52083 1.90417 1.28333 2 1 2ZM1 6C0.716667 6 0.479167 5.90417 0.2875 5.7125C0.0958333 5.52083 0 5.28333 0 5C0 4.71667 0.0958333 4.47917 0.2875 4.2875C0.479167 4.09583 0.716667 4 1 4C1.28333 4 1.52083 4.09583 1.7125 4.2875C1.90417 4.47917 2 4.71667 2 5C2 5.28333 1.90417 5.52083 1.7125 5.7125C1.52083 5.90417 1.28333 6 1 6ZM1 10C0.716667 10 0.479167 9.90417 0.2875 9.7125C0.0958333 9.52083 0 9.28333 0 9C0 8.71667 0.0958333 8.47917 0.2875 8.2875C0.479167 8.09583 0.716667 8 1 8C1.28333 8 1.52083 8.09583 1.7125 8.2875C1.90417 8.47917 2 8.71667 2 9C2 9.28333 1.90417 9.52083 1.7125 9.7125C1.52083 9.90417 1.28333 10 1 10Z" fill="white"/>
			</svg>
			
	  {:else}
	  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2ZM2 16H5.325V12.675H2V16ZM7.325 16H10.675V12.675H7.325V16ZM12.675 16H16V12.675H12.675V16ZM2 10.675H5.325V7.325H2V10.675ZM7.325 10.675H10.675V7.325H7.325V10.675ZM12.675 10.675H16V7.325H12.675V10.675ZM2 5.325H5.325V2H2V5.325ZM7.325 5.325H10.675V2H7.325V5.325ZM12.675 5.325H16V2H12.675V5.325Z" fill="white"/>
		</svg>
		
	  {/if}
		</button>
		
	  </div>
	  
	</div>
  </div>
  
  <!-- Font Preview Section -->
  <div class="p-6 pt-16 mx-auto -mt-[13rem] max-w-7xl lg:-mt-[2rem] sm:-mt-[9rem] ">
	<!-- List or Grid View -->
	<div class={isGridView ? "grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3" : "flex flex-col space-y-6"}>
	  {#each fonts as font}
		<div class="flex flex-col px-5 py-2 transition-transform duration-300 transform border border-gray-300 rounded-lg hover:bg-[#5f5b5b98]" style="background-color: {bgColor};">
		  <!-- Font Name and Sample Text -->
		  <div class="flex flex-row items-center justify-between mb-2">
			<div class="font-semibold text-md text-slate-400">
			  {font.replace(/\.[^/.]+$/, "")}
			</div>
			<button
			  class="text-white transition-transform duration-300 transform scale-75 rounded-md text-md hover:scale-105"
			  on:click={() => downloadFont(font)}
			>
			  <i class="fa-solid fa-download"></i>
			</button>
		  </div>
		  
		  <!-- Sample Text in Each Font -->
		  <div
			class="w-full mb-4 "
			style="font-family: '{font.replace(/\.[^/.]+$/, '')}'; font-size: {fontSize}px; color: {textColor}; "
		  >
			{inputText}
		  </div>
		</div>
	  {/each}
	</div>
  </div>
  




<button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<!-- Dropdown menu -->
<div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li>
    </ul>
</div>














  <style>

.slider {
    appearance: none;
    outline: none;
    width: 60%;
    height: 4px;
    background: #9c9c9c; /* Replace with actual color */
    border-radius: 4px;
}

.slider::-webkit-slider-thumb {
    appearance: none;
    width: 25px;
    height: 25px;
    background: #fff;
    border: 2px solid #fff; /* Replace with actual color */
    border-radius: 50%;
    cursor: pointer;
}
.glass{
	background: rgba(64, 58, 50, 0.63);

backdrop-filter: blur( 15.5px );
-webkit-backdrop-filter: blur( 10.5px );
border-radius: 20px;
border: 2px solid rgba(206, 206, 206, 0.941);
}

  </style>
  
  