const head = document.createElement("div");
head.className = "top";

const h1 = document.createElement("h1");
h1.textContent = "திருக்குறள்/ THIRUKKURAL";

const img = document.createElement("img");
img.src =
  "https://m.media-amazon.com/images/I/81ympu4Ty+L._SY450_.jpg";

const input = document.createElement("div");
input.className = "input";

const input_box = document.createElement("input");
input_box.type = "number";
input_box.placeholder = "குறள் எண்: 1 to 1330";
input_box.id = "input_box";

const button = document.createElement("button");
button.className = "btn1";
button.type = "submit";
button.onclick = okay;
button.textContent = "Search";

const card = document.createElement("div");
card.className = "card border-success mb-3";

const card_header = document.createElement("div");
card_header.className = "card-header bg-transparent border-success";
card_header.id = "line";
card_header.innerHTML = "<b>குறள் / Kural :</b>";

const card_body = document.createElement("div");
card_body.className = "card-body text-success";

const number = create_p(
  "p",
  "class",
  "card-text",
  "id",
  "number",
  "<b>குறள் எண் / No :</b>"
);
const section = create_p(
  "p",
  "class",
  "card-text",
  "id",
  "section",
  "<b>பிரிவு / Section :</b>"
);
const chapter = create_p(
  "p",
  "class",
  "card-text",
  "id",
  "chapter",
  "<b>அத்தியாயம் / Chapter :</b>"
);
const chapter_group = create_p(
  "p",
  "class",
  "card-text",
  "id",
  "chapter_group",
  "<b>இயல் / Chapter Group :</b>"
);

const footer = document.createElement("div");
footer.className = "card-footer bg-transparent border-success";
footer.id = "meaning";
footer.innerHTML = "<b>பொருள் / Meaning :</b>";

function create_p(tag, att, attvalue, att1, attvalue1, content) {
  const ele = document.createElement(tag);
  ele.className = attvalue;
  ele.id = attvalue1;
  ele.innerHTML = content;
  return ele;
}

head.append(h1);
input.append(input_box, button, card);
card.append(card_header, card_body, footer);
card_body.append(number, section, chapter, chapter_group);
document.body.append(head, img, input);

function okay() {
  const inputBox = document.getElementById("input_box");
  const a = parseInt(inputBox.value);

  if (isNaN(a)) {
    alert("Please Enter a Number below");
  } else if (a < 1 || a > 1330) {
    alert("Please enter a valid KURAL number between 1 to 1330");
  } else {
    fetch(`https://api-thirukkural.vercel.app/api?num=${a}`)
      .then((data) => data.json())
      .then((data1) => {
        const lineHtml = `<b>குறள் :</b><br>${data1.line1}<br>${data1.line2}<br><b>Kural :</b><br>${data1.eng}`;
        const numberHtml = `<b>குறள் எண் / No :</b> ${data1.number}`;
        const sectionHtml = `<b>பிரிவு / Section :</b> ${data1.sect_tam} / ${data1.sect_eng}`;
        const chapterHtml = `<b>அத்தியாயம் / Chapter :</b> ${data1.chap_tam} / ${data1.chap_eng}`;
        const chapterGroupHtml = `<b>இயல் / Chapter Group :</b> ${data1.chapgrp_tam} / ${data1.chapgrp_eng}`;
        const meaningHtml = `<b>பொருள் :</b><br>${data1.tam_exp}<br><b>Meaning :</b><br>${data1.eng_exp}`;

        document.getElementById("line").innerHTML = lineHtml;
        document.getElementById("number").innerHTML = numberHtml;
        document.getElementById("section").innerHTML = sectionHtml;
        document.getElementById("chapter").innerHTML = chapterHtml;
        document.getElementById("chapter_group").innerHTML = chapterGroupHtml;
        document.getElementById("meaning").innerHTML = meaningHtml;
      });
  }

  inputBox.value = "";
}