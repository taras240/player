function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  let isVisible =
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  if (isVisible) {
    // searchSongs("a", true);
    console.log("searc");
  }
}

const moreSongsBlock = document.querySelector("#moreSongs");
const message = document.querySelector("#message");
// document.addEventListener(
//   "scroll",
//   isInViewport(document.querySelector("#moreSongs")),
//   {
//     passive: true,
//     once: false,
//   }
// );
