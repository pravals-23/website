/**
 * Nexus Vittoria — central event configuration.
 * Change any value here and it propagates across the entire site.
 */

// ── Registration opening date ────────────────────────────────────────────
// Registration is now OPEN. To set a future opening date, replace this
// with an ISO string like '2026-09-28T00:00:00' and the countdown will
// show a live timer until that moment.
const REGISTRATION_OPEN_AT = new Date(0).toISOString(); // epoch = always open

export const eventConfig = {
  brand: {
    name: 'NEXUS VITTORIA',
    subtitle: 'UNDER 21 FOOTBALL TOURNAMENT',
    tagline: 'BIGGER. BOLDER. BETTER.',
  },
  event: {
    dateLabel: '17TH & 18TH OCTOBER',
    dateShort: '17–18 OCTOBER',
    dateRange: '17–18',
    month: 'OCTOBER',
    days: 2,
    teams: 20,
    champion: 1,
    venue: 'Spark7 Sports Arena, Kattigenahalli, Bengaluru',
    venueName: 'SPARK7 SPORTS ARENA',
    venueLocation: 'KATTIGENAHALLI, BENGALURU',
    venueAddress: [
      'Swamy Muneshwara Complex,',
      'Sy No. 194/3, Bagalur Main Road,',
      'Kattigenahalli, Bengaluru, Karnataka 560063',
    ],
    category: 'Under 21',
  },
  registration: {
    // Change this single value to control when registration opens.
    opensAt: REGISTRATION_OPEN_AT,
    maxTeams: 20,
    // Google Forms registration link.
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSetBi8IOyQIvt6vMqmdc4Sr-MehBwsM48RDbYTcqsM7fXaaxA/viewform?usp=publish-editor',
  },
  social: {
    instagram: 'https://www.instagram.com/nexus_vittoria?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
  },
  venue: {
    // Google Maps search URL for the venue (no invented coordinates).
    directionsUrl:
      'https://www.google.com/maps/search/Spark7+Sports+Arena+Kattigenahalli+Bengaluru',
    // TODO: Replace with the official Spark7 website URL if one becomes available.
    viewVenueUrl:
      'https://www.google.com/maps/search/Spark7+Sports+Arena+Kattigenahalli+Bengaluru',
  },
  images: {
    heroStadium:
      'https://images.pexels.com/photos/28827841/pexels-photo-28827841.jpeg?auto=compress&cs=tinysrgb&w=1920',
    heroStadiumAlt:
      'https://images.pexels.com/photos/4135333/pexels-photo-4135333.jpeg?auto=compress&cs=tinysrgb&w=1920',
    venueField:
      'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
} as const;

export type EventConfig = typeof eventConfig;
