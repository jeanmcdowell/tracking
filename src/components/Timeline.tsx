import { useEffect, useState } from "react";

interface Week {
  label: string;
  start: string;
  end: string;
}

interface Film {
  id: number;
  week: Week["label"];
  title: string;
  distributor: string;
  rating: string;
  releaseType: string;
  poster: string;
}

const weeks: Readonly<Week[]> = [
  { label: "Week of Jan 30, 2026", start: "2026-01-30", end: "2026-02-05" },
  { label: "Week of Feb 6, 2026", start: "2026-02-06", end: "2026-02-12" },
  { label: "Week of Feb 13, 2026", start: "2026-02-13", end: "2026-02-19" },
  { label: "Week of Feb 20, 2026", start: "2026-02-20", end: "2026-02-26" },
  { label: "Week of Feb 27, 2026", start: "2026-02-27", end: "2026-03-06" },
];

function parseStoredFilms(saved: string | null): Film[] {
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved) as Partial<Film>[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((film) => ({
      id: typeof film.id === "number" ? film.id : Date.now(),
      week: typeof film.week === "string" ? film.week : weeks[0]?.label ?? "",
      title: film.title ?? "Untitled",
      distributor: film.distributor ?? "",
      rating: film.rating ?? "",
      releaseType: film.releaseType ?? "",
      poster: film.poster ?? "",
    }));
  } catch (error) {
    console.error("Failed to parse stored films", error);
    return [];
  }
}

export default function Timeline(): JSX.Element {
  const [films, setFilms] = useState<Film[]>(() =>
    parseStoredFilms(localStorage.getItem("filmTimeline"))
  );

  useEffect(() => {
    localStorage.setItem("filmTimeline", JSON.stringify(films));
  }, [films]);

  const addFilm = (weekLabel: Week["label"]): void => {
    setFilms((previousFilms) =>
      previousFilms.concat({
        id: Date.now(),
        week: weekLabel,
        title: "Untitled",
        distributor: "",
        rating: "",
        releaseType: "",
        poster: "",
      })
    );
  };

  const onPosterFile = (file: File | null, id: number): void => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>): void => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setFilms((previousFilms) =>
          previousFilms.map((film) =>
            film.id === id ? { ...film, poster: result } : film
          )
        );
      }
    };
    reader.readAsDataURL(file);
  };

  const onChange = (
    id: number,
    field: keyof Pick<Film, "title" | "distributor" | "rating" | "releaseType" | "poster">,
    value: string
  ): void => {
    setFilms((previousFilms) =>
      previousFilms.map((film) =>
        film.id === id ? { ...film, [field]: value } : film
      )
    );
  };

  const exportCSV = (): void => {
    const header = "Title,Distributor,Rating,ReleaseType,Week,PosterURL\n";
    const rows = films
      .map((film) => {
        const csv = [
          film.title,
          film.distributor,
          film.rating,
          film.releaseType,
          film.week,
          film.poster || "",
        ]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",");
        return csv;
      })
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "film_timeline.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearAll = (): void => {
    if (window.confirm("Clear all films")) {
      setFilms([]);
      localStorage.removeItem("filmTimeline");
    }
  };

  return (
    <div className="app">
      <div className="toolbar">
        <h1>Film Release Timeline</h1>
        <div>
          <button className="btn" onClick={exportCSV}>
            Export CSV
          </button>
          <button className="btn" style={{ marginLeft: 8 }} onClick={clearAll}>
            Clear All
          </button>
        </div>
      </div>

      <div className="timeline">
        {weeks.map((week) => (
          <div className="week" key={week.label}>
            <div className="week-head">
              <div className="week-title">{week.label}</div>
              <button className="btn add" onClick={() => addFilm(week.label)}>
                + Add Film
              </button>
            </div>

            <div className="film-grid">
              {films
                .filter((film) => film.week === week.label)
                .map((film) => (
                  <div className="film" key={film.id}>
                    {film.poster ? (
                      <img
                        className="poster"
                        src={film.poster}
                        alt={film.title || "poster"}
                      />
                    ) : (
                      <label className="upload-drop">
                        <div>
                          <div>Drop or click to upload</div>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(event) =>
                              onPosterFile(event.target.files?.[0] ?? null, film.id)
                            }
                          />
                        </div>
                      </label>
                    )}
                    {/* Optional: paste an external URL if you prefer */}
                    <input
                      className="input"
                      placeholder="Or paste poster URL"
                      value={film.poster}
                      onChange={(event) =>
                        onChange(film.id, "poster", event.target.value)
                      }
                    />
                    <input
                      className="input"
                      placeholder="Title"
                      value={film.title}
                      onChange={(event) =>
                        onChange(film.id, "title", event.target.value)
                      }
                    />
                    <input
                      className="input"
                      placeholder="Distributor"
                      value={film.distributor}
                      onChange={(event) =>
                        onChange(film.id, "distributor", event.target.value)
                      }
                    />
                    <input
                      className="input"
                      placeholder="Rating"
                      value={film.rating}
                      onChange={(event) =>
                        onChange(film.id, "rating", event.target.value)
                      }
                    />
                    <input
                      className="input"
                      placeholder="Wide / Limited"
                      value={film.releaseType}
                      onChange={(event) =>
                        onChange(film.id, "releaseType", event.target.value)
                      }
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
