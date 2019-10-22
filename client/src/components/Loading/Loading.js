import React, { useEffect, useState } from "react";
import { TweenLite } from "gsap";
import { Transition } from "react-transition-group";

import './Loading.scss';

const Loading = () => {

  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [show])

  return (
    <div>
      <Transition
        timeout={1500}
        mountOnEnter
        unmountOnExit
        appear={true}
        in={show}
        addEndListener={node =>
          TweenLite.fromTo(
            node,
            show ? 1.5 : 0.5,
            { opacity: show ? 0 : 1 },
            { opacity: show ? 1 : 0 }
          )
        }
      >
        <div className="container-loading">
          <span>
            <div className="loading" />
          </span>
        </div>
      </Transition>
    </div>
  );
};
export default Loading;
