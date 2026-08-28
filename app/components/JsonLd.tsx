import React from "react";

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LifeBuild Global",
    "alternateName": ["4Tribe Network", "LifeBuild Center", "LifeBuild Global Movement"],
    "url": "https://www.lifebuildglobal.com.ng",
    "logo": "https://www.lifebuildglobal.com.ng/images/logo_icon_nobg.png",
    "founder": {
      "@type": "Person",
      "name": "Zeki Ubor",
      "jobTitle": "Founder & Convener",
      "sameAs": ["https://www.lifebuildglobal.com.ng"]
    },
    "description": "A faith-driven movement helping people rebuild broken foundations, develop their God-given capacity and create transformation in lives, families and communities under Isaiah 58:12.",
    "slogan": "Rebuilding Everywhere You Go",
    "sameAs": [
      "https://www.lifebuildglobal.com.ng"
    ]
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "LifeBuild Global Bi-Weekly Gathering & 4T Conference",
    "startDate": "2026-08-09T17:00:00+01:00",
    "eventSchedule": {
      "@type": "Schedule",
      "repeatFrequency": "P2W",
      "byDay": "https://schema.org/Sunday",
      "startTime": "17:00:00+01:00"
    },
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": [
      {
        "@type": "Place",
        "name": "LifeBuild Center",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "NG"
        }
      },
      {
        "@type": "VirtualLocation",
        "url": "https://www.lifebuildglobal.com.ng"
      }
    ],
    "image": [
      "https://www.lifebuildglobal.com.ng/images/worship_nigerian_african.png",
      "https://www.lifebuildglobal.com.ng/images/zeki_ubor_official.jpg"
    ],
    "description": "Bi-weekly 90-minute spiritual alignment, 4T teaching (Rebuilding, Restoring, Repairing, Replenishing), and strategic equipping for builders and leaders led by Zeki Ubor.",
    "organizer": {
      "@type": "Organization",
      "name": "LifeBuild Global & 4Tribe Network",
      "url": "https://www.lifebuildglobal.com.ng"
    },
    "performer": {
      "@type": "Person",
      "name": "Zeki Ubor"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LifeBuild Global",
    "url": "https://www.lifebuildglobal.com.ng",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.lifebuildglobal.com.ng/#search?q={search_term_string}",
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
