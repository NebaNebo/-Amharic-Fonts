<script>
    import { onMount } from 'svelte';
    let fonts = [];
    let selectedFont = '';
    let sampleText = 'የተጠባቂውን የኔ';
  
    onMount(async () => {
      const response = await fetch('/api/fonts');
      fonts = await response.json();
      selectedFont = fonts[0];
    });
  </script>
  
  <div>
    <input
      type="text"
      bind:value={sampleText}
      placeholder="Type something..."
      class="w-full p-2 mb-4 border border-gray-300 rounded"
    />
  
    <select
      bind:value={selectedFont}
      class="w-full p-2 mb-4 border border-gray-300 rounded"
    >
      {#each fonts as font}
        <option value={font}>{font}</option>
      {/each}
    </select>
  
    <div
      class="p-4 bg-white border border-gray-300 rounded"
      style="font-family: {selectedFont.replace(/\.\w+$/, '')};"
    >
      {sampleText}
    </div>
  </div>
  