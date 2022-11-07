window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

function updateOnlineStatus(event) {
  const onlineStatus = navigator.onLine ? "online" : "offline";
  return onlineStatus;
}

export const checkOnlineStatus = () => {
  const status = updateOnlineStatus();
  return status;
};

//Login Function
export const sliderLeft = () => {
  let slider = document.getElementById("slider");
  slider.scrollLeft = slider.scrollLeft - 500;
};

export const sliderRight = () => {
  let slider = document.getElementById("slider");
  slider.scrollLeft = slider.scrollLeft + 500;
};
