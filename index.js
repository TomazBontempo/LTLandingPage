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
  // Play the first video on page load or when scrolling back to the top
  function playFirstVideo() {
    const firstVideoSection = document.querySelector(".video-section");
    if (firstVideoSection) {
      const video = firstVideoSection.querySelector("video");
      const content = firstVideoSection.querySelector(".content");
      if (video) {
        // Pause all other videos
        document
          .querySelectorAll(".video-section video")
          .forEach((v, index) => {
            if (index !== 0) {
              v.pause();
              v.classList.remove("playing");
              const otherContent = v
                .closest(".video-section")
                .querySelector(".content");
              otherContent.style.opacity = "0";
            }
          });

        video.play();
        video.classList.add("playing");
        content.style.opacity = "1";
      }
    }
  }

  window.addEventListener("load", playFirstVideo);

  // Function to check if an element is in the middle of the viewport
  function isElementInViewportMiddle(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const middle = windowHeight / 2;
    return rect.top <= middle && rect.bottom >= middle;
  }

  // Function to handle video playback based on scroll position
  function handleScroll() {
    const videos = document.querySelectorAll(".video-section video");
    let isFirstVideoPlaying = false;

    videos.forEach((video, index) => {
      const content = video.closest(".video-section").querySelector(".content");

      if (isElementInViewportMiddle(video)) {
        if (index === 0) {
          isFirstVideoPlaying = true;
        }

        video.play();
        video.classList.add("playing");
        content.style.opacity = "1";
      } else {
        video.pause();
        video.classList.remove("playing");
        content.style.opacity = "0";
      }
    });

    // Ensure no other video plays while the first video is playing
    if (isFirstVideoPlaying) {
      videos.forEach((video, index) => {
        if (index !== 0) {
          video.pause();
          video.classList.remove("playing");
          const content = video
            .closest(".video-section")
            .querySelector(".content");
          content.style.opacity = "0";
        }
      });
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", () => {
    handleScroll();

    // Check if the user has scrolled back to the top
    if (window.scrollY === 0) {
      playFirstVideo();
    }
  });
}
