
export const buildEnterTimeline = (node, tl, duration) => (

  tl.set(node,
    { width: "100vw", position: "fixed", height: "100vh", top: 0, left: 0 },
  0)

  .set(node.firstChild,
    { width: "80%", left: "10%", top: "50%", y: "-50%" },
  0)

  .fromTo(node.firstChild, duration,
    { opacity: 0, y: -150 },
    { opacity: 1, y: 0 },
  0)

  .set(node, { overflow: "hidden auto" }, 
  duration)

  .set(node.firstChild, { overflow: "unset" }, 
  duration)
);

export const buildExitTimeline = (node, tl, duration) => (
  tl.set(node, { overflow: "hidden" }, 0)

  .fromTo(
    node.firstChild,
    duration,
    { opacity: 1, y: 0 },
    { opacity: 0, y: -150 },
  0)
);
