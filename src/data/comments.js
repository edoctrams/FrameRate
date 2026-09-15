// Seed comment threads for Spaces content, keyed as `${type}-${id}`.
// Each item's `replies` / `comments` count equals the thread length here, so the
// number shown on a card always matches the comments rendered on the detail page.
// Values are arrays of { id, author, time, content }.

export const initialComments = {
  "discussion-1": [
    {
      id: 1,
      author: "FilmBuff",
      time: "2 hours ago",
      content:
        "I really liked the ending. The emotional payoff with Murph matters more to me than whether every detail of the physics holds up.",
    },
    {
      id: 2,
      author: "CinemaFan",
      time: "1 hour ago",
      content:
        "Same here. The whole movie is built toward Cooper getting back to his daughter, so the tesseract never felt like a cheat to me.",
    },
    {
      id: 3,
      author: "MovieTalk",
      time: "45 minutes ago",
      content:
        "My only gripe is how much dialogue the tesseract scene uses. The visuals were already saying it.",
    },
  ],

  "discussion-2": [
    {
      id: 1,
      author: "MovieTalk",
      time: "4 hours ago",
      content:
        "The performances are the reason. The Joker makes every scene feel unpredictable even on a fifth rewatch.",
    },
    {
      id: 2,
      author: "ReelNotes",
      time: "3 hours ago",
      content:
        "The city actually feels like a city. Practical photography on that scale is why it ages better than most of its imitators.",
    },
    {
      id: 3,
      author: "Frame Rate",
      time: "2 hours ago",
      content:
        "Worth noting the pacing — there is almost no filler. Every scene either raises the stakes or tightens the noose.",
    },
  ],

  "discussion-3": [
    {
      id: 1,
      author: "FilmBuff",
      time: "20 hours ago",
      content:
        "The final act is meant to feel chaotic. The social tension has been tightening since the flood, so the release is the point.",
    },
    {
      id: 2,
      author: "ReelNotes",
      time: "16 hours ago",
      content:
        "The basement reveal re-frames the entire first hour. On a second watch the tone shift reads as deliberate rather than sudden.",
    },
    {
      id: 3,
      author: "CinemaFan",
      time: "12 hours ago",
      content:
        "I still think the party scene is the real turning point. Everything after it is consequence.",
    },
  ],

  "discussion-4": [
    {
      id: 1,
      author: "MovieTalk",
      time: "20 hours ago",
      content:
        "I prefer reading it as intentionally ambiguous. The important thing is that Cobb stops caring about the answer.",
    },
    {
      id: 2,
      author: "FilmBuff",
      time: "18 hours ago",
      content:
        "The wedding ring is the real tell. It appears in the dream scenes and disappears in the ones he believes are real.",
    },
    {
      id: 3,
      author: "SerialViewer",
      time: "9 hours ago",
      content:
        "Either reading works because the film is about grief, not about a puzzle. The ambiguity is the thesis.",
    },
  ],

  "discussion-5": [
    {
      id: 1,
      author: "ReelNotes",
      time: "1 day ago",
      content:
        "The sound design carries the world-building. The dialogue explains almost nothing and it still lands.",
    },
    {
      id: 2,
      author: "CinemaFan",
      time: "1 day ago",
      content:
        "The bagpipe motif during the Harkonnen reveal does more for the politics than any exposition could.",
    },
    {
      id: 3,
      author: "SerialViewer",
      time: "22 hours ago",
      content:
        "That is Villeneuve's whole approach. He trusts texture over explanation, which is why it feels enormous.",
    },
  ],

  "discussion-6": [
    {
      id: 1,
      author: "FilmBuff",
      time: "2 days ago",
      content:
        "The hearings are the spine. Trinity is the spectacle, but the interrogation scenes decide what the movie is actually arguing.",
    },
    {
      id: 2,
      author: "MovieTalk",
      time: "2 days ago",
      content:
        "The black-and-white choice makes the flashbacks feel like transcripts, which is exactly the right register for a trial.",
    },
    {
      id: 3,
      author: "Frame Rate",
      time: "1 day ago",
      content:
        "It is a three-hour film about a security clearance hearing that never feels like one. That is the trick.",
    },
  ],

  "discussion-7": [
    {
      id: 1,
      author: "SerialViewer",
      time: "3 days ago",
      content:
        "\"You're going to go through life thinking that girls don't like you because you're a nerd.\" Still undefeated.",
    },
    {
      id: 2,
      author: "ReelNotes",
      time: "3 days ago",
      content:
        "The deposition scenes are tighter than most thrillers. Two people at a table and it never sags.",
    },
    {
      id: 3,
      author: "CinemaFan",
      time: "3 days ago",
      content:
        "\"A million dollars isn't cool. You know what's cool?\" Entire arcs of the decade are in that one line.",
    },
  ],

  "discussion-8": [
    {
      id: 1,
      author: "CinemaFan",
      time: "4 days ago",
      content:
        "The recastings are the weakest link. The performances are strong but the emotional continuity takes a hit.",
    },
    {
      id: 2,
      author: "MovieTalk",
      time: "4 days ago",
      content:
        "It earns the jumps because the political map does not change — only the faces do. The conflict stays the same shape.",
    },
    {
      id: 3,
      author: "FilmBuff",
      time: "4 days ago",
      content:
        "The older actors are doing the heavy lifting. Once the timeline settles the show gets noticeably stronger.",
    },
  ],
  "trailer-1": [
    {
      id: 1,
      author: "CinemaFan",
      time: "6 hours ago",
      content:
        "The drum motif alone sold me. The trailer never shows the third act, which I appreciate.",
    },
    {
      id: 2,
      author: "ReelNotes",
      time: "5 hours ago",
      content:
        "The sandworm shot at 1:40 is doing a lot of work with almost no effects budget visible.",
    },
  ],

  "trailer-2": [
    {
      id: 1,
      author: "SerialViewer",
      time: "1 day ago",
      content: "Cutting to silence for the last five seconds is a very good choice.",
    },
    {
      id: 2,
      author: "MovieTalk",
      time: "22 hours ago",
      content:
        "A teaser that reveals nothing but the tone. More trailers should be brave enough to do this.",
    },
  ],

  "trailer-3": [
    {
      id: 1,
      author: "FilmBuff",
      time: "2 days ago",
      content:
        "Confirmation of the returning cast is the only thing I needed from this. The rest is atmosphere.",
    },
    {
      id: 2,
      author: "CinemaFan",
      time: "2 days ago",
      content: "The final season announcement teasers always cut better than the full trailers.",
    },
  ],

  "trailer-4": [
    {
      id: 1,
      author: "ReelNotes",
      time: "3 days ago",
      content:
        "The grain being preserved rather than scrubbed away is the right call. It still looks like film.",
    },
    {
      id: 2,
      author: "SerialViewer",
      time: "3 days ago",
      content: "Seeing this on a big screen with a properly restored print is going to be a treat.",
    },
  ],

  "trailer-5": [
    {
      id: 1,
      author: "MovieTalk",
      time: "4 days ago",
      content:
        "Finally showing both factions in the same frame. The first trailer kept them completely separate.",
    },
    {
      id: 2,
      author: "FilmBuff",
      time: "4 days ago",
      content:
        "The dragon choreography looks noticeably better than the earlier season. The extra time shows.",
    },
  ],

  "news-1": [
    {
      id: 1,
      author: "FilmBuff",
      time: "5 hours ago",
      content:
        "Glad they kept the IMAX window. The previous shift suggested the format run was in trouble.",
    },
    {
      id: 2,
      author: "ReelNotes",
      time: "4 hours ago",
      content: "Locking the date this early usually means the effects work is already locked too.",
    },
  ],

  "news-2": [
    {
      id: 1,
      author: "CinemaFan",
      time: "1 day ago",
      content:
        "A one-week run is short, but it is better than no large-format release at all.",
    },
    {
      id: 2,
      author: "MovieTalk",
      time: "20 hours ago",
      content:
        "Awards season timing is doing the heavy lifting here. Still worth going if it plays near you.",
    },
  ],

  "news-3": [
    {
      id: 1,
      author: "SerialViewer",
      time: "2 days ago",
      content:
        "A two-part premiere is a lot to ask, but if the second half lands three weeks later it should be fine.",
    },
    {
      id: 2,
      author: "FilmBuff",
      time: "2 days ago",
      content: "Splitting a final season always risks killing the momentum in the middle.",
    },
  ],

  "news-4": [
    {
      id: 1,
      author: "ReelNotes",
      time: "3 days ago",
      content:
        "The sound mix being supervised by the original team is the detail that matters most here.",
    },
    {
      id: 2,
      author: "CinemaFan",
      time: "3 days ago",
      content: "A worldwide rollout rather than a festival-only run is a genuinely good surprise.",
    },
  ],

  "news-5": [
    {
      id: 1,
      author: "MovieTalk",
      time: "4 days ago",
      content:
        "Describing the new roles as long-term additions suggests the season is planned around them.",
    },
    {
      id: 2,
      author: "SerialViewer",
      time: "4 days ago",
      content: "Production starting on schedule is the most reassuring part of this announcement.",
    },
  ],
};