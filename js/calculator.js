var amountInput = document.getElementById("amount");
var dtAmountInput = document.getElementById("dt-amount");
var discounted = document.getElementById("discounted");

// Declare discounts
var efp5 = {
  element: document.getElementById("efp5"),
  discount: 5
};
var efp10 = {
  element: document.getElementById("efp10"),
  discount: 10
};
var ambassador = {
  element: document.getElementById("ambassador"),
  discount: 5
}
var tattoo = {
  element: document.getElementById("tattoo"),
  discount: 20
};
var discounts = [efp5, efp10, ambassador, tattoo];

// Specific "uncheck" other discounts that don't apply
efp5.element.addEventListener('change', function(){
  if (efp10.element.checked == true){
    efp10.element.checked = false;
  }
  refreshUI(efp10.element);
});

efp10.element.addEventListener('change', function(){
  if (efp5.element.checked == true){
    efp5.element.checked = false;
  }
  refreshUI(efp5.element);
})

tattoo.element.addEventListener('change', function(){
  if (ambassador.element.checked == true) {
    ambassador.element.checked = false;
  }
  refreshUI(this);
});

ambassador.element.addEventListener('change', function(){
  if(tattoo.element.checked == true){
    tattoo.element.checked = false;
  }
  refreshUI(ambassador.element);
});

// Calculate discounts every time we check something
discounts.forEach(function(disc){
  disc.element.addEventListener('change', function(){
    calculate_discounts();
  });
});

// Calculate discounts every time we check something
amountInput.addEventListener('input', function(){
  calculate_discounts();
})

dtAmountInput.addEventListener('input', function(){
  calculate_discounts();
})


function calculate_discounts(){
  discounted.value = Number((discount_amount() + dt_discount_amount()).toFixed(2));
}

function discount_amount(){
  if(amountInput.value == '' || amountInput.value == null){
    return 0;
  }
  var totalDiscount = parseFloat(amountInput.value);
  discounts.forEach(function(discount){
    if (discount.element.checked == true){
      totalDiscount = totalDiscount * (100 - discount.discount) / 100;
    }
  });
  return totalDiscount;
}

function dt_discount_amount(){
  if(dtAmountInput.value == '' || dtAmountInput.value == null){
    return 0;
  }
  var amount = parseFloat(dtAmountInput.value);
  discounts.forEach(function(discount){
    if (discount.element.checked == true){
      amount = amount * (100 - discount.discount) / 100;
    }
  });
  if(tattoo.element.checked == true){
    return amount;
  } else {
    return amount * 0.85;
  }
}

// Styling:
function refreshUI(elem){
  discounts.forEach(function(discount){
    elem = discount.element;
    if(elem.checked == true){
      elem.parentNode.parentNode.classList.add('checked');
    } else {
      elem.parentNode.parentNode.classList.remove('checked');
    }
  })
  if(tattoo.element.checked == true){
    dtAmountInput.value = '';
    dtAmountInput.disabled = true;
  } else {
    dtAmountInput.disabled = false;
  }

}
