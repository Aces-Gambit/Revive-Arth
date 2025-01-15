function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
      // Special handling for currency or URL if needed
      if (id === 'price' || id === 'shippingPrice' || id === 'priceRetail') {
        element.textContent = `$${parseFloat(value).toFixed(2)}`;
      }else if (id === 'savings'){
        element.textContent = `$${parseFloat(value).toFixed(0)}`;
      }else if (id === 'destinationUrl') {
        console.log(element);
        console.log(value);
        element.href = value;
      }else if ( id ==='shippingBadge'){
        Array.from(element.children).forEach(child => {
            const isFreeChild = child.getAttribute('data-type') === 'free';
            const isCostChild = child.getAttribute('data-type') === 'cost';
    
            if (value === 'free' && isFreeChild) {
              child.setAttribute('data-visible', 'active');
            } else if (value === 'cost' && isCostChild) {
              child.setAttribute('data-visible', 'active');
            } else {
              child.setAttribute('data-visible', 'hidden');
            }
          });
      }
      else {
        element.textContent = value;
      }
    }
  }
  
  function handleVariantSelection(event) {
    const selectedInput = event.target.closest('input[type="radio"]');
  
    if (selectedInput) {
      // Loop through the data attributes and update matching elements
      Object.keys(selectedInput.dataset).forEach(key => {
        updateElement(key.replace(/-([a-z])/g, g => g[1].toUpperCase()), selectedInput.dataset[key]);
      });
    }
  }
  
  // Attach event listener to handle changes in the variant selector
  document.querySelector('.variant-selector').addEventListener('change', handleVariantSelection);

  //id camelCase [content] from data-[content] to target element changes