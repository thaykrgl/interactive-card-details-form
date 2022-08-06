$(document).ready(function () {

  let holderNumberDOM = document.getElementById("holder-number");
  let expDateMonthDOM = document.getElementById("exp-date-mm");
  let expDateYearDOM = document.getElementById("exp-date-yy");


  // CardHolder Name
  $("#holder-name").keyup(function (e) {
    document.getElementById("card-owner").innerHTML = e.target.value
  });


  // Card Number
  $("#holder-number").keyup(function (e) {
    let value = cc_format(holderNumberDOM.value);
    holderNumberDOM.value = value;

    document.getElementById("card-number").innerHTML = value
  });


  // To Restrict The User To Enter Number Only In Card Number Input
  $("#holder-number").keypress(function (e) {
    if ((e.which < 48 || e.which > 57) && (e.which !== 8) && (e.which !== 0)) {
      return false;
    }
    return true;
  });


  // Expiry Dates
  $("#exp-date-mm").keyup(function (e) {
    if (expDateMonthDOM.value[0] > 1) {
      expDateMonthDOM.value = "";
    }
    else if (expDateMonthDOM.value[1] > 2) {
      expDateMonthDOM.value = expDateMonthDOM.value[0]
    }
    else {
      let value = cc_expires_format(e.target.value);
      expDateMonthDOM.value = value;
      document.getElementById("card-expire-mm").innerHTML = value
    }
  });

  $("#exp-date-yy").keyup(function (e) {
    if (expDateYearDOM.value[0] != 2) {
      expDateYearDOM.value = "";
    }
    else if (expDateYearDOM.value[1] < 2) {
      expDateYearDOM.value = expDateYearDOM.value[0];
    }
    else {
      let value = cc_expires_format(e.target.value);
      expDateYearDOM.value = value;
      document.getElementById("card-expire-yy").innerHTML = value
    }
  });


  // CVC
  $("#cvc").keyup(function (e) {
    this.value = this.value.replace(/[^\d]/, '')
    document.getElementById("card-cvc").innerHTML = e.target.value
  });
})


// Credit Card Number Format Function
function cc_format(value) {
  var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  var matches = v.match(/\d{4,16}/g);
  var match = matches && matches[0] || ''
  var parts = []
  for (i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }
  if (parts.length) {
    return parts.join(' ')
  } else {
    return value
  }
}

// Credit Card Expiry Dates Format Function
function cc_expires_format(value) {
  return value.replace(
    /[^0-9]/g, '' // To allow only numbers
  );
}