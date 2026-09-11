export const movies = [
  {
    id: 1,
    title: "Interstellar",
    type: "Movie",
    year: 2014,
    rating: 8.7,
    genre: ["Sci-Fi", "Drama", "Adventure"],
    duration: "2h 49m",
    platform: "Prime Video",
    description:
      "A team of explorers travels through a wormhole in search of a new home for humanity, forcing them to confront time, sacrifice, and the meaning of hope.",
    poster: null,
  },
  {
    id: 2,
    title: "The Dark Knight",
    type: "Movie",
    year: 2008,
    rating: 9.0,
    genre: ["Action", "Crime", "Drama"],
    duration: "2h 32m",
    platform: "Prime Video",
    description:
      "Batman faces a criminal mastermind who turns the city into a battleground, testing justice, fear, and the cost of heroism.",
    poster: null,
  },
  {
    id: 3,
    title: "Inception",
    type: "Movie",
    year: 2010,
    rating: 8.8,
    genre: ["Sci-Fi", "Thriller", "Action"],
    duration: "2h 28m",
    platform: "Netflix",
    description:
      "A thief who steals ideas from dreams is given the chance to plant one in the mind of a CEO, leading to a layered and dangerous mission.",
    poster: null,
  },
  {
    id: 4,
    title: "Parasite",
    type: "Movie",
    year: 2019,
    rating: 8.5,
    genre: ["Drama", "Thriller"],
    duration: "2h 12m",
    platform: "Netflix",
    description:
      "A poor family infiltrates a wealthy household and quickly discovers that class, power, and deception are far more dangerous than they first appear.",
    poster: null,
  },
  {
    id: 5,
    title: "Dune",
    type: "Movie",
    year: 2021,
    rating: 8.0,
    genre: ["Sci-Fi", "Adventure", "Action"],
    duration: "2h 35m",
    platform: "Prime Video",
    description:
      "Paul Atreides is thrust into a deadly struggle over the most valuable resource in the universe, where destiny and power collide.",
    poster: null,
  },
  {
    id: 6,
    title: "Oppenheimer",
    type: "Movie",
    year: 2023,
    rating: 8.6,
    genre: ["Biography", "Drama", "History"],
    duration: "3h 0m",
    platform: "Prime Video",
    description:
      "The life and legacy of J. Robert Oppenheimer are explored through the pressure of war, science, morality, and the consequences of invention.",
    poster: null,
  },
  {
    id: 7,
    title: "The Godfather",
    type: "Movie",
    year: 1972,
    rating: 9.2,
    genre: ["Crime", "Drama"],
    duration: "2h 55m",
    platform: "Hotstar",
    description:
      "The Corleone family navigates loyalty, power, and betrayal in one of cinema's most enduring crime sagas.",
    poster: null,
  },
  {
    id: 8,
    title: "The Social Network",
    type: "Movie",
    year: 2010,
    rating: 7.7,
    genre: ["Drama", "Biography"],
    duration: "2h 0m",
    platform: "Hotstar",
    description:
      "A sharp and fast-moving account of the rise of Facebook, told through ambition, friendship, and the price of success.",
    poster: null,
  },
  {
    id: 9,
    title: "Stranger Things",
    type: "Series",
    year: 2016,
    rating: 8.7,
    genre: ["Sci-Fi", "Drama", "Thriller"],
    duration: "8 Episodes",
    platform: "Netflix",
    description:
      "A small town is shaken by supernatural events, secret experiments, and a search for a missing boy that spirals into an unforgettable mystery.",
    poster: null,
  },
  {
    id: 10,
    title: "House of the Dragon",
    type: "Series",
    year: 2022,
    rating: 8.3,
    genre: ["Fantasy", "Drama", "Action"],
    duration: "8 Episodes",
    platform: "Hotstar",
    description:
      "As rival houses battle for power in Westeros, the Targaryen dynasty faces ambition, bloodshed, and political upheaval.",
    poster: null,
  },
];

export function getMovieById(id) {
  const numericId = Number(id);
  return movies.find((movie) => movie.id === numericId) || null;
}

export function getRatingLabel(rating) {
  if (rating >= 8) return "Perfect";
  if (rating >= 7) return "Watchable";
  if (rating >= 6) return "Mixed";
  return "Skip";
}
