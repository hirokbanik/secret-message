const input_text = $("#input_text");
const output_text = $("#output_text");
const password = $("#password");
const enc_btn = $("#enc_btn");
const dec_btn = $("#dec_btn");

enc_btn.addEventListener("click", () => {
  if (validate()) {
    output_text.value = encrypt(input_text.value, password.value);
    copy();
  }
});

dec_btn.addEventListener("click", () => {
  if (validate()) {
    output_text.value = decrypt(input_text.value, password.value);
    copy();
  }
});

// COPY OUTPUT TEXT
function copy() {
  output_text.disabled = false;
  output_text.select();
  output_text.setSelectionRange(0, output_text.value.length);
  document.execCommand("copy");
  output_text.disabled = true;
  alert("Text copied to Clipboard");
}

// VALIDATE INPUT FIELDS
function validate() {
  if (!input_text.value) alert("Enter text in the input box.");
  else if (!password.value) alert("Enter an encryption password");
  else return true;
}

// ENCRYPT FUNCTION
function encrypt(text, pass) {
  let enc_text = btoa(btoa(text) + btoa(pass));
  return enc_text;
}

// DECRYPT FUNCTION
function decrypt(text, pass) {
  if(!(atob(text).indexOf(pass)))
    return "Invalid text/password";
  try {
    var dec_text = atob(atob(text).replace(btoa(pass), ""));
  } catch (err) {
    return "Invalid text/password";
  }
  return dec_text;
}

// CUSTOM ELEMENT SELECTOR
function $(el) {
  return document.querySelector(el);
}
