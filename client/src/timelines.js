// import React, { useState, useEffect } from 'react';
import { TimelineMax as Timeline, Power1 } from "gsap";

const getDefaultTimeline = (node, delay) => {
  const timeline = new Timeline({ paused: true });

  timeline.from(node, 0.4, {
    display: "none",
    autoAlpha: 0,
    delay,
    scaleX: 0.97,
    y: 5,
    ease: Power1.easeInOut,
    clearProps: "opacity, visibility, display"
  });

  return timeline;
};

const getHomeTimeline = (node, delay) => {
  const timeline = new Timeline({ paused: true });
  // const slideUp = node.querySelectorAll('[data-slideup]');
  // const slideRight = node.querySelectorAll('[data-slideright]');

  timeline.from(node, 0.2,
    { display: "none",
      autoAlpha: 0,
      delay,
      clearProps: "opacity, visibility, display" },
    0)

    // .staggerFrom(slideRight, 0.375,
    //   { autoAlpha: 0,
    //     y: -15,
    //     ease: Power1.easeOut,
    //     clearProps: "opacity, transform, visibility" },
    //   0.1)

    // .staggerFrom(slideUp, 0.375,
    //   { autoAlpha: 0,
    //     y: 15,
    //     ease: Power1.easeOut,
    //     clearProps: "opacity, transform, visibility" },
    //   0.125);

  return timeline;
};

export const play = (pathname, node, appears) => {

    const delay = appears ? 0 : 0.25;
    let timeline;

    if (pathname === "/") timeline = getHomeTimeline(node, delay);
    else timeline = getDefaultTimeline(node, delay);

    window.loadPromise.then(() => requestAnimationFrame(() => timeline.play()));
};

export const exit = (node) => {
  const timeline = new Timeline({ paused: true });

  timeline.to(
    node,
    0.25,
    {
      autoAlpha: 0,
      scaleX: 0.97,
      y: 5,
      ease: Power1.easeIn,
      clearProps: "opacity"
    }
  );
  timeline.play()
};
