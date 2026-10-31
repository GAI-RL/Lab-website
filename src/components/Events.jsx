import React from "react";
import { featuredEvent, sideEvents, eventGallery } from "../data/content";
// Note: Make sure you have an 'eventGallery' array in content.js for the bottom 6 images!
// If you don't have it yet, I added a fallback loop below.

export default function Events() {
  // If you don't have a dedicated eventGallery array in content.js yet,
  // you can temporarily use placeholder images here:
  const fallbackGallery = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80",
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
  ];

  // Use your gallery if it exists, otherwise use the fallback
  const galleryImages =
    eventGallery && eventGallery.length > 0 ? eventGallery : fallbackGallery;

  return (
    <section className="events-sec" id="events">
      <div className="events-inner">
        {/* Header */}
        <div className="events-hdr">
          <span className="section-tag">Events & Highlights</span>
          <h2 className="section-h2">
            Moments from <span>our lab</span>
          </h2>
          <p className="section-sub">
            Talks, workshops, student learning and research milestones.
          </p>
        </div>

        {/* Top Grid */}
        <div className="events-top-grid">
          {/* Featured Card (Left) */}
          {featuredEvent && (
            <div className="ev-featured">
              <img
                src={featuredEvent.img}
                alt={featuredEvent.alt || "Featured Event"}
              />
              <div className="ev-featured-body">
                <span className="ev-badge">{featuredEvent.badge}</span>
                <h3>{featuredEvent.title}</h3>
                <p>{featuredEvent.text}</p>
              </div>
            </div>
          )}

          {/* Side Column (Right - 2 Small Cards) */}
          <div className="events-side-col">
            {(sideEvents || []).map((event, index) => {
              // Split the type string (e.g., "Workshop · 22 Apr 2026") into two parts
              const [typeName, date] = (event.type || "").split(" · ");

              return (
                <a href="#" className="ev-sm-card" key={index}>
                  <div className="ev-sm-img">
                    <img src={event.img} alt={event.alt || "Event"} />
                  </div>
                  <div className="ev-sm-body">
                    <div className="ev-sm-meta">
                      <span className="ev-sm-date">{date || event.type}</span>
                      {date && <span className="ev-sm-dot">●</span>}
                      {date && <span className="ev-sm-type">{typeName}</span>}
                    </div>
                    <h3>{event.title}</h3>
                    <p>{event.text}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Image Gallery (6 Images) */}
        <div className="events-gallery">
          {galleryImages.map((imgUrl, index) => (
            <div className="ev-gallery-img" key={index}>
              <img src={imgUrl} alt={`Event Moment ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
