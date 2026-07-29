import React from "react";

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lifebuild",
    "alternateName": ["4Tribe Network", "Lifebuild Center"],
    "url": "https://klifebuild.com",
    "logo": "https://klifebuild.com/images/logo_icon_nobg.png",
    "founder": {
      "@type": "Person",
      "name": "Zeki Ubor",
      "jobTitle": "Founder & Convener",
      "sameAs": ["https://github.com/DevzekiFaith/klifebuild"]
    },
    "description": "A propelling movement of transformation driven by Isaiah 58:12 to rebuild broken walls, restore identity, repair breaches, and replenish legacy across communities and organizations.",
    "slogan": "Rebuilding Everywhere You Go",
    "sameAs": [
      "https://github.com/DevzekiFaith/klifebuild"
    ]
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Lifebuild Sunday Sanctuary Gathering & 4T Conference",
    "startDate": "2026-08-02T17:00:00+01:00",
    "eventSchedule": {
      "@type": "Schedule",
      "repeatFrequency": "P1W",
      "byDay": "https://schema.org/Sunday",
      "startTime": "17:00:00+01:00"
    },
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": [
      {
        "@type": "Place",
        "name": "Lifebuild Sanctuary Center",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "NG"
        }
      },
      {
        "@type": "VirtualLocation",
        "url": "https://klifebuild.com"
      }
    ],
    "image": [
      "https://klifebuild.com/images/worship_nigerian_african.png",
      "https://klifebuild.com/images/zeki_ubor_official.png"
    ],
    "description": "Weekly 120-minute spiritual grounding, 4T teaching (Rebuilding, Restoring, Repairing, Replenishing), and iron-sharpening fellowship for founders and leaders led by Zeki Ubor.",
    "organizer": {
      "@type": "Organization",
      "name": "Lifebuild & 4Tribe Network",
      "url": "https://klifebuild.com"
    },
    "performer": {
      "@type": "Person",
      "name": "Zeki Ubor"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lifebuild",
    "url": "https://klifebuild.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://klifebuild.com/#search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
