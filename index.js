// Event listeners for video play/pause on hover
document.querySelectorAll(".video-section").forEach((section) => {
  const video = section.querySelector("video");
  const content = section.querySelector(".content");

  // Function to show content and play video
  function showContent() {
    video.play();
    video.classList.add("playing");
    content.style.opacity = "1";
  }

  // Function to hide content and pause video
  function hideContent() {
    video.pause();
    video.classList.remove("playing");
    content.style.opacity = "0";
  }

  // Add event listeners for mouse enter and leave
  section.addEventListener("mouseenter", showContent);
  section.addEventListener("mouseleave", hideContent);
  content.addEventListener("mouseenter", showContent);
  content.addEventListener("mouseleave", hideContent);

  // Add event listeners for video play, pause, and end
  video.addEventListener("play", () => {
    video.classList.add("playing");
    content.style.opacity = "1";
  });

  video.addEventListener("pause", () => {
    video.classList.remove("playing");
    content.style.opacity = "0";
  });

  video.addEventListener("ended", () => {
    video.classList.remove("playing");
    content.style.opacity = "0";
  });
});

// Define scroll positions
const positions = [0, 850, window.innerHeight * 2];
let currentPositionIndex = 0;
let isScrolling = false; // Flag to prevent multiple scrolls
const cooldownTime = 250; // Cooldown time in milliseconds

// Function to scroll to the top of the page
function scrollToTop(event) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  currentPositionIndex = 0;
}

// Function to scroll to the middle of the page
function scrollToMiddle(event) {
  event.preventDefault();
  window.scrollTo({ top: 850, behavior: "smooth" });
  currentPositionIndex = 1;
}

// Function to scroll to the bottom of the page
function scrollToBottom(event) {
  event.preventDefault();
  window.scrollTo({ top: window.innerHeight * 2, behavior: "smooth" });
  currentPositionIndex = 2;
}

// Function to scroll to a specific position based on index
function scrollToPosition(index) {
  if (index >= 0 && index < positions.length) {
    window.scrollTo({
      top: positions[index],
      behavior: "smooth",
    });
    currentPositionIndex = index;
  }
}

// Event listener for mouse wheel scroll
window.addEventListener("wheel", (event) => {
  if (isScrolling) return; // If already scrolling, do nothing

  if (event.deltaY > 0) {
    // Scrolling down
    scrollToPosition(currentPositionIndex + 1);
  } else {
    // Scrolling up
    scrollToPosition(currentPositionIndex - 1);
  }

  isScrolling = true; // Set the flag to true
  setTimeout(() => {
    isScrolling = false; // Reset the flag after cooldown
  }, cooldownTime);
});

// Function to check if an element is in the middle of the viewport
function isElementInViewportMiddle(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const middle = windowHeight / 2;
  return rect.top <= middle && rect.bottom >= middle;
}

// Function to play/pause videos based on their position in the viewport
function handleScroll() {
  document.querySelectorAll(".video-section video").forEach((video) => {
    if (isElementInViewportMiddle(video)) {
      video.play();
    } else {
      video.pause();
    }
  });
}

// Add scroll event listener for screens below 774px
if (window.innerWidth <= 774) {
  window.addEventListener("scroll", handleScroll);
}

// Event listeners for video play/pause on hover
document.querySelectorAll(".video-section video").forEach((video) => {
  video.addEventListener("mouseover", () => video.play());
  video.addEventListener("mouseout", () => video.pause());
});

function toggleNavbar() {
  const navbar = document.querySelector(".navbar");
  const ul = navbar.querySelector("ul");
  ul.style.display = ul.style.display === "flex" ? "none" : "flex";
}
