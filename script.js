const carousel = document.getElementById("carousel");
const toggleBtn = document.getElementById("toggleBtn");

// Danh sách 6 hình ảnh do bạn chụp trong thư mục images/
const photos = [
  { src: "images/img1.jpg", caption: "Hình 1" },
  { src: "images/img2.jpg", caption: "Hình 2" },
  { src: "images/img3.jpg", caption: "Hình 3" },
  { src: "images/img4.jpg", caption: "Hình 4" },
  { src: "images/img5.jpg", caption: "Hình 5" },
  { src: "images/img6.jpg", caption: "Hình 6" }
];

const totalPanels = photos.length; // 6 mặt
const angleStep = 360 / totalPanels; // 60 độ mỗi mặt
const radius = 210; // bán kính vòng xoay

let currentAngle = 0;
let isPausedByHover = false;
let isPausedByButton = false;

photos.forEach((item, index) => {
  const panel = document.createElement("div");
  panel.className = "panel";

  const panelAngle = index * angleStep;
  panel.style.transform = `rotateY(${panelAngle}deg) translateZ(${radius}px)`;

  const img = document.createElement("img");
  img.src = item.src;
  img.alt = item.caption;

  const label = document.createElement("div");
  label.className = "panel-label";
  label.textContent = item.caption;

  // Rê chuột vào 1 hình -> đèn dừng lại
  panel.addEventListener("mouseenter", () => {
    isPausedByHover = true;
  });

  // Rê chuột ra -> đèn quay tiếp
  panel.addEventListener("mouseleave", () => {
    isPausedByHover = false;
  });

  panel.appendChild(img);
  panel.appendChild(label);
  carousel.appendChild(panel);
});

toggleBtn.addEventListener("click", () => {
  isPausedByButton = !isPausedByButton;
  toggleBtn.textContent = isPausedByButton ? "Quay tiếp" : "Tạm dừng";
});

function rotateLantern() {
  if (!isPausedByHover && !isPausedByButton) {
    currentAngle = (currentAngle + 0.45) % 360;
    carousel.style.transform = `rotateY(${currentAngle}deg)`;
  }
  requestAnimationFrame(rotateLantern);
}

rotateLantern();
