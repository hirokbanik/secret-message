const wrapper = $(".wrapper");
const input_text = $("#input_text");
const output_text = $("#output_text");
const password_text = $("#password_text");
const enc_btn = $("#enc_btn");
const dec_btn = $("#dec_btn");
const copy_btn = $("#copy_btn");
const reset_btn = $("#reset_btn");
const share_btn = $("#share_btn");

if (!navigator.share) wrapper.classList.remove("desktop");
else wrapper.classList.add("desktop");

wrapper.addEventListener("click", e => {
  const target = e.target;

  if (target === reset_btn) reset();
  else if (target === copy_btn) copy();
  else if (target === enc_btn && validate(target))
    output_text.value = encrypt(input_text.value, password_text.value);
  else if (target === dec_btn && validate(target))
    output_text.value = decrypt(input_text.value, password_text.value);
  else if (target === share_btn) share();
});

// COPY OUTPUT TEXT
function copy() {
  if (!output_text.value.length) {
    display(copy_btn, "innerText", "EMPTY!");
    return;
  }
  output_text.disabled = false;
  output_text.select();
  output_text.setSelectionRange(0, output_text.value.length);
  document.execCommand("copy");
  output_text.disabled = true;
  display(copy_btn, "innerText", "COPIED!");
}

// RESET INPUT FIELDS
function reset() {
  display(reset_btn, "innerText", "DONE!");
  input_text.value = "";
  output_text.value = "";
  password_text.value = "";
}

// SHARE FUNCTION
async function share() {
  let url = new URL(window.location);
  const data = {
    title: "A secret message for you!",
    text: output_text.value,
    url: `${url.origin}/?m=${encodeURI(output_text.value)}`
  };
  try {
    await navigator.share(data);
  } catch (err) {
    display(share_btn, "innerText", "ERROR!");
  }
}

// VALIDATE INPUT FIELDS
function validate(el) {
  if (!input_text.value) {
    display(el, "innerText", "EMPTY!");
    input_text.focus();
  } else if (!password_text.value) {
    display(el, "innerText", "PASSWORD!");
    password_text.focus();
  } else return true;
}

// ENCRYPT FUNCTION
function encrypt(text, pass) {
  let enc_text = btoa(text).split("");
  let enc_pass = btoa(pass);

  enc_text.splice(Math.floor(Math.random() * enc_text.length), 0, enc_pass);
  enc_text = btoa(enc_text.join(""));

  display(enc_btn, "innerText", "DONE!");

  return enc_text;
}

// DECRYPT FUNCTION
function decrypt(text, pass) {
  debugger;
  if (atob(text).indexOf(btoa(pass)) < 0) {
    display(dec_btn, "innerText", "ERROR!");
    return "ERROR!";
  }
  try {
    var dec_text = atob(atob(text).replace(btoa(pass), ""));
  } catch (err) {
    display(dec_btn, "innerText", "ERROR!");
    return "ERROR!";
  }
  display(dec_btn, "innerText", "DONE!");
  return dec_text;
}

// DISPLAY MESSAGE
function display(el, prop, value) {
  const ori_value = el[prop];
  el[prop] = "";
  let loader1 = setTimeout(() => {
    el[prop] = value;
    clearTimeout(loader1);
    let loader2 = setTimeout(() => {
      el[prop] = "";
      clearTimeout(loader2);
      let loader3 = setTimeout(() => {
        el[prop] = ori_value;
        clearTimeout(loader3);
      }, 200);
    }, 1000);
  }, 200);
}

// CUSTOM ELEMENT SELECTOR
function $(el) {
  return document.querySelector(el);
}
