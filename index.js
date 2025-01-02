// Behavior for screens > 744px
if (window.innerWidth > 744) {
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
}

// Behavior for screens <= 744px
if (window.innerWidth <= 744) {
  const videos = document.querySelectorAll(".video-section video");
  const contents = document.querySelectorAll(".video-section .content");

  // Function to reset all videos
  function resetVideos() {
    videos.forEach((video, index) => {
      video.pause();
      video.classList.remove("playing");
      video.style.filter = "grayscale(100%)"; // Apply grayscale to all videos
      contents[index].style.opacity = "0"; // Hide content
    });
  }

  // Function to play the first video
  function playFirstVideo() {
    if (videos.length > 0) {
      resetVideos(); // Ensure all other videos are reset
      const firstVideo = videos[0];
      const firstContent = contents[0];
      firstVideo.play();
      firstVideo.classList.add("playing");
      firstVideo.style.filter = "grayscale(0%)"; // Remove grayscale
      firstContent.style.opacity = "1"; // Show content
    }
  }

  // Function to check if an element is in the middle of the viewport
  function isInViewportMiddle(el) {
    const rect = el.getBoundingClientRect();
    const middle = window.innerHeight / 2;
    return rect.top <= middle && rect.bottom >= middle;
  }

  // Function to handle video playback based on scroll position
  function handleScroll() {
    let isFirstVideoPlaying = false;

    videos.forEach((video, index) => {
      const content = contents[index];
      if (isInViewportMiddle(video)) {
        if (index === 0) {
          // Handle the first video
          isFirstVideoPlaying = true;
          playFirstVideo();
        } else if (!isFirstVideoPlaying) {
          // Handle other videos if the first video is not playing
          video.play();
          video.classList.add("playing");
          video.style.filter = "grayscale(0%)"; // Remove grayscale
          content.style.opacity = "1"; // Show content
        }
      } else {
        video.pause();
        video.classList.remove("playing");
        video.style.filter = "grayscale(100%)"; // Apply grayscale
        content.style.opacity = "0"; // Hide content
      }
    });

    // Ensure no other videos play when the first video is active
    if (isFirstVideoPlaying) {
      videos.forEach((video, index) => {
        if (index !== 0) {
          video.pause();
          video.classList.remove("playing");
          video.style.filter = "grayscale(100%)"; // Apply grayscale
          contents[index].style.opacity = "0"; // Hide content
        }
      });
    }
  }

  // Add event listeners
  window.addEventListener("load", playFirstVideo); // Play the first video on page load
  window.addEventListener("scroll", () => {
    handleScroll();
    if (window.scrollY === 0) {
      playFirstVideo(); // Ensure the first video plays when scrolled to the top
    }
  });
}
