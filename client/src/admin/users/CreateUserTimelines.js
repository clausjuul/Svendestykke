import { Power2 } from "gsap";

export const buildEnterTimeline = (node, tl, duration, canScroll, buildProps) => {
  const { rect } = buildProps;

  const createBtn = document.querySelector("[data-createbtn]");
  const modalCreateBtn = document.querySelector("[data-modalcreatebtn");
  const closeModal = document.querySelector("[data-closemodal]");
  const inputs = node.querySelectorAll(".form__field__input");
  const labels = node.querySelectorAll("label");
  const submitBtn = node.querySelectorAll("button");

  const itemsArray = [
    labels[0],
    inputs[0],
    labels[1],
    inputs[1],
    labels[2],
    inputs[2],
    labels[3],
    inputs[3],
    closeModal
  ];

  tl.set(
    node,
    { width: "100vw", position: "fixed", height: "100vh", top: 0, left: 0 },
    0
  )

    .staggerFromTo(
      itemsArray,
      duration * 0.7,
      { opacity: 0, delay: duration / 3 },
      { opacity: 1 },
      0.1
    )

    .fromTo(
      node.firstChild,
      duration,
      {
        opacity: 1,
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
        overflow: "hidden"
      },
      {
        width: "60vw",
        height: "75vh",
        top: "15vh",
        left: "20vw",
        ease: Power2.easeInOut
      },
      0
    )

    .from(submitBtn, 0.2, { opacity: 0 })

    .fromTo(
      modalCreateBtn,
      duration,
      { paddingTop: "0.5rem", fontSize: "1rem" },
      { paddingTop: "2rem", fontSize: "2rem", ease: Power2.easeInOut },
      0
    )

    .set(createBtn, { opacity: 0 }, 0.01)

    .set(node, { overflow: "hidden auto" }, duration)

    .set(node.firstChild, { overflow: "unset" }, duration);

  return tl;
};

export const buildExitTimeline = (node, tl, duration, canScroll, buildProps) => {
  const { rect } = buildProps;

  const createBtn = document.querySelector("[data-createbtn]");
  const modalCreateBtn = document.querySelector("[data-modalcreatebtn");
  const closeModal = document.querySelector("[data-closemodal]");
  const inputs = node.querySelectorAll(".form__field");
  const labels = node.querySelectorAll("label");
  const submitBtn = node.querySelectorAll("button");

  const itemsArray = [
    labels[0],
    inputs[0],
    labels[1],
    inputs[1],
    labels[2],
    inputs[2],
    labels[3],
    inputs[3],
    submitBtn,
    closeModal
  ];

  tl.fromTo(itemsArray, duration * 0.5, { opacity: 1, height: '100%' }, { opacity: 0, height: '0' }, 0)

    .fromTo(
      node.firstChild,
      duration,
      {
        width: "60vw",
        height: "75vh",
        top: "15vh",
        left: "20vw",
        ease: Power2.easeInOut
      },
      {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
        overflow: "hidden"
      },
      0
    )

    .fromTo(
      modalCreateBtn,
      duration,
      { paddingTop: "2rem", fontSize: "2rem" },
      { paddingTop: "0.5rem", fontSize: "1rem", ease: Power2.easeInOut },
      0
    )

    .set(createBtn, { opacity: 1 }, duration);

  return tl;
};
