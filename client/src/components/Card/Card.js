import React from "react";
import "./Card.scss";

export default props => {
  const { image, title, content, like = false } = props;

  return (
    <article className="card">
      <figure className="card__thumbnail">
        <img src={`${image}`} alt={title} />
      </figure>
      
      {like && (
        <div className="card__buttons">
          <span className="card__buttons--like">Like</span>
          <span className="card__buttons--comment">comment</span>
        </div>
      )}
        <h3 className="card__title">{title}</h3>
        <p className="card__content">{content}</p>
    </article>
  );
};