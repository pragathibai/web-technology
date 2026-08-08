// ---------- Flip badge to show the back ----------
const badge = document.getElementById("badge");
const badgeBack = document.getElementById("badgeBack");
const flipBtn = document.getElementById("flipBtn");
const backBtn = document.getElementById("backBtn");

flipBtn.addEventListener("click", () => {
  badge.style.display = "none";
  document.querySelector(".lanyard").style.display = "none";
  badgeBack.classList.add("show");
});

backBtn.addEventListener("click", () => {
  badgeBack.classList.remove("show");
  badge.style.display = "block";
  document.querySelector(".lanyard").style.display = "flex";
});

// ---------- Like / star counter ----------
const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");

let likes = 0;

likeBtn.addEventListener("click", () => {
  likes++;
  likeCount.textContent = likes;
});
