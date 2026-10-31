import { stories } from "../data/content";

export default function SuccessStories() {
  return (
    <div className="stories" id="success-stories">
      <div className="stories-hdr">
        <div>
          <div className="section-tag">Success Stories</div>
          <h2 className="section-h2">
            Results we've delivered <span>together</span>
          </h2>
        </div>
        <a href="#" className="section-link">
          View all case studies <i className="fas fa-arrow-right" aria-hidden="true" />
        </a>
      </div>

      <div className="stories-grid">
        {stories.map((story) => (
          <article className="story" key={story.title}>
            <div className="story-top">
              <div className="story-partner">
                <span className={`sp-ico ${story.iconCls}`.trim()}>
                  <i className={story.icon} aria-hidden="true" />
                </span>
                {story.partner}
              </div>
              <span className="story-chip">{story.chip}</span>
            </div>
            <h3>{story.title}</h3>
            <p>{story.text}</p>
            <div className="story-foot">
              <div className="story-stat">
                <strong>{story.stat}</strong>
                <span>{story.statLabel}</span>
              </div>
              <a href={story.href} className="story-link">
                Read story <i className="fas fa-arrow-right" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
